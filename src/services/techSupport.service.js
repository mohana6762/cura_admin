const db = require('../../model/index');

const techSupportService = {};

techSupportService.createTechSupport = async (name, email, phoneNo) => {
  return db.techSupport.create(
    name, 
    email,
    phoneNo
  );
};

techSupportService.existTech = async (email) => {
  return db.techSupport.findOne({
    where: {
      email: email,
    },
  });
};

module.exports = techSupportService;