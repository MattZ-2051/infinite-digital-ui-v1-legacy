import { createAsyncThunk } from "@reduxjs/toolkit";

interface IResponse {}

// First argument to the payload creator
interface IPayloadParams {
  token: string;
}

// Custom errors
interface IError {
  errorMessage: string;
}
