import ClientError from './ClientError.js';

class InputError extends ClientError {
  constructor(message, errorCode = 400) {
    super(message, errorCode);
    this.name = 'InputError';
  }
}

export default InputError;
