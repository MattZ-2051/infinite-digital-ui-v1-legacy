import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export interface IProps {}

const Brand: React.FC<IProps> = () => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="category"
        id="category"
      >
        <h3>Brand</h3>
      </AccordionSummary>
      <AccordionDetails>
        <ul>
          <li>Brand1</li>
          <li>Brand2</li>
          <li>Brand3</li>
        </ul>
      </AccordionDetails>
    </Accordion>
  );
};

export default Brand;
