import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';

export interface IProps {}

const placeHolder = 'Search by brand, sneaker, model or handles...';

const SearchBar = () => {
  return (
    <SearchBarContainer>
      <SearchBarInput placeholder={placeHolder} />
      <SearchIcon />
    </SearchBarContainer>
  );
};

const SearchBarContainer = styled.div`
  width: 410px;
  height: 40px;
  background-color: #f4f4f4;
  display: flex;
  align-items: center;
  padding: 9px 12px;
`;

const SearchBarInput = styled.input`
  width: 100%;
  border: none;
  background-color: #f4f4f4;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

export default SearchBar;
