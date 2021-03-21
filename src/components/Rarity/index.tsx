import styled from 'styled-components';

export interface IProps {
  rarityType: string;
}

const Rarity = ({ rarityType }: IProps) => {
  return (
    <>
      {rarityType === 'common' && (
        <StyledDiv>
          <p style={{ fontSize: '12px' }}>COMMON</p>
        </StyledDiv>
      )}
      {rarityType === 'rare' && (
        <StyledDiv color='#25E29E'>
          <p style={{ fontSize: '12px', color: 'black' }}>RARE</p>
        </StyledDiv>
      )}
      {rarityType === 'uncommon' && (
        <StyledDiv color='#AAAAAA'>
          <p style={{ fontSize: '0.75rem', color: 'black' }}>UNCOMMON</p>
        </StyledDiv>
      )}
      {rarityType === 'legendary' && (
        <StyledDiv color='#FCB955'>
          <p style={{ fontSize: '0.75rem', color: 'black' }}>LEGENDARY</p>
        </StyledDiv>
      )}
      {rarityType === 'epic' && (
        <StyledDiv color='#D57BFF'>
          <p style={{ fontSize: '1rem', color: 'black' }}>EPIC</p>
        </StyledDiv>
      )}
    </>
  )
}

const StyledDiv = styled.div`
  background-color: ${props => props.color || 'white'};
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
