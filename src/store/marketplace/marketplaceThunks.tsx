import { createAsyncThunk } from '@reduxjs/toolkit';

// Return type of the payload creator
// TODO: REVIEW THIS
interface IResponse {}

// First argument to the payload creator
interface IPayloadParams {
  token?: string;
  queryParams: string;
}

// Custom errors
interface IError {
  errorMessage: string;
}
