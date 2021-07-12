import styled from 'styled-components';
import React from 'react';

export interface IProps {
  type?: string;
  fontSize?: string;
  fontWeight?: string;
  margin?: string;
}

interface RarityColors {
  uncommon: string;
  rare: string;
  legendary: string;
  epic: string;
}

const rarityColors: RarityColors = {
  uncommon: 'linear-gradient(45deg, #171717 0%, #777777 100%)',
  rare: 'linear-gradient(41.72deg, #00EB7C -14.01%, #11D6EC 90.62%)',
  legendary: 'linear-gradient(45deg, #FF9412 0%, #FFF72D 98.96%)',
  epic: 'linear-gradient(45deg, #40C9FF 0%, #E81CFF 100%)',
};

const Rarity = ({ type, fontSize, fontWeight, margin }: IProps) => {
  return (
    <>
      {type === 'rare' && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              backgroundColor: 'black',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: `${rarityColors['rare']}`,
            }}
          ></span>
          <RareStyle
            fontSize={fontSize}
            fontWeight={fontWeight}
            margin={margin}
          >
            Rare
          </RareStyle>
        </div>
      )}
      {type === 'common' && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}
        >
          <span
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: 'white',
            }}
          ></span>
          <CommonStyle
            fontSize={fontSize}
            fontWeight={fontWeight}
            margin={margin}
          >
            Common
          </CommonStyle>
        </div>
      )}
      {type === 'uncommon' && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: `${rarityColors['uncommon']}`,
            }}
          ></span>
          <UncommonStyle
            fontSize={fontSize}
            fontWeight={fontWeight}
            margin={margin}
          >
            Uncommon
          </UncommonStyle>
        </div>
      )}
      {type === 'legendary' && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: `${rarityColors['legendary']}`,
            }}
          ></span>
          <LegendaryStyle
            fontSize={fontSize}
            fontWeight={fontWeight}
            margin={margin}
          >
            Legendary
          </LegendaryStyle>
        </div>
      )}
      {type === 'epic' && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: `${rarityColors['epic']}`,
            }}
          ></span>
          <EpicStyle
            fontSize={fontSize}
            fontWeight={fontWeight}
            margin={margin}
          >
            Epic
          </EpicStyle>
        </div>
      )}
    </>
  );
};

const RarityStyle = styled.p<{
  fontSize?: string;
  fontWeight?: string;
  margin?: string;
}>`
  font-weight: ${({ fontWeight }) => fontWeight || '600'};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '16px')};
  padding-bottom: 5px;
  ${(props) => props.margin && `margin: ${props.margin}`};
`;

const LegendaryStyle = styled(RarityStyle)`
  padding-left: 8px;

  background: -moz-linear-gradient(45deg, #ff9412 0%, #fff72d 98.96%);
  background: -webkit-linear-gradient(45deg, #ff9412 0%, #fff72d 98.96%);
  background: linear-gradient(45deg, #ff9412 0%, #fff72d 98.96%);
  padding-top: 0.25rem;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const UncommonStyle = styled(RarityStyle)`
  padding-left: 8px;
  background: #777777;
  padding-top: 0.25rem;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const RareStyle = styled(RarityStyle)`
  padding-left: 8px;
  background: -webkit-linear-gradient(
    41.72deg,
    #00eb7c -14.01%,
    #11d6ec 90.62%
  );
  padding-top: 0.25rem;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background: -moz-linear-gradient(41.72deg, #00eb7c -14.01%, #11d6ec 90.62%);
  background: -webkit-linear-gradient(
    41.72deg,
    #00eb7c -14.01%,
    #11d6ec 90.62%
  );
  background: linear-gradient(41.72deg, #00eb7c -14.01%, #11d6ec 90.62%);
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
  background-clip: text;
`;

const CommonStyle = styled(RarityStyle)`
  padding-left: 8px;
  color: #8e8e8e;
  padding-top: 0.25rem;
`;

const EpicStyle = styled(RarityStyle)`
  padding-left: 8px;
  background: -moz-linear-gradient(45deg, #40c9ff 0%, #e81cff 100%);
  background: -webkit-linear-gradient(45deg, #40c9ff 0%, #e81cff 100%);
  background: linear-gradient(45deg, #40c9ff 0%, #e81cff 100%);
  padding-top: 0.25rem;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default Rarity;
