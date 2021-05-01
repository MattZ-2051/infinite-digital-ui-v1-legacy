import styled from 'styled-components/macro';
import ClearIcon from '@material-ui/icons/Clear';

export interface ChipProps {
  label: string;
  filterCategory: string;
  id?: string | null;
  handleDelete: (filterCategory: string, value: any) => void;
}

const ChipComponent = ({
  filterCategory,
  label,
  handleDelete,
  id = null,
}: ChipProps) => {
  return (
    <>
      <Chip>
        <span style={{ fontSize: '16px', fontWeight: 400 }}>{label}</span>
        <ClearIcon
          onClick={() => handleDelete(filterCategory, id || label)}
          style={{
            width: '20px',
            marginLeft: '5px',
            marginBottom: '2px',
            cursor: 'pointer',
          }}
        />
      </Chip>
      <Divider />
    </>
  );
};

const Chip = styled.span`
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

const Divider = styled.div`
  width: 7px;
  height: 42px;
`;

export default ChipComponent;
