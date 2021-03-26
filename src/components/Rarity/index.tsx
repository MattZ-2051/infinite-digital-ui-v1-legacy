import styled from 'styled-components';
import React from 'react';


export interface IProps { }

const Rarity = ({ type }) => {
  return (
    <>
      {type === 'common' && (
        <StyledDiv>
          <p style={{ fontSize: '12px' }}>COMMON</p>
        </StyledDiv>
      )}
      {type === 'rare' && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ backgroundColor: 'black', width: '16px', height: '16px', borderRadius: '50%', background: 'linear-gradient(41.72deg, #00EB7C -14.01%, #11D6EC 90.62%)' }}></span>
          <RareStyle>Rare</RareStyle>
        </div>
      )}
      {type === 'uncommon' && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ backgroundColor: 'black', width: '16px', height: '16px', borderRadius: '50%', background: 'linear-gradient(45deg, #171717 0%, #777777 100%)' }}></span>
          <UncommonStyle>Uncommon</UncommonStyle>
        </div>
      )}
      {type === 'legendary' && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ backgroundColor: 'black', width: '16px', height: '16px', borderRadius: '50%', background: 'linear-gradient(45deg, #FF9412 0%, #FFF72D 98.96%)' }}></span>
          <LegendaryStyle>Legendary</LegendaryStyle>
        </div>
      )}
      {type === 'epic' && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ backgroundColor: 'black', width: '16px', height: '16px', borderRadius: '50%', background: 'linear-gradient(45deg, #40C9FF 0%, #E81CFF 100%)' }}></span>
          <EpicStyle>Epic</EpicStyle>
        </div>
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

const LegendaryStyle = styled.p`
  font-size: 16px;
  padding-left: 8px;
  background: -webkit-linear-gradient(45deg, #FF9412 0%, #FFF72D 98.96%);
  padding-top: 0.25rem;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background: -moz-linear-gradient(45deg, #FF9412 0%, #FFF72D 98.96%);
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
`;

const UncommonStyle = styled.p`
  font-size: 16px;
  padding-left: 8px;
  background: -webkit-linear-gradient(45deg, #171717 0%, #777777 100%);
  padding-top: 0.25rem;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background: -moz-linear-gradient(45deg, #171717 0%, #777777 100%);
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
`;

const RareStyle = styled.p`
  font-size: 16px;
  padding-left: 8px;
  background: -webkit-linear-gradient(41.72deg, #00EB7C -14.01%, #11D6EC 90.62%);
  padding-top: 0.25rem;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background: -moz-linear-gradient(41.72deg, #00EB7C -14.01%, #11D6EC 90.62%);
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
`;

const EpicStyle = styled.p`
  font-size: 16px;
  padding-left: 8px;
  background: -webkit-linear-gradient(45deg, #40C9FF 0%, #E81CFF 100%);
  padding-top: 0.25rem;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background: -moz-linear-gradient(45deg, #40C9FF 0%, #E81CFF 100%);
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
`;

export default Rarity
