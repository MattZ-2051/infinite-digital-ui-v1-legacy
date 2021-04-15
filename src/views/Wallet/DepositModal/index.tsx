import { useState } from 'react';
import styled from 'styled-components/macro';
import coinbaseIcon from 'assets/img/icons/coinbase-icon-large.png'
import sukuIcon from 'assets/img/icons/suku-icon.png'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import circleIcon from 'assets/img/icons/circle-icon.png';
import ModalComponent from 'components/Modal';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import exitIcon from 'assets/img/icons/exit-icon.png';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: '522px',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      paddingTop: '16px',
      outline: 'none',
      borderRadius: '10px'
    },
  }),
);

const DepositModal = ({ isModalOpen, handleClose }) => {

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <ExitIconDiv>
        <img src={exitIcon} onClick={handleClose} className="icon__exit" />
      </ExitIconDiv>
      <div style={{ padding: '0 40px 40px 40px' }}>
        <span style={{ fontSize: '22px', fontWeight: 600, borderBottom: '2px solid black', paddingBottom: '14px' }}>Select a payment to deposit</span>
        <GrayLine style={{ width: '100%' }}></GrayLine>
        <div style={{ fontSize: '16px', color: '#7d7d7d', paddingTop: '25px' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </div>
        <RowContainer>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={circleIcon} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '16px', fontWeight: 600 }}>Circle</span>
            <span style={{ fontSize: '16px', color: '#9e9e9e' }}>Pay with credit card</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}><ArrowForwardIosIcon /></div>
        </RowContainer>
        <RowContainer>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={coinbaseIcon} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '16px', fontWeight: 600 }}>Coinbase</span>
            <span style={{ fontSize: '16px', color: '#9e9e9e' }}>Pay with cryptocurrency</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}><ArrowForwardIosIcon /></div>
        </RowContainer>
        <RowContainer>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={sukuIcon} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '16px', fontWeight: 600, color: '#9e9e9e' }}>Suku</span>
            <span style={{ fontSize: '16px', color: '#9e9e9e' }}>Coming soon</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}><ArrowForwardIosIcon style={{ color: '#9e9e9e' }} /></div>
        </RowContainer>
      </div>
    </div>
  );
  return (
    <ModalComponent open={isModalOpen}>
      {body}
    </ModalComponent>
  )
}


const GrayLine = styled.div`
  border-bottom: 2px solid #d8d8d8;
  padding-top: 10px;
  width: 80%
`;

const RowContainer = styled.div`
  display: grid;
  grid-template-columns: 15% 55% 30%;
  padding-top: 40px;
  border-bottom: 1px solid #EBEBEB;
  padding-bottom: 21px;
  :hover {
    border-bottom: 1px solid black;
    cursor: pointer;
  }
`;

const ExitIconDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 16px;
  :hover .icon__exit {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export default DepositModal;
