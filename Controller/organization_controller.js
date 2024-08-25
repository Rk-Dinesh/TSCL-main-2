const OrganizationService = require('../Service/organization_service');
const IdcodeServices = require('../Service/idcode_Service');
const encryptData = require('../encryptedData');

exports.createOrganization = async (req, res, next) => {
    try {
        const { org_id, org_name, status, created_by_user } = req.body;
        const organization_id = await IdcodeServices.generateCode("Organization");
        const organization = await OrganizationService.createOrganization({ org_id: organization_id, org_name, status, created_by_user });
        
        res.status(200).json({
            status: true,
            message: "Organization created successfully"
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllOrganizations = async (req, res, next) => {
    try {
        const organizations = await OrganizationService.getAllOrganizations();
        const encryptedData = encryptData(organizations)
        res.status(200).json({
            status: true,
            message: "Organizations retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.getActiveOrganizations = async (req, res, next) => {
    try {
        const organizations = await OrganizationService.getActiveOrganizations();
        const encryptedData = encryptData(organizations)
        res.status(200).json({
            status: true,
            message: "Active Organizations retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.getOrganizationById = async (req, res, next) => {
    try {
        const { org_id } = req.query;
        const organization = await OrganizationService.getOrganizationById(org_id);
        if (!organization) {
            return res.status(404).json({ status: false, message: "Organization not found" });
        }
        const encryptedData = encryptData(organization)
        res.status(200).json({
            status: true,
            message: "Organization retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};

exports.updateOrganization = async (req, res, next) => {
    try {
      const { org_id } = req.query;
      const { org_name, status } = req.body;
  
    
      const organization = await OrganizationService.getOrganizationById(org_id);
      if (!organization) {
        return res.status(404).json({ status: false, message: "Organization not found" });
      }

      const updatedOrganization = await OrganizationService.updateOrganizationById(org_id, {
        org_name,
        status,
      });
  
      return res.status(200).json({ status: true, message: "Organization Updated successfully" });
    } catch (error) {
      next(error);
    }
  };
  

exports.deleteOrganizationById = async (req, res, next) => {
    try {
        const { org_id } = req.query;
        const result = await OrganizationService.deleteOrganizationById(org_id);
        if (!result) {
            return res.status(404).json({ status: false, message: "Organization not found" });
        }
        res.status(200).json({
            status: true,
            message: "Organization deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
