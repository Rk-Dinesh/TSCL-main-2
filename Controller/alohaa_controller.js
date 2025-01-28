const NewGrievanceModel = require('../Models/new_grievance');
const AlohaaService = require('../Service/alohaa_service')

exports.createAlohaa = async (req, res, next) => {
  const event = req.body;
  try {
    const {
      organisation_id,
      call_type,
      caller_number,
      receiver_number,
      did_number,
      received_at,
      ended_at,
      call_id,
      call_status,
      call_duration,
      call_recording_url,
      agent_name,
      dtmfcodes,
      dtmfcode,
    } = event;

    const alohaa = await AlohaaService.createAlohaa({
      organisation_id,
      call_type,
      caller_number,
      receiver_number,
      did_number,
      received_at,
      ended_at,
      call_id,
      call_status,
      call_duration,
      call_recording_url,
      agent_name,
      dtmfcodes,
      dtmfcode,
    });

    if (call_status === "answered" && call_id) {
      const grievance = await NewGrievanceModel.findOne({ is_call_id:call_id });

      if (grievance) {
        grievance.is_call_durationcall_duration = call_duration || grievance.is_call_duration;
        grievance.is_call_recording_url = call_recording_url || grievance.is_call_recording_url;
        grievance.is_receiver_number = receiver_number || grievance.is_receiver_number;
        await grievance.save();
      }
    }

    res.status(200).json({
      status: true,
      message: "Alohaa created successfully",
      data: alohaa,
    });
  } catch (error) {
    console.error("Error creating Alohaa:", error.message);
    res.status(500).json({
      status: false,
      message: "Failed to create Alohaa",
      error: error.message,
    });
  }
};


exports.getalohaabyagent = async (req, res, next) => {
  try {
    const { receiver_number } = req.query;

    if (!receiver_number) {
      return res
        .status(400)
        .json({ status: false, message: "Receiver number is required" });
    }

    const alohaa = await AlohaaService.getbyAgentPhone(receiver_number);

    if (!alohaa || alohaa.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "Data not found" });
    }

    const now = new Date();
    const uniqueCalls = {};
    alohaa.forEach((call) => {
      if (!uniqueCalls[call.call_id] || new Date(call.createdAt) > new Date(uniqueCalls[call.call_id].createdAt)) {
        uniqueCalls[call.call_id] = call;
      }
    });

    const recentCalls = Object.values(uniqueCalls);

    const filteredData = recentCalls
      .slice(-4) 
      .filter((call) => {
        const createdAt = new Date(call.createdAt.$date || call.createdAt);
        const timeDifference = (now - createdAt) / 1000; 
        return (
          call.call_status === "notanswered" &&
          timeDifference <= 45 
        );
      });

    if (filteredData.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "No missed calls found" });
    }
    const lastCallerNumber = filteredData[filteredData.length - 1].caller_number;
    const call_id = filteredData[filteredData.length - 1].call_id;

    res.status(200).json({
      status: true,
      message: "Last missed call retrieved successfully",
      data: {
        lastCallerNumber,
        call_id,
      },
    });
  } catch (error) {
    next(error);
  }
};
