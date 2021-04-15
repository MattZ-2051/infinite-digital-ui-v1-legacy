import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export interface IProps {}

const Series: React.FC<IProps> = () => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="category"
        id="category"
      >
        <h3>Series</h3>
      </AccordionSummary>
      <AccordionDetails>
        <ul>
          <li>Series1</li>
          <li>Series2</li>
          <li>Series3</li>
        </ul>
      </AccordionDetails>
    </Accordion>
  );
};

export default Series;
