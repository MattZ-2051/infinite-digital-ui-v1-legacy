import React, { useEffect, useState } from 'react';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';
import Persona, { Client } from 'persona';
// import ModalComponent from 'components/Modal';
// import { Inquiry } from 'persona';
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
  // const [valueUserToken, setUserToken] = useState<string>('');
  const { getAccessTokenSilently } = useAuth0();
  async function openClient() {
    const res = await getPersonalToken(await getAccessTokenSilently());
    // setUserToken(res.token);
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
  return (
    <S.Container>
      {/*<ModalComponent*/}
      {/*  open={Boolean(valueUserToken)}*/}
      {/*  centered={true}*/}
      {/*  disableEnforceFocus={true}*/}
      {/*  onClose={*/}
      {/*    () => {*/}
      {/*      setUserToken('');*/}
      {/*    }*/}
      {/*  }*/}
      {/*>*/}
      {/*  {valueUserToken && (*/}
      {/*    <Inquiry*/}
      {/*      templateId={config.kyc.templateLvl1}*/}
      {/*      environment={config.kyc.environmentType}*/}
      {/*      referenceId={valueUserToken}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*</ModalComponent>*/}
      {content}
    </S.Container>
  );
};

export default KycButton;
