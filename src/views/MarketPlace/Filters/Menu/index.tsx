import styled from 'styled-components/macro';
import { useAppSelector } from 'hooks/store';

export interface IProps {
  handleFilter: (name: string, data: string) => void
  activeFilterStatus: string;
}

const MenuFilter: React.FC<IProps> = ({ handleFilter, activeFilterStatus }) => {

  console.log(activeFilterStatus)

  return (
    <ButtonFilters>
      <Li>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <Button
            onClick={() => handleFilter('status', 'all')}
            style={{ color: `${activeFilterStatus === 'all' ? 'black' : '#9e9e9e'}` }}>
            All
            </Button>
          <small style={{ paddingLeft: '10px', color: '#9e9e9e' }}>(12, 244)</small>
        </div>
      </Li>
      <Li>
        <Button
          onClick={() => handleFilter('status', 'released')}
          style={{ color: `${activeFilterStatus === 'released' ? 'black' : '#9e9e9e'}` }}>
          Released
        </Button>
      </Li>
      <Li>
        <Button
          onClick={() => handleFilter('status', 'upcoming')}
          style={{ color: `${activeFilterStatus === 'upcoming' ? 'black' : '#9e9e9e'}` }}>
          Upcoming
        </Button>
      </Li>
      <Li>
        <Button
          onClick={() => handleFilter('status', 'no-one-selling')}
          style={{ color: `${activeFilterStatus === 'no-one-selling' ? 'black' : '#9e9e9e'}` }}>
          No One Selling
          </Button>
      </Li>
    </ButtonFilters>
  );
};

const ButtonFilters = styled.ul`
  list-style-type: none;
  padding: 9px 16px;
  font-size: 24px;
  small {
            font - size: 16px;
  }
`;

const Li = styled.li`
  padding: 8px 0px;
`;

const Button = styled.button`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  border: none;
  color: #9e9e9e;
  background-color: transparent;
  :focus {
    outline: none;
    color: black;
  }
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
  padding: 0;
`;

export default MenuFilter;
