import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserCollectionInfo from './UserCollectioinInfo';
import UserCollectionTabs from './UserCollectionTabs';
import { useHistory } from 'react-router-dom';
import { getUser } from 'services/api/userService';
import { useAuth0 } from '@auth0/auth0-react';
import { FlexColumn, FlexRow } from 'components/Layout';
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

  if (user === null) {
    return (
      <Container>
        <PulseLoader
          size={50}
          color={'#000'}
          margin={10}
          css={
            'display:flex;justify-content:center;align-items:center;height:80%;'
          }
        />
      </Container>
    );
  }

  return (
    <Container>
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
            <Image src={midPhotoUrl} height="648px" width="518px" />
          </Container>
        )}
        <Container style={{ marginLeft: '2.5rem' }}>
          <FlexColumn childMargin="1rem" style={{ margin: '1rem' }}>
            {descriptionIcon && (
              <Image src={descriptionIcon} height="98px" width="98px" />
            )}
            <TextContainer textAlign="left" fontSize="28">
              {descriptionHeaderMain}
              <GradientText textAlign="left" fontSize="28">
                {descriptionHeaderGradient}
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
            <Image src={footerPhotoUrl} height="600px" width="500px" />
          )}
          <TextContainer textAlign="center" fontSize="48" fontWeight="400">
            {taglineMain}
            <GradientText textAlign="center" fontSize="48" fontWeight="400">
              {taglineGradient}
            </GradientText>
          </TextContainer>
        </FlexColumn>
      </Container>
    </Container>
  );
};

const Container = styled.div`
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    background-color: black;
    color: white;
  }
`;
export default Collection;
