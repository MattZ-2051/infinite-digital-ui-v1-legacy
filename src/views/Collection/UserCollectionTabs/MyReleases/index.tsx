import styled from 'styled-components/macro';

const MyReleases = () => {
  return (
    <MyReleasesContainer>
      <TileContainer
        style={{ paddingRight: '10px', paddingLeft: '0' }}
      ></TileContainer>
      <TileContainer></TileContainer>
      <TileContainer></TileContainer>
    </MyReleasesContainer>
  );
};

const TileContainer = styled.div`
  padding: 0 10px;
`;

const MyReleasesContainer = styled.div`
  display: flex;
  overflow: auto;
  width: 100%;
`;

export default MyReleases;
