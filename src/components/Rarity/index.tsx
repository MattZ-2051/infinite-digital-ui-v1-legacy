import styled from 'styled-components';

export interface IProps {
  type: string;
}

const Rarity = ({ type }: IProps) => {
  return (
    <>
      {type === 'common' && (
        <StyledDiv>
          <p>Common</p>
        </StyledDiv>
      )}
    </>
  )
}

const StyledDiv = styled.div`
  background-color: white;
  color: var(--grey-40);
  height: 50%;
  height: 23px;
  width: 94px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px 16px 2px 16px;
  border-radius: 16px;
`;

export default Rarity
