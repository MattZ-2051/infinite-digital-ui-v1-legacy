import styled from "styled-components/macro";
import SuccessPage from "./SuccessPage";
import ErrorPage from "./ErrorPage";
import AddFunds from "./AddFunds";

interface IProps {
  existingCard?: boolean;
}

const CCDeposit = ({ existingCard }: IProps) => {
  return <div>CC Depsoit</div>;
};

export default CCDeposit;
