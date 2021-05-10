import styled from 'styled-components/macro';

export const S: any = {};

S.CloseButton = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
`;

S.CloseButton = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
`;

S.ImageContainer = styled.div`
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

S.Header = styled.div`
  border-bottom: 1px solid #ebebeb;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 24px;
`;

S.Title = styled.p`
  margin: 0;
  font-weight: 500;
  font-size: 22px;
`;

S.SubTitle = styled.p`
  font-weight: 500;
  font-size: 14px;
  color: #12c95f;
  margin: 0;
  padding-top: 8px;
`;

S.IssuerName = styled.p`
  font-size: 15px;
  color: #9e9e9e;
  font-weight: 600;
`;

S.Body = styled.div`
  padding: 20px;
  width: min-content;
`;

S.FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

S.Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

S.SkuName = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  width: 100%;
`;

S.SkuInfo = styled.div`
  border-bottom: 1px solid #ebebeb;
  width: 100%;
  padding-bottom: 24px;
`;

S.PriceInfo = styled.p`
  font-size: 16px;
  color: #9e9e9e;
  margin: 0;
  font-weight: 600;
  padding-top: 12px;
`;

S.Total = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  padding-top: 18px;
`;

S.Text = styled.p`
  font-size: 16px;
  color: #7d7d7d;
  width: 304px;
  text-align: center;
  padding-top: 12px;
`;

S.Terms = styled.p`
  padding-top: 18px;
  margin: 0;
`;

S.Button = styled.button`
  min-height: 56px;
  width: 330px;
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

S.SubButton = styled.button`
  min-height: 56px;
  width: 330px;
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
