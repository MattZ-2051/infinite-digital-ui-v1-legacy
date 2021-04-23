import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import styled from 'styled-components/macro';

export default function StarRatings() {
  return (
    <RatingDiv>
      <RatingBox component="fieldset" mb={3} borderColor="transparent">
        <Star name="read-only" value={4} />
      </RatingBox>
    </RatingDiv>
  );
}

const Star = styled(Rating)`
  && {
    color: white;
    font-size: 1.25rem;
    bottom: 5px;
    .MuiRating-iconEmpty {
      color: #333333;
    }
  }
`;

const RatingBox = styled(Box)`
  && {
    position: absolute;
    margin-top: 16px;
    margin-right: 16px;
    background-color: black;
    width: 112px;
    border-radius: 16px;
    height: 20px;
  }
`;

const RatingDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
