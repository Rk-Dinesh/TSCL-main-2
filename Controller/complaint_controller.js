const encryptData = require('../encryptedData');
const ComplaintService = require('../Service/complaint_service');
const IdcodeServices = require('../Service/idcode_Service');

exports.createComplaint = async (req, res, next) => {
    try {
        const { complaint_type_title, dept_name, tat_type, tat_duration, priority, escalation_type,escalation_l1,role_l1, escalation_l2,role_l2, escalation_l3,role_l3, status, created_by_user } = req.body;
        const complaint_id = await IdcodeServices.generateCode("Complaint");
        const complaint = await ComplaintService.createComplaint({ complaint_id, complaint_type_title, dept_name, tat_type, tat_duration, priority, escalation_type,escalation_l1,role_l1, escalation_l2,role_l2, escalation_l3,role_l3, status, created_by_user});
        
        res.status(200).json({
            status: true,
            message: "Complaint created successfully"
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllComplaints = async (req, res, next) => {
    try {
        const complaints = await ComplaintService.getAllComplaints();
        const encryptedData = encryptData(complaints)
        res.status(200).json({
            status: true,
            message: "Complaints retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};
exports.getComplaintById = async (req, res, next) => {
    try {
        const { complaint_id } = req.query;
        const complaint = await ComplaintService.getComplaintById(complaint_id);
        if (!complaint) {
            return res.status(404).json({ status: false, message: "Complaint not found" });
        }
        const encryptedData = encryptData(complaint)
        res.status(200).json({
            status: true,
            message: "Complaint retrieved successfully",
            data: encryptedData
        });
    } catch (error) {
        next(error);
    }
};
exports.updateComplaints = async (req, res, next) => {
    try {
      const { complaint_id } = req.query;
      const { complaint_type_title,dept_name,tat_type,tat_duration,priority,escalation_type,escalation_l1,role_l1,escalation_l2,role_l2,escalation_l3,role_l3,status } = req.body;
  
    
      const compliant = await ComplaintService.getComplaintById(complaint_id);
      if (!compliant) {
        return res.status(404).json({ status: false, message: "Compliant not found" });
      }

      const updatedCompliant = await ComplaintService.updateComplaintsById(complaint_id, {
        complaint_type_title,dept_name,tat_type,tat_duration,priority,escalation_type,escalation_l1,role_l1,escalation_l2,role_l2,escalation_l3,role_l3,status
      });
  
      return res.status(200).json({ status: true, message: "Compliant Updated successfully" });
    } catch (error) {
      next(error);
    }
  };
exports.deleteComplaintById = async (req, res, next) => {
    try {
        const { complaint_id } = req.query;
        const result = await ComplaintService.deleteComplaintById(complaint_id);
        if (!result) {
            return res.status(404).json({ status: false, message: "Complaint not found" });
        }
        res.status(200).json({
            status: true,
            message: "Complaint deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

