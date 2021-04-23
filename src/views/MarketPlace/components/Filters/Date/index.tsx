import 'date-fns';
import { format } from 'date-fns';
import { useState } from 'react';
import styled from 'styled-components/macro';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export interface IProps {
  handleFilter: (name: string, data: any) => void;
}

const DateFilter: React.FC<IProps> = ({ handleFilter }) => {
  const [selectedStartDate, setStartDate] = useState<Date | null>(new Date());
  const [selectedEndDate, setEndDate] = useState<Date | null>(null);

  const handleDate = (date: Date | null) => {
    setEndDate(date);
    const startDate = format(selectedStartDate || new Date(), 'yyyy-MM-dd');
    const endDate = format(date || new Date(), 'yyyy-MM-dd');
    handleFilter('date', [startDate, endDate]);
  };

  return (
    <Container>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div style={{ paddingRight: '10px' }}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yy"
            margin="normal"
            id="date-picker-inline"
            label="Start Date"
            value={selectedStartDate}
            onChange={setStartDate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </div>
        <div>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yy"
            margin="normal"
            id="date-picker-inline"
            label="End Date"
            value={selectedEndDate}
            onChange={handleDate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </div>
      </MuiPickersUtilsProvider>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
`;

export default DateFilter;
