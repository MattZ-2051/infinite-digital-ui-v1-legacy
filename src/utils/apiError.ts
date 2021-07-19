import * as Sentry from '@sentry/react';

class WrappedError extends Error {
  public exception;
  constructor(msg, exception) {
    super(msg);
    this.exception = exception;
  }
  toJson(value, replacer, space) {
    return this.exception.toJson(value, replacer, space);
  }
}

export class NetError extends WrappedError {}
export class ApiError extends Error {
  public request;
  constructor(msg, request) {
    super(msg);
    this.request = request;
  }
  toJson(value, replacer, space) {
    return this.request.toJson(value, replacer, space);
  }
}
export class ApiLogicError extends Error {
  public response;
  constructor(msg, response) {
    super(msg);
    this.response = response;
  }
  toJson(value, replacer, space) {
    return this.response.toJson(value, replacer, space);
  }
}

export type AppError = NetError | ApiError | ApiLogicError;

export function handleApiError(err) : AppError {
  Sentry.captureException(err);
  if (err.response) {
    return new ApiLogicError(err.response.data, err.response);
  }
  if (err.request) {
    return new ApiError('No Response Received', err.request);
  }
  return new NetError('Bad Request', err);
}
