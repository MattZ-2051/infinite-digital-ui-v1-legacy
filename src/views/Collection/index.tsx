import { useState, useEffect } from 'react';
import UserCollectionInfo from './UserCollectioinInfo';
import UserCollectionTabs from './UserCollectionTabs';
import { useHistory } from 'react-router-dom';
import { getUser } from 'services/api/userService';
import { useAuth0 } from '@auth0/auth0-react';
import { FlexColumn, FlexRow } from 'components/Layout';
import { ViewContainer } from 'components/Layout/Container/ViewContainer';
import { BackgroundImageContainer } from 'components/Image';
import { TextContainer, GradientText } from '../../components/Text';
import { User } from 'entities/user';
import { userFactory } from 'store/user/userFactory';
import PageLoader from 'components/PageLoader';
import { Media } from 'components/Media/Media';
import * as S from './styles';

const splitLastSentence = (text: string): [string, string] => {
  const splitText = text?.split('. ');

  if (!splitText || splitText.length === 0) {
    return ['', ''];
  }

  if (splitText.length === 1) {
    return [splitText[0], ''];
  }
  let lastSentence = splitText?.pop();
  if (lastSentence === '') {
    lastSentence = splitText.pop();
  }

  const startText = splitText?.length && splitText.join('. ') + '. ';

  return [startText || '', lastSentence || ''];
};

const Collection = (): JSX.Element => {
  const [user, setUser] = useState<User>(userFactory.build());
  const {
    bannerPhotoUrl,
    midPhotoUrl,
    descriptionIcon,
    descriptionHeader,
    descriptionBody,
    footerPhotoUrl,
    tagline,
  } = user;
  const [descriptionHeaderMain, descriptionHeaderGradient] = splitLastSentence(
    descriptionHeader
  );
  const [taglineMain, taglineGradient] = splitLastSentence(tagline);

  const history = useHistory();
  const username = history.location.pathname.split('/')[2];
  const { isAuthenticated } = useAuth0();

  async function fetchUser() {
    try {
      const data = await getUser(username, 1, 1);
      if (data) {
        setUser(data[0]);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [username]);

  if (user._id === '0' || !user) return <PageLoader />;

  return (
    <S.Container>
      <ViewContainer>
        {bannerPhotoUrl ? (
          <BackgroundImageContainer src={bannerPhotoUrl}>
            <UserCollectionInfo user={user} isAuthenticated={isAuthenticated} />
          </BackgroundImageContainer>
        ) : (
          <UserCollectionInfo user={user} isAuthenticated={isAuthenticated} />
        )}
        <FlexRow
          style={{
            display:
              midPhotoUrl ||
              descriptionIcon ||
              descriptionHeaderMain ||
              descriptionHeaderGradient ||
              descriptionBody
                ? 'flex'
                : 'none',
            alignItems: 'center',
          }}
        >
          {midPhotoUrl && (
            <S.ContainerMarginRight style={{ height: 'fit-content' }}>
              <Media src={midPhotoUrl} styles={{}} />
            </S.ContainerMarginRight>
          )}
          <S.ContainerMarginLeft>
            <FlexColumn childMargin="1rem" style={{ margin: '1rem' }}>
              {descriptionIcon && (
                <Media
                  src={descriptionIcon}
                  styles={{ maxHeight: '98px', maxWidth: '98px' }}
                />
              )}
              <span
                style={{
                  fontWeight: 600,
                  color: '#8e8e8e',
                  fontSize: '24px',
                  marginBottom: '28px',
                }}
              >
                {user.username}
              </span>
              <TextContainer
                textAlign="left"
                fontSize="28"
                fontWeight={'700'}
                style={{ marginTop: '0px' }}
              >
                {descriptionHeaderMain &&
                  `${descriptionHeaderMain.slice(
                    0,
                    1
                  )}${descriptionHeaderMain.slice(
                    1,
                    descriptionHeaderMain.length
                  )}`}
                <GradientText textAlign="left" fontSize="28" fontWeight="700">
                  {descriptionHeaderGradient && descriptionHeaderGradient}
                </GradientText>
              </TextContainer>
              <TextContainer
                fontSize="18"
                style={{
                  color: '#9a9a9a',
                  fontSize: '16px',
                  lineHeight: '29px',
                  fontWeight: 500,
                }}
              >
                {descriptionBody}
              </TextContainer>
            </FlexColumn>
          </S.ContainerMarginLeft>
        </FlexRow>
        <UserCollectionTabs user={user} isAuthenticated={isAuthenticated} />
        <S.Container
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <FlexColumn
            childMargin="1rem"
            style={{
              margin: '1rem',
              alignItems: 'center',
              width: '80%',
              marginTop: '2rem',
            }}
          >
            <TextContainer
              textAlign="center"
              fontSize="48"
              fontWeight="700"
              style={{ marginBottom: '160px' }}
            >
              {taglineMain}
              <GradientText textAlign="center" fontSize="48" fontWeight="700">
                {taglineGradient}
              </GradientText>
            </TextContainer>
          </FlexColumn>
        </S.Container>
      </ViewContainer>
    </S.Container>
  );
};

export default Collection;
