import {AppError} from "../utils/apiError";

export interface ITokenPayloadParams {
  token: string;
}

export interface IError {
  errorMessage: string;
  rawError?: AppError;
}

export interface ITokenIdPayloadParams {
  token: string;
  id: string;
}
