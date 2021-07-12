import * as Sentry from '@sentry/react';

export function handleApiError(err) {
  Sentry.captureException(err);
  if (err.response) {
    return new Error(err.response.data);
  }
  if (err.request) {
    return new Error('No Response Received');
  }
  return new Error('Bad Request');
}
