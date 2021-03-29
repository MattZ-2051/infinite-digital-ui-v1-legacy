import styled from 'styled-components/macro';
import ClearIcon from '@material-ui/icons/Clear';


export interface IProps {
  label: string;
  type?: 'clear' | 'chip'
}

const FilterChip = ({ label, type }: IProps) => {

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <>
      {type !== 'clear' && (

        <StyledDiv>
          <span style={{ fontSize: '16px', fontWeight: 400 }}>{label}</span>
          <ClearIcon onClick={handleDelete} style={{ width: '20px', marginLeft: '5px', marginBottom: '2px' }} />
        </StyledDiv>
      )}


      {type === 'clear' && (
        <StyledDiv style={{ backgroundColor: '#fafafa', color: 'black' }}>
          <span style={{ fontSize: '16px', fontWeight: 400 }}>Clear All</span>
          <ClearIcon onClick={handleDelete} style={{ width: '20px', marginBottom: '5px', marginLeft: '5px' }} />
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
export default FilterChip;
