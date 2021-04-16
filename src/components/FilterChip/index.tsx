import styled from 'styled-components/macro';
import ClearIcon from '@material-ui/icons/Clear';

export interface IProps {
  label?: string;
  type?: 'clear' | 'chip';
  onClick?: () => void;
}
const FilterChip = ({ label, type, onClick }: IProps) => {

  return (
    <>
      {type !== 'clear' && (
        <StyledDiv>
          <span style={{ fontSize: '16px', fontWeight: 400 }}>{label}</span>
          <ClearIcon onClick={onClick} style={{ width: '20px', marginLeft: '5px', marginBottom: '2px' }} />
        </StyledDiv>
      )}
      {type === 'clear' && (
        <StyledDiv onClick={onClick} style={{ backgroundColor: 'transparent', color: 'black', display: 'flex', alignItems: 'flex-end', paddingBottom: '2px' }}>
          <span style={{ fontSize: '16px', fontWeight: 400 }}>Clear All</span>
          <Clear onClick={onClick} />
        </StyledDiv>
      )}
    </>
  )
}

const StyledDiv = styled.div`
  background-color: black;
  color: white;
  width: fit-content;
  border-radius: 20px;
  height: 32px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
`;

const Clear = styled(ClearIcon)`
  width: 20px;
  margin-bottom: 3px;
  margin-left: 5px;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;
export default FilterChip;
