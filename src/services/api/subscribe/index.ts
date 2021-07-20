import axios, { AxiosResponse } from 'axios';
import { config } from 'config';
import { handleApiError } from 'utils/apiError';

export const subscribeMail = async (fields): Promise<string> => {
  const portalId = config.hubspot.portalId;
  const formId = config.hubspot.mailSubscribingFormId;

  try {
    const resp = await axios.request<{ inlineMessage: string }>({
      method: 'post',
      url: `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
      data: {
        fields: fields,
      },
    });
    return resp.data.inlineMessage;
  } catch (e) {
    console.log('service', e);
    throw handleApiError(e);
  }
};
