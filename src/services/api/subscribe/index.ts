import axios from 'axios';
import { config } from 'config';

export const subscribeMail = async (fields) => {
  const portalId = config.hubspot.mailSubscribingSection.portalId;
  const formId = config.hubspot.mailSubscribingSection.formId;

  const resp = await axios.request<{ inlineMessage: string }>({
    method: 'post',
    url: `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
    data: {
      fields: fields,
    },
  });
  return resp.data.inlineMessage;
};
