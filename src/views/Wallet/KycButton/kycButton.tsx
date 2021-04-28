import React, { useEffect, useState } from 'react';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';
import Persona, { Client } from 'persona';
import { S as StylesFromWallet } from '../index';
import { getPersonalToken } from 'services/api/userService';
import { useAuth0 } from '@auth0/auth0-react';

const KycButton = ({}: any): JSX.Element => {
  const [userToken, setUserToken] = useState<string>();
  const { getAccessTokenSilently } = useAuth0();

  async function initializeToken() {
    const res = await getPersonalToken(await getAccessTokenSilently());
    setUserToken(res.token);
  }

  useEffect(() => {
    initializeToken();
  }, []);

  const client: Client = new Persona.Client({
    templateId: 'tmpl_RdoVrNaCQZ2mNCm6Q9W7jg2z',
    environment: 'sandbox',
    referenceId: userToken,
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

  function openClient() {
    client.open();
  }

  return (
    <StylesFromWallet.ActionButton onClick={openClient}>
      Verification Status: tbd
    </StylesFromWallet.ActionButton>
  );
};

export default KycButton;
