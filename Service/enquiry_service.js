const ResourceModel = require('../Models/enquirysource');
const IdcodeServices = require('./idcode_Service');

exports.createResource = async (ResourceData) => {
    const Resource = new ResourceModel(ResourceData);
    return await Resource.save();
};

exports.getAllResources = async () => {
    return await ResourceModel.find();
};

exports.getActiveResources = async () => {
    return await ResourceModel.find({ status: 'active' });
  };
exports.getResourceById = async (res_id) => {
    return await ResourceModel.findOne({ res_id });
};

exports.updateResourceById = async (res_id, updateData) => {
    return await ResourceModel.updateOne({ res_id }, { $set: updateData });
  };
  
exports.deleteResourceById = async (res_id) => {
    return await ResourceModel.findOneAndDelete({ res_id });
};

exports.bulkInsert =  async(csvs) => {
    try {
        for (let csv of csvs) {
            csv.res_id = await IdcodeServices.generateCode('Resource');
        }
        return await ResourceModel.insertMany(csvs);
    } catch (error) {
        throw error;
    }
}

