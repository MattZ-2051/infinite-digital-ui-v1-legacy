import { useEffect, useState } from 'react';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';
import Persona, { Client } from 'persona';
import { getPersonalToken } from 'services/api/userService';
import { useAuth0 } from '@auth0/auth0-react';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ReactTooltip from 'react-tooltip';
import * as S from './styles';
import { config } from '../../../config';

const KycButton = ({
  kycPending,
  kycMaxLevel,
}: {
  kycPending: boolean;
  kycMaxLevel: number;
}): JSX.Element | null => {
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
    templateId: config.kyc.templateLvl1,
    environment: config.kyc.environmentType,
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

  let content;
  if (kycPending) {
    content = (
      <>
        <AccessTimeIcon />
        <S.StatusText>Pending...</S.StatusText>
      </>
    );
  } else if (kycMaxLevel >= 1) {
    content = (
      <>
        <S.VerifiedUserOutlinedIcon />
        <S.LevelIndicator>lvl {kycMaxLevel}</S.LevelIndicator>
      </>
    );
  } else {
    content = (
      <>
        <ReactTooltip className="extraClass" delayHide={500} effect="solid">
          <S.LearnMore href="#">Learn more</S.LearnMore>
        </ReactTooltip>
        <S.BlockIcon onClick={openClient} data-tip />
        <S.StatusText>Unverified</S.StatusText>
      </>
    );
  }
  return <S.Container>{content}</S.Container>;
};

export default KycButton;