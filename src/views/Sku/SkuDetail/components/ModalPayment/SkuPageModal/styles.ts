import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';

export const CloseButton = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
`;

export const ImageContainer = styled.div`
  margin: -20px -20px 0 -20px;
  position: relative;
  min-height: 154px;
  background-color: #f4f4f4;
  border-radius: 12px 12px 0 0;
  margin-bottom: 34px;
  overflow: hidden;
  img {
    display: block;
    width: 410px;
    height: 154px;
    object-fit: cover;
  }
`;

export const Header = styled.div`
  border-bottom: 1px solid #ebebeb;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 24px;
  padding-top: 20px;
  font-weight: 600;
`;

export const Title = styled.p`
  margin: 0;
  font-weight: 600;
  font-size: 20px;
`;

export const SubTitle = styled.p`
  font-weight: 600;
  font-size: 14px;
  color: #12c95f;
  margin: 0;
  padding-top: 8px;
  text-align: center;
`;

export const IssuerName = styled.p`
  font-size: 15px;
  color: #9e9e9e;
  font-weight: 600;
`;

export const SerialNum = styled.p`
  font-size: 15px;
  color: #9e9e9e;
  font-weight: 600;
  padding-top: 16px;
`;

export const Body = styled.div`
  padding: 20px;
  width: 100%;
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
`;

export const SerialName = styled.p`
  margin: 0;
  font-size: 16px;
  color: #9e9e9e;
  font-weight: 500;
  padding-top: 16px;
`;

export const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Check = styled(Checkbox)`
  .Mui-checked {
    color: black;
  }
  .Mui-checked:hover {
    border: none;
    background: none;
  }
  color: black;
  background: transparent;
`;

export const Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SkuName = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  width: 100%;
`;

export const SeriesName = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: black;
  padding-top: 16px;
`;

export const SkuInfo = styled.div`
  border-bottom: 1px solid #ebebeb;
  width: 100%;
  padding-bottom: 24px;
`;

export const PriceInfo = styled.p`
  font-size: 16px;
  color: #9e9e9e;
  margin: 0;
  font-weight: 600;
  padding-top: 12px;
`;

export const Total = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  padding-top: 18px;
`;

export const Text = styled.p`
  font-size: 16px;
  color: #7d7d7d;
  width: 304px;
  text-align: center;
  padding-top: 12px;
`;

export const TermLink = styled.p`
  padding-top: 18px;
  margin: 0;
  font-size: 16px;
  margin-left: 10px;
  font-weight: 600;
  border-bottom: 1px solid black;
`;

export const Terms = styled.p`
  padding-top: 18px;
  margin: 0;
  font-size: 16px;
`;

export const Button = styled.button`
  min-height: 56px;
  margin-left: auto;
  margin-right: auto;
  display: block;
  width: min(330px, 100%);
  border: none;
  background-color: black;
  font-size: 20px;
  font-weight: 600;
  border-radius: 35px;
  color: white;
  :hover {
    cursor: pointer;
  }
  :focus {
    outline: none;
  }
`;

export const SubButton = styled.button`
  min-height: 56px;
  width: min(330px, 100%);
  margin-left: auto;
  margin-right: auto;
  display: block;
  border: none;
  background-color: white;
  font-size: 20px;
  font-weight: 600;
  border-radius: 35px;
  color: black;
  :hover {
    cursor: pointer;
  }
  :focus {
    outline: none;
  }
`;

export const ContentIconTitle = styled.div`
  display: flex;
`;
