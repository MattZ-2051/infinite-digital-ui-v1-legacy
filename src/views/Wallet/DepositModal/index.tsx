import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
// local
import ModalComponent from 'components/Modal';
import { USDCDeposit } from '../USDCDeposit/USDCDeposit';
import { getPersonalToken } from 'services/api/userService';
import ExitButton from './components/ExitButton';
import HbarDeposit from '../HbarDeposit';
import SelectPayment from '../SelectPayment';

interface IDepositModal {
  kycMaxLevel: number;
  kycPending: boolean;
  isModalOpen?: boolean;
  handleClose: () => void;
}

export type modalContentType = 'SelectPayment' | 'HbarDeposit' | 'USDCDeposit';

const DepositModal = ({
  kycMaxLevel,
  kycPending,
  isModalOpen,
  handleClose,
}: IDepositModal): JSX.Element => {
  const { getAccessTokenSilently } = useAuth0();
  const [coinbaseMetadata, setCoinbaseMetadata] = useState<string>('');

  useEffect(() => {
    getCoinbaseMetadata();
  }, []);

  async function getCoinbaseMetadata() {
    let token = '';
    try {
      const res = await getPersonalToken(await getAccessTokenSilently());
      token = res.token;
      setCoinbaseMetadata(token);
    } catch (e) {
      console.log(e);
    }
  }

  const [modalContent, setModalContent] = useState<modalContentType>(
    'SelectPayment'
  );

  function resolveModalContent(componentName: string) {
    switch (componentName) {
      case 'HbarDeposit':
        return (
          <>
            <ExitButton exitAction={() => setModalContent('SelectPayment')} />
            <HbarDeposit
              handleClose={() => {
                setModalContent('SelectPayment');
                handleClose();
              }}
            />
          </>
        );
      case 'USDCDeposit':
        return (
          <>
            <ExitButton exitAction={() => setModalContent('SelectPayment')} />
            <USDCDeposit handleClose={handleClose} />
          </>
        );
      case 'SelectPayment':
        return (
          <>
            <ExitButton exitAction={handleClose} />
            <SelectPayment
              kycMaxLevel={kycMaxLevel}
              kycPending={kycPending}
              setModalContent={setModalContent}
              coinbaseMetadata={coinbaseMetadata}
            />
          </>
        );
    }
  }

  return (
    <ModalComponent
      open={isModalOpen || false}
      centered={true}
      disableEnforceFocus={true}
    >
      {resolveModalContent(modalContent)}
    </ModalComponent>
  );
};

export default DepositModal;
