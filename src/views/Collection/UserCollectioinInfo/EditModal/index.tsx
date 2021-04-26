import React, { useState } from 'react';
import styled from 'styled-components/macro';
import ModalComponent from 'components/Modal';
import exitIconImg from 'assets/img/icons/exit-icon.png';
import checkIconImg from 'assets/img/icons/check-icon.png';
import { updateUsernameThunk } from 'store/session/sessionThunks';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppDispatch, useAppSelector } from 'store/hooks';

interface Props {
  isModalOpen: boolean;
  handleClose: () => void;
}

const S: any = {};

const EditModal = ({ isModalOpen, handleClose }: Props) => {
  const [newUsername, setNewUsername] = useState<string>('');
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.session.user.id);

  const handleSubmit = async () => {
    const token = await getAccessTokenSilently();
    const data = { token: token, userId: userId, username: newUsername };
    dispatch(updateUsernameThunk(data));
    return;
  };
  return (
    <ModalComponent open={isModalOpen}>
      <S.Container>
        {
          <S.Body>
            <S.Icon>
              <S.ExitIconImg src={exitIconImg} onClick={handleClose} />
            </S.Icon>
            <S.Content>
              <S.Header>Edit Profile</S.Header>
              <S.SubHeader>
                Lorem ipsum dolor sit amet, adipiscing elit.
              </S.SubHeader>
              <S.Input>
                <S.At>@</S.At>
                <S.UsernameInput
                  onChange={(e) => setNewUsername(e.target.value)}
                  value={newUsername}
                />
                <S.CheckIcon>
                  <S.CheckIconImg src={checkIconImg} />
                </S.CheckIcon>
              </S.Input>
              <S.Border></S.Border>
              <div style={{ paddingTop: '50px' }}>
                <S.Button onClick={handleSubmit}>Update Username</S.Button>
              </div>
            </S.Content>
          </S.Body>
        }
      </S.Container>
    </ModalComponent>
  );
};

S.Container = styled.div`
  positioin: absolute;
  width: 410px;
  height: 315px;
  background-color: white;
  outline: none;
  border-radius: 10px
  top: 50%;
  left: 50%;
  transform: translate-50%-50%;
`;

S.Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

S.SubHeader = styled.span`
  font-size: 16px;
  color: #7d7d7d;
  font-weight: 400;
  padding-top: 24px;
`;

S.UsernameInput = styled.input`
  width: 65%;
  border: none;
  font-size: 16px;
  :focus {
    outline: none;
  }
`;

S.At = styled.span`
  padding-right: 10px;
  font-size: 16px;
  color: #7d7d7d;
`;

S.Input = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding-top: 30px;
`;

S.Button = styled.button`
  width: 330px;
  height: 56px;
  font-size: 18px;
  font-weight: 600;
  background-color: black;
  border-radius: 35px;
  color: white;
  border: none;
  :hover {
    cursor: pointer;
    transform: scale(1.025);
  }
  :focus {
    outline: none;
  }
`;

S.Border = styled.span`
  height: 20px;
  width: 77%;
  border-bottom: 1px solid black;
`;

S.Icon = styled.div`
  display: flex;
  justify-content: flex-end;
`;

S.Header = styled.span`
  font-size: 22px;
  font-weight: 600;
`;

S.CheckIcon = styled.div`
  padding-left: 8px;
  display: flex;
  align-items: center;
`;

S.ExitIconImg = styled.img`
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

S.CheckIconImg = styled.img`
  height: fit-content;
`;

S.Body = styled.div`
  width: 100%;
`;

export default EditModal;
