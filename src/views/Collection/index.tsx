import { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
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
  const userId = history.location.pathname.split('/')[2];
  const { isAuthenticated } = useAuth0();

  async function fetchUser() {
    try {
      const data = await getUser(userId);
      if (data) {
        setUser(data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [userId]);

  if (user._id === '0') return <PageLoader />;

  return (
    <Container>
      <ViewContainer>
        {bannerPhotoUrl ? (
          <BackgroundImageContainer
            src={bannerPhotoUrl}
            styles={{
              height: '500px',
              width: '100%',
              boxShadow: 'inset 0px -10px 80px 100px black',
            }}
          >
            <UserCollectionInfo user={user} isAuthenticated={isAuthenticated} />
          </BackgroundImageContainer>
        ) : (
          <UserCollectionInfo user={user} isAuthenticated={isAuthenticated} />
        )}
        <FlexRow
          style={{
            margin: '5rem',
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
            <Container style={{ marginRight: '2.5rem', height: 'fit-content' }}>
              <Media
                src={midPhotoUrl}
                styles={{
                  height: '549px',
                  width: '549px',
                  borderRadius: '50%',
                }}
              />
            </Container>
          )}
          <Container style={{ marginLeft: '2.5rem' }}>
            <FlexColumn childMargin="1rem" style={{ margin: '1rem' }}>
              {descriptionIcon && (
                <Media
                  src={descriptionIcon}
                  styles={{ maxHeight: '98px', maxWidth: '98px' }}
                />
              )}
              <TextContainer textAlign="left" fontSize="28" fontWeight={'700'}>
                {descriptionHeaderMain &&
                  `${descriptionHeaderMain
                    .slice(0, 1)
                    .toLocaleUpperCase()}${descriptionHeaderMain
                    .slice(1, descriptionHeaderMain.length)
                    .toLocaleLowerCase()}`}
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
          </Container>
        </FlexRow>
        <UserCollectionTabs user={user} isAuthenticated={isAuthenticated} />
        <Container
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
        </Container>
      </ViewContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  /* NOTE: This is setting children to black. Might need a more elegant way */
  > * {
    background-color: black;
    color: white;
  }
`;
export default Collection;
