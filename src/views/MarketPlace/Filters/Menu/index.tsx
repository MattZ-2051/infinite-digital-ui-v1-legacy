 import styled from 'styled-components/macro';

export interface IProps {
  handleFilter: (name: string, data: string) => void
}

const MenuFilter: React.FC<IProps> = ({ handleFilter }) => {

  return (
    <ButtonFilters>
      <li>
        All <small>(12, 244)</small>
      </li>
      <li><button onClick={() => handleFilter('status', 'released')}>Released</button></li>
      <li>Upcoming</li>
      <li>No one selling</li>
    </ButtonFilters>
  );
};

const ButtonFilters = styled.ul`
  list-style-type: none;
  padding: 0;
  font-size: 24px;

  small {
    font-size: 16px;
  }
`;

export default MenuFilter;
