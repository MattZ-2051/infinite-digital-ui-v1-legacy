import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const Sort = () => {

  const [open, setOpen] = useState<boolean | undefined>(true);

  const handleChange = () => {
    setOpen(!open);
  }

  return (
    <>
      <div style={{ display: 'flex', width: '225px', alignItems: 'center' }} onClick={handleChange}  >
        <span style={{ color: '#888888', fontWeight: 500, fontSize: '18px', lineHeight: '22.7px', paddingRight: '8px' }}>Sort by:</span>
        <span style={{ fontWeight: 500, fontSize: '18px', lineHeight: '22.7px' }}>Most Popular</span>
        {open
          ?
          <KeyboardArrowDownIcon style={{ color: 'black', fontSize: '35px', marginBottom: '5px' }} />
          :
          <KeyboardArrowUpIcon style={{ color: 'black', fontSize: '35px', marginBottom: '5px' }} />
        }
      </div>
      <>

        {/* <HiddenDiv hidden={open} style={{ width: width || '301px' }}>
            {options instanceof Array &&
              options.map((option, index) => {
                return (
                  <DropDownDiv style={{ height: '38px' }} key={index}>
                    <DropDownSpan>{option}</DropDownSpan>
                  </DropDownDiv>
                )
              })}
          </HiddenDiv> */}
      </>
    </>
  )
}

export default Sort;
