const db = require('../../model/index');

const techSupportService = {};


techSupportService.createTechSupport = async () => {
  return db.techSupport.create(
    
  );
};

module.exports = techSupportService;