import styled from 'styled-components/macro';
import BadgeMUI from '@material-ui/core/Badge';
import AvatarMUI from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';

// Icons
import PersonIcon from '@material-ui/icons/Person';

export interface IProps {
  [rest: string]: any;
}

const UserAvatar: React.FC<IProps> = ({ ...rest }) => {
  return (
    <Link to="/user-account" {...rest}>
      <Badge badgeContent={99} overlap="circle">
        <Avatar>
          <PersonIcon fontSize="large" />
        </Avatar>
      </Badge>
    </Link>
  );
};

const Badge = styled(BadgeMUI)`
  && {
    margin-left: 32px;

    .MuiBadge-badge {
      background-color: #ffffff;
      color: black;
      border: 1px solid black;
    }
  }
`;

const Avatar = styled(AvatarMUI)`
  && {
    height: 48px;
    width: 48px;
    background-color: white;
    color: black;
  }
`;

export default UserAvatar;
