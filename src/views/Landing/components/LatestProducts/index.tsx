import React from 'react';
import styled from 'styled-components/macro';
import AriaLanding from './AriaLanding';

export interface IProps {
  isAuthenticated: boolean;
}

const LatestProducts: React.FC<IProps> = ({ isAuthenticated }: IProps) => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event: React.ChangeEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  return <Container>{selectedTab === 0 && <AriaLanding />}</Container>;
};

const Container = styled.section`
  padding: 40px;
  height: 100%;
  bottom: 40px;
  max-width: 1440px;
  margin: auto;
  border-radius: 10px;
`;

export default LatestProducts;
