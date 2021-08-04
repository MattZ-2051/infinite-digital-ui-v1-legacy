import { useEffect, useState } from 'react';
import Persona, { Client } from 'persona';
import { getPersonalToken } from 'services/api/userService';
import { useAuth0 } from '@auth0/auth0-react';
import { config } from '../config';

export const useKycClient = (): Client | undefined => {
  const { getAccessTokenSilently } = useAuth0();
  const [user, setUser] = useState<Client>();

  const GetPersonaClient = async () => {
    const res = await getPersonalToken(await getAccessTokenSilently());

    const client: Client = new Persona.Client({
      templateId: config.kyc.templateLvl1,
      environment: config.kyc.environmentType,
      referenceId: res.token,
      onLoad: (error) => {
        if (error) {
          console.error(
            `Failed with code: ${error.code} and message ${error.message}`
          );
        } else {
          client.render();
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
