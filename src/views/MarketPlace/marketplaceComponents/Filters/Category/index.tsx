import { useRef } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export interface IProps {
  handleFilter: (name: string, data: any) => void;
}

const CategoryFilter: React.FC<IProps> = ({ handleFilter }) => {
  const selectedItems = useRef<any>([]);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.checked;

    if (value) {
      selectedItems.current.push(name);
    } else {
      selectedItems.current = selectedItems.current.filter(
        (item: string) => item !== name
      );
    }
    handleFilter('category', [...selectedItems.current]);
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="category"
        id="category"
      >
        <h3>Category</h3>
      </AccordionSummary>
      <AccordionDetails>
        <ul>
          <li>
            <input
              type="checkbox"
              id="apparel"
              name="apparel"
              checked={selectedItems.current['apparel']}
              onChange={handleCheck}
            />
            <label htmlFor="apparel">Apparel</label>{' '}
          </li>

          <li>
            <input
              type="checkbox"
              id="sports"
              name="sports"
              checked={selectedItems.current['sports']}
              onChange={handleCheck}
            />
            <label htmlFor="sports">Sports</label>{' '}
          </li>
        </ul>
      </AccordionDetails>
    </Accordion>
  );
};

export default CategoryFilter;
