import styled from "styled-components";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

interface IProps {
  bidType: "exceeded" | "not-exceeded";
}

const activeColor = {
  red: "red",
  black: "black",
  grey: "#9e9e9e",
};

const ActiveBids = ({ bidType }: IProps) => {
  return (
    <Container>
      <TransactionDetail>
        <Name
          style={{
            color: `${
              bidType === "not-exceeded" ? activeColor.black : activeColor.red
            }`,
          }}
        >
          K8IROS — AK2 | #2465
        </Name>
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
            <TransactionDescription
              style={{
                color: `${
                  bidType === "not-exceeded"
                    ? activeColor.grey
                    : activeColor.red
                }`,
              }}
            >
              You bid
            </TransactionDescription>
            <ArrowIcon style={{ fontSize: "12px", margin: "0 5px" }} />
            {bidType === "exceeded" && (
              <>
                <TransactionDescription style={{ color: "red" }}>
                  Bid Exceeded
                </TransactionDescription>
                <ArrowIcon
                  style={{
                    fontSize: "12px",
                    margin: "0 5px",
                  }}
                />
              </>
            )}
            <span style={{ fontSize: "16px", fontWeight: 600 }}>$1200</span>
          </div>
          <TransactionDescription style={{ justifyContent: "flex-end" }}>
            Expires in 2h 47m
          </TransactionDescription>
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
  margin-bottom: 3px;
`;

const Name = styled.span`
  font-size: 16px;
  font-weight: 600;
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
