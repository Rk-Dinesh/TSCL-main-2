const StreetModel = require('../Models/street');
const WardModel = require('../Models/ward');
const IdcodeServices = require('./idcode_Service');

exports.createStreet = async (streetData) => {
    const street = new StreetModel(streetData);
    return await street.save();
};

exports.getAllStreets = async () => {
    return await StreetModel.find();
};


exports.getAllStreetsLimit = async (page, limit, searchValue) => {
    const skip = (page - 1) * limit;

    const query = searchValue
        ? {
              $or: [
                  { street_name: { $regex: searchValue, $options: "i" } },
                  { ward_name: { $regex: searchValue, $options: "i" } },
                  { zone_name: { $regex: searchValue, $options: "i" } },
                  { status: { $regex: searchValue, $options: "i" } },
              ],
          }
        : {};

    // Fetch paginated data
    const streets = await StreetModel.find(query)
        .skip(skip)
        .limit(limit);

    // Fetch total count of matching documents for pagination metadata
    const totalCount = await StreetModel.countDocuments(query);

    return { streets, totalCount };
};

exports.getActiveStreets = async () => {
    return await StreetModel.find({status:'active'});
};

exports.getActive = async (ward_name) => {
    return await StreetModel.find({status:'active',ward_name});
};

exports.getStreetById = async (ward_id, street_id) => {
    return await StreetModel.findOne({ ward_id, street_id });
};

exports.getStreetId = async ( street_id) => {
    return await StreetModel.findOne({street_id });
};

exports.updateStreetById = async (street_id, updateData) => {
    return await StreetModel.updateOne({ street_id }, { $set: updateData });
  };

exports.deleteStreetById = async (street_id) => {
    return await StreetModel.findOneAndDelete({ street_id });
};

exports.bulkInsert =  async(csvs,createdByUser) => {
    try {

       
        for (let csv of csvs) {

            const ward = await WardModel.findOne({
                ward_id: csv.ward_id,
                });

            
            if (!ward) {
                throw new Error(`Ward not found for ward_id: ${csv.ward_id}`);
            }

            csv.street_id = await IdcodeServices.generateCode('Street');
            csv.ward_name = ward.ward_name;
            csv.zone_id =  ward.zone_id;
            csv.zone_name =  ward.zone_name;
            csv.status = 'active'; 
            csv.created_by_user = createdByUser;
        }
        return await StreetModel.insertMany(csvs);
    } catch (error) {
        throw error;
    }
}
