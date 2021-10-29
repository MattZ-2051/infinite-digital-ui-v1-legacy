import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  background-color: black;
  overflow: hidden;
  @media screen and (max-width: 640px) {
    height: 50vh;
  }
`;

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  padding: 0px 80px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 640px) {
    padding: 0px 20px;
  }
`;

export const StyledBackgroundVideo = styled.video`
  position: absolute;
  opacity: 50%;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`;

export const TextContainer = styled.div`
  color: white;
  width: fit-content;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 120px;
  @media screen and (max-width: 640px) {
    margin-bottom: 0px;
  }
`;

export const ArrowIcon = styled.img`
  transform: translateY(5px);
  @media screen and (max-width: 640px) {
    height: 20px;
  }
`;

export const FirstRowContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  width: fit-content;
  top: 0;
  left: 0;
  transform: translateY(-70px) translateX(-90px);
  @media screen and (max-width: 640px) {
    transform: translateY(-40px) translateX(-20px);
  }
`;

export const TextFirstRow = styled.span`
  font-family: Addington;
  font-size: 68px;
  font-weight: 200;
  font-style: italic;
  margin-right: 10px;
  white-space: nowrap;
  @media screen and (max-width: 640px) {
    font-size: 36px;
  }
`;

export const MiddleRowContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const TextMiddleRow = styled.span`
  text-align: center;
  font-size: 80px;
  font-weight: 800;
  text-transform: uppercase;
  white-space: nowrap;
  @media screen and (max-width: 640px) {
    font-size: 26px;
  }
`;

export const LastRowContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  width: fit-content;
  bottom: 0;
  right: 0;
  transform: translateY(90px) translateX(120px);
  @media screen and (max-width: 640px) {
    transform: translateY(45px) translateX(0px);
  }
`;

export const Pill = styled.span`
  font-size: 32px;
  font-weight: 400;
  text-transform: uppercase;
  padding: 5px 20px;
  border: solid white 1px;
  border-radius: 999px;
  margin-right: 10px;
  @media screen and (max-width: 640px) {
    margin-right: 5px;
    padding: 2.5px 10px;
    font-size: 16px;
  }
`;

export const TextLastRow = styled.span`
  font-family: Addington;
  font-size: 96px;
  font-weight: 200;
  font-style: italic;
  white-space: nowrap;
  @media screen and (max-width: 640px) {
    font-size: 36px;
  }
`;

export const SubText = styled.p`
  margin: 0;
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 30px;
  color: ${(props) => `${props.color}`};
  text-align: center;
  @media screen and (max-width: 640px) {
    display: none;
  }
`;
