import styled from 'styled-components/macro';

export const Container = styled.section`
  background-color: black;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 55px 24px 0 24px;
  color: white;
  padding-bottom: 100px;

  @media screen and (max-width: 960px) {
    font-size: 0.9rem;
    padding-bottom: 50px;
  }
`;

export const Title = styled.h1`
  font-size: 56px;
  font-weight: 700;
  margin: 50px 0 24px 0;

  span {
    background: linear-gradient(45deg, #ff9412 0%, #fff72d 98.96%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media screen and (max-width: 600px) {
    margin: 50px 0 24px 0;
    font-size: 40px;
    margin-bottom: 10%;
    // word-spacing: 100vw;
    span {
      font-size: 40px;
    }
  }
`;

export const Subtitle = styled.h2`
  font-weight: 500;
  font-size: 18px;
  color: #8e8e8e;
  margin-bottom: 32px;

  @media screen and (max-width: 600px) {
    margin-bottom: 12%;
  }
`;

export const ArrowButton = styled.div`
  position: relative;
  position: absolute;
  bottom: 90px;
  display: flex;
  justify-content: center;

  svg {
    font-size: 10rem;
    position: absolute;
    cursor: pointer;
  }

  svg + svg {
    top: 29px;
    cursor: pointer;
  }
`;

export const Img = styled.img`
  width: 100%;
  max-width: 700px;
`;
