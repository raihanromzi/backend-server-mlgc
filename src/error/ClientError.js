class ClientError extends Error {
  constructor(message, errorCode = 400) {
    super(message);
    this.code = errorCode;
    this.name = 'ClientError';
  }
}

export default ClientError;
