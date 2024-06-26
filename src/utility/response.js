const rescodes = require('./rescodes');

const response = {
  default: (req, res) => {
    const resdefault = { 
      status: res.response?.code < 400 
    };

    // Check if the response has a message
    if (res.response?.message) {
      resdefault.message = res.response.message;
    } else if (resdefault.status) {
      resdefault.message = rescodes.success;
    } else {
      resdefault.message = rescodes.error;
    }

    // Set the data from the response
    resdefault.data = res.response?.data || {};

    // Send the response with the appropriate status code
    res.status(res.response?.code || 404).send(resdefault);
  },
};

module.exports = response;
