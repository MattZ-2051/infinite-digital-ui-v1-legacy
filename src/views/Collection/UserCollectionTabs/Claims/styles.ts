import styled from 'styled-components/macro';
import { ReactComponent as Redeemable } from 'assets/svg/icons/redeemable2.svg';
import { Theme } from 'theme/theme';

export const RedeemIcon = styled(Redeemable)`
  margin-right: 5px;
`;

export const Container = styled.div`
  display:flex; 
  margin: auto;
  :hover {
    overflow: auto;
  }
  flex-wrap: wrap;
  width: 100%;
  @media screen and (max-width: 840px) {
    justify-content: center;
  }
`;

export const Li = styled.li`
  margin-top: 20px;
  color: #9E9E9E;
  font-weight: 400;
  font-size: 16px;
  line-height: 25.6px;
`

export const Text = styled.p`
  color: #9E9E9E;
  font-weight: 400;
  font-size: 16px;
  line-height: 25.6px;
`
export const TileContainer = styled.div<{ index: number }>`
  padding: 0 12px;
`;

export const Link = styled.a<{ themeStyle?: string, theme: Theme }>`
  font-weight: 400px;
  color: ${({ themeStyle, theme }) =>
    themeStyle === 'dark'
      ? theme.palette.dark.baseComplement
      : theme.palette.light.baseComplement};
`;

export const NoClaimableItems = styled.div`
  display: flex;
  flex:1;
  justify-content: center;
  align-items: center;
`;

export const ContentLoading = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ContentText = styled.div`
  width: 55%; 
  text-align: center;
`;

export const TextLoading = styled(Text)`
  color: #7D7D7D;
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
`;

export const Header = styled.p`
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  padding-left: 10px;
`;

export const SubHeaderContainer = styled.div`
  border-bottom: 1px solid #ebebeb;
`;

export const RowFlex = styled.div<{ padding: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: fit-content;
  padding: ${(props) => `${props.padding}`};
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 24px;
  border-bottom: 1px solid #ebebeb;
  margin-top: 30px;
  `;

export const Slash = styled.span<{ padding: string }>`
  padding: ${(props) => `${props.padding}`};
`;

export const IssuerName = styled.p`
  margin: 0;
  font-size: 15px;
  color: #9e9e9e;
  font-weight: 400;
`;

export const SkuName = styled.p`
  margin: 0;
  font-size: 20px;
  color: black;
  font-weight: 600;
  padding-bottom: 10px;
`;

export const SeriesName = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 400;
`;

export const Serial = styled.p`
  margin: 0;
  font-size: 16px;
  color: #9e9e9e;
  line-height: 20px;
`;

export const SerialNum = styled.p`
  margin: 0;
  font-size: 15px;
  font-weight: 400;
  color: #9e9e9e;
`;

export const RedeemableText = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
`;

export const ContentSuccessfullyText = styled.div`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const SuccessfullyText = styled.span`
  font-size: 16px;
  line-height: 160%;
  color: #7D7D7D;
`
export const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  border: none;
  border-radius: 35px;
  background-color: black;
  width: 330px;
  height: 56px;
  font-size: 20px;
  color: white;
  font-weight: 600;
  :hover {
    cursor: pointer;
  }

  :focus {
    outline: none;
  }
`;

export const LinkButton = styled.button`
  border: none;
  border-radius: 35px;
  background-color: white;
  width: 330px;
  height: 56px;
  font-size: 20px;
  color: black;
  font-weight: 600;
  :hover {
    cursor: pointer;
  }

  :focus {
    outline: none;
  }
`;