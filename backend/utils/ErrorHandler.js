
class ErrorHandler extends Error {
    constructor(message, statusCode) {
      super(message);  // Set the message from the constructor
      this.statusCode = statusCode;  // Set the status code from the constructor
  
      // Capture the stack trace, excluding this class's constructor
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = ErrorHandler;
  