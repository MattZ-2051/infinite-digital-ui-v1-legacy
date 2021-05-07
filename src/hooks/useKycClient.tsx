import { useEffect, useState } from 'react';
import Persona, { Client } from 'persona';
import { getPersonalToken } from 'services/api/userService';
import { useAuth0 } from '@auth0/auth0-react';

export const useKycClient = (): Client | undefined => {
  const { getAccessTokenSilently } = useAuth0();
  const [user, setUser] = useState<Client>();

  const GetPersonaClient = async () => {
    const res = await getPersonalToken(await getAccessTokenSilently());

    const client: Client = new Persona.Client({
      templateId: 'tmpl_RdoVrNaCQZ2mNCm6Q9W7jg2z',
      environment: 'sandbox',
      referenceId: res.token,
      onLoad: (error) => {
        if (error) {
          console.error(
            `Failed with code: ${error.code} and message ${error.message}`
          );
        }
        client.render();
      },
      onStart: (inquiryId) => {
        console.log(`Started inquiry ${inquiryId}`);
      },
      onComplete: (inquiryId) => {
        console.log(`Sending finished inquiry ${inquiryId} to backend`);
        fetch(`/server-handler?inquiry-id=${inquiryId}`);
      },
      onEvent: (name, meta) => {
        switch (name) {
          case 'start':
            console.log(`Received event: start`);
            break;
          default:
            console.log(
              `Received event: ${name} with meta: ${JSON.stringify(meta)}`
            );
        }
      },
    });

    return client;
  };

  useEffect(() => {
    (async () => {
      const client = await GetPersonaClient();
      setUser(client);
    })();
  }, []);

  return user;
};
