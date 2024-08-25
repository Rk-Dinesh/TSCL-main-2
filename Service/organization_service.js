const OrganizationModel = require('../Models/organization');

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
