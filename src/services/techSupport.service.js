const db = require('../../model/index');

const techSupportService = {};

techSupportService.existTech = async (email) => {
  return db.techSupport.findOne({
    where: {
      email: email,
    },
  });
};

techSupportService.createTechSupport = async (name, email, phoneNo) => {
  return db.techSupport.create(
    name, 
    email,
    phoneNo
  );
};

techSupportService.getTechnician = async (email) => {
  return db.techSupport.findOne({
    where: {
      email: email,
    },
  });
};

techSupportService.updateTechnician = async (id, data) => {
  return db.techSupport.update(
    {
      data
    },
    {
    where: {
      id
    },
  });
};

techSupportService.deleteTechnician = async (id) => {
  return db.techSupport.destroy({
    where: {
      id
    }
  });
};

module.exports = techSupportService;