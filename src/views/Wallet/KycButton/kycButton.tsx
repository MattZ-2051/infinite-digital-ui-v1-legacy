import React, { useEffect, useState } from 'react';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';
import Persona, { Client } from 'persona';
// import ModalComponent from 'components/Modal';
// import { Inquiry } from 'persona';
import { getPersonalToken } from 'services/api/userService';
import { useAuth0 } from '@auth0/auth0-react';
import ReactTooltip from 'react-tooltip';
import * as S from './styles';
import { config } from '../../../config';
import UnverifiedUserIcon from 'assets/img/icons/unverifiedUser.png';
import VerifiedLvl1Icon from 'assets/img/icons/lvl1.png';
import VerifiedLvl2Icon from 'assets/img/icons/lvl2.png';
import PendingVerificationUserIcon from 'assets/img/icons/pendingVerificationUser.png';
import ArrowRightIcon from 'assets/svg/icons/deposit-funds-black.svg';

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
        <S.Content>
          {kycMaxLevel === 0 && (
            <>
              <S.FlexCenter
                style={{
                  marginBottom: '10px',
                }}
              >
                <S.PendingVerification src={PendingVerificationUserIcon} />
                <S.StatusText>Pending...</S.StatusText>
              </S.FlexCenter>
              <S.InfoText>Your account verification is in progress.</S.InfoText>
            </>
          )}
          {kycMaxLevel === 1 && (
            <>
              <S.FlexCenter
                style={{
                  marginBottom: '10px',
                }}
              >
                <S.VerifiedUserLvl1Icon src={VerifiedLvl1Icon} />
                <S.LevelIndicator>Lvl {kycMaxLevel}</S.LevelIndicator>
                <S.ArrowRight
                  style={{ marginRight: '10px' }}
                  src={ArrowRightIcon}
                />
                <S.PendingVerification src={PendingVerificationUserIcon} />
                <S.StatusText>Lvl {kycMaxLevel + 1} Pending...</S.StatusText>
              </S.FlexCenter>
              <S.InfoText>
                {
                  'You are eligible to deposit cryptocurrency and a cumulative balance > $10K'
                }
              </S.InfoText>
            </>
          )}
        </S.Content>
      </>
    );
  } else if (kycMaxLevel >= 1) {
    content = (
      <>
        <S.Content>
          <S.FlexCenter
            style={{
              marginBottom: '10px',
            }}
          >
            {kycMaxLevel === 1 ? (
              <S.VerifiedUserLvl1Icon src={VerifiedLvl1Icon} />
            ) : (
              <S.VerifiedUserLvl2Icon src={VerifiedLvl2Icon} />
            )}
            <S.LevelIndicator>Lvl {kycMaxLevel}</S.LevelIndicator>
          </S.FlexCenter>
          <S.InfoText>
            {
              'You are eligible to deposit cryptocurrency and a cumulative balance > $10K'
            }
          </S.InfoText>
        </S.Content>
      </>
    );
  } else {
    content = (
      <>
        <S.Content>
          <S.SecondaryContent>
            <S.FlexCenter>
              <S.BlockIcon src={UnverifiedUserIcon} />
              <S.StatusText>Unverified</S.StatusText>
            </S.FlexCenter>
            <S.VerifyButton onClick={openClient} color="black">
              Verify
            </S.VerifyButton>
          </S.SecondaryContent>
          <S.InfoText>
            {
              'Account verification is required for users to deposit cryptocurrency or >$10K USD from a credit card.'
            }
          </S.InfoText>
        </S.Content>
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
