import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserCollectionInfo from './UserCollectioinInfo';
import UserCollectionTabs from './UserCollectionTabs';
import { useHistory } from 'react-router-dom';
import { getUser } from 'services/api/userService';
import { useAuth0 } from '@auth0/auth0-react';
import { FlexColumn, FlexRow } from 'components/Layout';
import { ViewContainer } from 'components/Layout/Container/ViewContainer';
import { Image, BackgroundImageContainer } from 'components/Image';
import { TextContainer, GradientText } from '../../components/Text';
import { User } from 'entities/user';
import { userFactory } from 'store/user/userFactory';
import { PulseLoader } from 'react-spinners';

const splitLastSentence = (text: string): [string, string] => {
  const splitText = text.split('. ');

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
    profilePhotoUrl,
    bannerPhotoUrl,
    midPhotoUrl,
    descriptionIcon,
    descriptionHeader,
    descriptionBody,
    footerPhotoUrl,
    tagline,
  } = user;
  const [descriptionBodyMain, descriptionBodyGradient] = splitLastSentence(
    descriptionBody
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

  if (user === null) return <h1>Loading</h1>;

  return (
    <Container>
      <ViewContainer>
        <BackgroundImageContainer
          src={bannerPhotoUrl}
          styles={{
            height: '500px',
            width: '100%',
          }}
        >
          <UserCollectionInfo user={user} isAuthenticated={isAuthenticated} />
        </BackgroundImageContainer>
        <FlexRow style={{ margin: '5rem' }}>
          {midPhotoUrl && (
            <Container style={{ marginRight: '2.5rem' }}>
              <Image src={midPhotoUrl} maxHeight="648px" maxWidth="518px" />
            </Container>
          )}
          <Container style={{ marginLeft: '2.5rem' }}>
            <FlexColumn childMargin="1rem" style={{ margin: '1rem' }}>
              {descriptionIcon && (
                <Image src={descriptionIcon} maxHeight="98px" maxWidth="98px" />
              )}
              <TextContainer textAlign="left" fontSize="28">
                {descriptionBodyMain}
                <GradientText textAlign="left" fontSize="28">
                  {descriptionBodyGradient}
                </GradientText>
              </TextContainer>
              <TextContainer fontSize="18">{descriptionBody}</TextContainer>
            </FlexColumn>
          </Container>
        </FlexRow>
        <UserCollectionTabs user={user} isAuthenticated={isAuthenticated} />
        <Container
          style={{
            marginLeft: '2.5rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <FlexColumn
            childMargin="1rem"
            style={{ margin: '1rem', alignItems: 'center', width: '80%' }}
          >
            {footerPhotoUrl && (
              <Image src={footerPhotoUrl} maxHeight="600px" maxWidth="500px" />
            )}
            <TextContainer textAlign="center" fontSize="48" fontWeight="400">
              {taglineMain}
              <GradientText textAlign="center" fontSize="48" fontWeight="400">
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
