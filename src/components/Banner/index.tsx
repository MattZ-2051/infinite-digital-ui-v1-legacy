import styled from 'styled-components';

const Banner = () => {
  return (
    <BannerDiv>
      <img src="src/assets/img/icons/fire_Icon.png" alt='' />
    </BannerDiv>
  )
}


const BannerDiv = styled.div`
  border-left: 32px solid black;
  border-right: 32px solid black;
  border-bottom: 20px solid white;
  border-top: 48px solid black;
  display: inline-block;
`;

export default Banner;
