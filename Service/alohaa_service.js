const AlohaaModel = require("../Models/alohaa");

exports.createAlohaa = async (AlohaData) => {
    const alohaa = new AlohaaModel(AlohaData);
    return await alohaa.save();
};

exports.getbyAgentPhone = async (receiver_number) => {
    return await AlohaaModel.find({
        receiver_number,
    });
  };

  exports.getbyCallerPhone = async (caller_number) => {
    return await AlohaaModel.find({
        caller_number,
    });
  };