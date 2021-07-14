import styled from 'styled-components/macro';
import { ReactComponent as linkSVG } from 'assets/svg/icons/link-icon.svg';
import { ReactComponent as copySVG } from 'assets/svg/icons/copy-to-clipboard-icon.svg';
import { ReactComponent as checkSVG } from 'assets/svg/icons/check.svg';
export const HbarIcon = styled.div`
  display: flex;
  align-items: center;
`;

export const BodyHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 2px solid black;
  padding-bottom: 14px;
  margin: 0 46px;
  @media screen and (max-width: 550px) {
    margin: 0 10px;
  }
`;

export const FlexSpaceBetween = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const BodyContainer = styled.div`
  position: initial;
  /*max-width: 900px;*/
  min-width: 522px;
  /*min-height: 551px;*/
  /*max-height: 750px;*/
  background-color: white;
  padding-top: 16px;
  outline: none;
  border-radius: 10px;
  transform: translate(0);
  @media screen and (max-width: 550px) {
    width: 90%;
    min-width: unset;
  }
`;

export const BodyContent = styled.div`
  padding: 0 46px 46px 46px;
  margin-top: 40px;
  > * + * {
    margin-top: 32px;
  }

  @media screen and (max-width: 550px) {
    padding: 0 10px;
  }
`;

export const GrayLine = styled.div`
  border-bottom: 2px solid #d8d8d8;
  padding-top: 12px;
  width: 80%;
`;

export const Header = styled.span`
  font-size: 22px;
  font-weight: 600;
  border-bottom: 2px solid black;
  padding-bottom: 14px;
`;

export const SubHeader = styled.div`
  font-size: 16px;
  color: #7d7d7d;
`;

export const FlexAlignCenter = styled.div`
  display: flex;
  align-items: center;
`;

export const FlexEnd = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  &.deposit__step {
    align-items: flex-start;
    p {
      margin-top: 0;
      margin-bottom: 0;
      line-height: 160%;
    }
  }
`;

export const AddressButton = styled.button`
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  border-radius: 22px;
  align-items: center;
  padding: 15px 22px;
  border: 0;
  width: 100%;

  :hover {
    cursor: pointer;
  }

  :hover svg {
    fill: #9e9e9e;
  }

  @media screen and (min-width: 420px) {
    flex-direction: row;
  }
  span {
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
  }
  .account-address {
    @media screen and (min-width: 420px) {
      margin-left: auto;
    }
    display: flex;
    flex-direction: row;
    align-items: center;
    svg {
      margin-left: 10px;
    }
  }
`;

export const WalletSubheader = styled.p`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  line-height: 160%;
  button {
    display: flex;
    background-color: unset;
    border: 0;
    padding: 0;
    margin: 0;
    margin-left: 12px;
  }
  .wallet__explorer {
    margin-bottom: 12px;
    color: #636363;
    display: flex;
    flex-direction: row;
    @media screen and (min-width: 420px) {
      margin-bottom: 0;
      margin-left: auto;
    }
  }
  @media screen and (min-width: 420px) {
    flex-direction: row;
  }
`;

export const NewDepositsSubheader = styled.p`
  margin-bottom: 24px;
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 600;
  .tx__number {
    @media screen and (min-width: 420px) {
      margin-left: auto;
    }
  }
  @media screen and (min-width: 420px) {
    flex-direction: row;
  }
`;

export const Centered = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 68% 27% 5%;
  & + & {
    border-top: 1px solid #ebebeb;
  }
  &:last-of-type {
    border-bottom: 1px solid #ebebeb;
  }
  padding: 20px 0;
  grid-template-columns: 48% 41% 11%;
  @media screen and (min-width: 960px) {
    grid-template-columns: 57% max-content 22% 14px;
    column-gap: 16px;
  }
`;

export const LatestTransactionsContainer = styled.div`
  @media screen and (min-width: 960px) {
    width: 750px;
  }
`;

export const ProductsGrid = styled.div`
  margin-bottom: 0;
  border-top: 1px solid #ebebeb;
  overflow-y: auto;
  max-height: 300px;
`;

export const LinkIcon = styled(linkSVG)`
  width: 24px;
  height: 24px;
  stroke: #9e9e9e;
  fill: none;
  :hover {
    stroke: black;
    cursor: pointer;
  }
`;

export const CopyIcon = styled(copySVG)`
  width: 19px;
  height: 22px;
  fill: black;
  :hover {
    fill: #9e9e9e;
    cursor: pointer;
  }
`;

export const CheckIcon = styled(checkSVG)`
  width: 19px;
  height: 19px;
  fill: black;
`;

export const ActionButton = styled.button`
  width: 100%;
  max-width: 412px;
  height: 56px;
  color: white;
  background-color: black;
  border: none;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  border-radius: 26px;
  border: 2px solid black;
  font-size: 20px;
  font-weight: 700;
  padding: 4px;
  :hover {
    background-color: white;
    color: black;
    cursor: pointer;
  }
  :focus {
    outline: none;
  }

  @media screen and (max-width: 960px) {
    width: 100%;
  }

  &.button__text {
    background-color: unset;
    color: #000;
    border: 0;
  }
`;

export const ActionButtonText = styled.button`
  width: 302px;
  height: 56px;
  color: white;
  background-color: black;
  border: none;
  justify-content: space-between;
  display: flex;
  align-items: center;
  border-radius: 26px;
  border: 2px solid black;
  :hover {
    background-color: white;
    color: black;
    cursor: pointer;
  }
  :focus {
    outline: none;
  }

  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;

export const TransactionDetail = styled.div<{
  status: 'success' | 'pending' | 'error';
}>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-transform: capitalize;
  color: ${({ status }) => {
    if (status === 'error') return '#da1010';
    return status === 'success' ? '#00C44F' : '#9e9e9e';
  }};
`;

export const TxIdContainer = styled.div`
  padding-left: 24px;
  color: #9e9e9e;
  font-size: 15px;
  font-weight: 400;
  padding-top: 10px;
  * + * {
    margin-top: 8px;
  }
  @media screen and (max-width: 960px) {
    padding-left: 0;
  }
`;
