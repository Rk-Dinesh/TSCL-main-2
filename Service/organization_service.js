const OrganizationModel = require('../Models/organization');
const IdcodeServices = require('./idcode_Service');

exports.createOrganization = async (organizationData) => {
    const organization = new OrganizationModel(organizationData);
    return await organization.save();
};

exports.getAllOrganizations = async () => {
    return await OrganizationModel.find();
};

exports.getActiveOrganizations = async () => {
    return await OrganizationModel.find({ status: 'active' });
  };
exports.getOrganizationById = async (org_id) => {
    return await OrganizationModel.findOne({ org_id });
};

exports.updateOrganizationById = async (org_id, updateData) => {
    return await OrganizationModel.updateOne({ org_id }, { $set: updateData });
  };
  
exports.deleteOrganizationById = async (org_id) => {
    return await OrganizationModel.findOneAndDelete({ org_id });
};

exports.bulkInsert =  async(csvs) => {
    try {
        for (let csv of csvs) {
            csv.org_id = await IdcodeServices.generateCode('Organization');
        }
        return await OrganizationModel.insertMany(csvs);
    } catch (error) {
        throw error;
    }
}
