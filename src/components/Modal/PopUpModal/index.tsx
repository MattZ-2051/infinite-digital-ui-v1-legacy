import { useMediaQuery } from '@material-ui/core';
import { ReactComponent as CloseModal } from 'assets/svg/icons/close-modal.svg';
import { useHistory } from 'react-router';
import Modal from '../index';
import * as S from './styles';

interface IProps {
  visible: boolean;
  setPopUpVisible: (visible: boolean) => void;
}
const PopUpModal = ({ visible, setPopUpVisible }: IProps) => {
  const matchesMobile = useMediaQuery('(max-width: 1100px)');
  const history = useHistory();

  const redirectToSpencerProfile = () => {
    history.push('/collection/SDinwiddie25');
    setPopUpVisible(false);
  };
  const imgSrcUrl = matchesMobile
    ? 'https://infinite-digital-prod.s3.amazonaws.com/spencer/profile/modal-freenft-mobile.png'
    : 'https://infinite-digital-prod.s3.amazonaws.com/spencer/profile/modal-freenft-desktop.png';

  const Body = () => {
    return (
      <S.Container>
        <S.CloseButton onClick={() => setPopUpVisible(false)}>
          <CloseModal style={{ cursor: 'pointer' }} />
        </S.CloseButton>
        {matchesMobile && <S.RightImgSection src={imgSrcUrl} />}

        <div>
          <S.LeftTextSection>
            <S.Text
              fontSize={matchesMobile ? '24px' : '40px'}
              padding="0 0 24px 0"
              fontColor="black"
              fontWeight={700}
            >
              Create an account today for your chance to win an NFT!
            </S.Text>
            <S.Text
              fontSize="16px"
              fontWeight={400}
              fontColor="black"
              lineHeight="26.5px"
              padding="0 0 8px 0"
            >
              We are giving away{' '}
              <span style={{ fontWeight: 700 }}>
                3D/AR sneaker NFTs from NBA player Spencer
                <br />
                {"Dinwiddie's 1st NFT"}
              </span>{' '}
              release and donating to the Dinwiddie Family
              <br />
              Foundation for each one claimed!
            </S.Text>
            <S.Text
              fontSize="16px"
              fontWeight={400}
              fontColor="black"
              lineHeight="26.5px"
            >
              3 lucky users will be able to redeem or resell the redeemable NFTs
              <br />
              for the signed physical pair of shoes from {"Spencer's"}{' '}
              collection!
            </S.Text>
            <S.FlexDiv
              justifyContent="none"
              alignItems="center"
              padding="24px 0"
              flexDirection={matchesMobile ? 'column' : 'row'}
            >
              <S.Button background="black" color="white">
                Sign Up Now
              </S.Button>
              <S.FlexDiv
                justifyContent="none"
                alignItems="center"
                flexDirection="row"
                padding={matchesMobile ? '24px 0 36px 0' : ''}
                onClick={redirectToSpencerProfile}
                style={{ cursor: 'pointer' }}
              >
                <S.Text
                  fontWeight={600}
                  fontSize="16px"
                  fontColor="black"
                  padding={matchesMobile ? '' : '0 10px 0 32px'}
                >
                  {"View Spencer's Collection"}
                </S.Text>
                <S.Arrow />
              </S.FlexDiv>
            </S.FlexDiv>
          </S.LeftTextSection>
          <S.LowerLeftSection>
            <S.GreyLowerSectionText>
              NFT winners will be announced by 8/6/2021.
              <br />
              No purchase necessary to enter, simply sign up for an account
              today!
            </S.GreyLowerSectionText>
          </S.LowerLeftSection>
        </div>

        {!matchesMobile && <S.RightImgSection src={imgSrcUrl} />}
      </S.Container>
    );
  };

  return (
    <Modal
      open={visible}
      onClose={() => setPopUpVisible(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      centered={true}
      padding="0px"
      borderRadius="0px"
    >
      <Body />
    </Modal>
  );
};

export default PopUpModal;
