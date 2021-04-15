import styled from "styled-components";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

interface IProps {}

const ActiveBids = () => {
  return (
    <Container>
      <TransactionDetail>
        <span style={{ fontSize: "16px", fontWeight: 600 }}>
          K8IROS — AK2 | #2465
        </span>
        <TransactionDescription>@gabrielcantarin</TransactionDescription>
      </TransactionDetail>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TransactionDescription>You bid</TransactionDescription>
            <ArrowIcon style={{ fontSize: "12px", marginBottom: "3px" }} />
            <span style={{ fontSize: "16px", fontWeight: 600 }}>$1200</span>
          </div>
          <TransactionDescription>Expires in 2h 47m</TransactionDescription>
        </div>
        <ArrowIcon style={{ marginLeft: "10px" }} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  padding: 20px 0;
`;

const TransactionDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

const ArrowIcon = styled(ArrowForwardIosIcon)`
  color: #9e9e9e;
`;

const TransactionDescription = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #9e9e9e;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export default ActiveBids;
