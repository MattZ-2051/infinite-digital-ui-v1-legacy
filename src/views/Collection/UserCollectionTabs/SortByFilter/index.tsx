<<<<<<< HEAD
import { useState } from "react";
import styled from "styled-components/macro";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { useRef } from "react";
=======
import { useState } from 'react';
import styled from 'styled-components/macro';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useRef } from 'react';
>>>>>>> development

interface IProps {
  options: string[];
  width?: string;
  handleFilter: (name: string, data: any) => void;
  activeFilterSort: string;
}

const SortByFilter = ({
  width,
  options,
  handleFilter,
  activeFilterSort,
}: IProps) => {
  const getCurrentFilterOption = (el) => {
    if (el === activeFilterSort) {
      return el;
    } else {
<<<<<<< HEAD
      return "Release Date";
=======
      return 'Release Date';
>>>>>>> development
    }
  };

  let currentLabel = options.filter(getCurrentFilterOption);

  const [isHidden, setIsHidden] = useState<boolean | undefined>(true);
  const [newLabel, setNewLabel] = useState<string | undefined>(currentLabel[0]);
  const selectedItems = useRef<any>([]);

  const handleCheck = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const name = target.children[0].innerHTML;

    if (name) {
      selectedItems.current.push(name);
    } else {
      selectedItems.current = selectedItems.current.filter(
        (item: string) => item !== name
      );
    }
<<<<<<< HEAD
    handleFilter("sort", name);
=======
    handleFilter('sort', name);
>>>>>>> development
    setNewLabel(name);
    setIsHidden(true);
  };

  const handleChange = () => {
    setIsHidden(!isHidden);
  };

  const getNewOptions = (el) => {
    return el !== newLabel;
  };

  options = options.filter(getNewOptions);

  return (
<<<<<<< HEAD
    <div style={{ position: "relative", paddingBottom: "10px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span
          style={{
            color: "#9e9e9e",
            fontWeight: 500,
            fontSize: "18px",
            lineHeight: "22.7px",
            paddingRight: "8px",
          }}
        >
          Sort by:
        </span>
        <span
          style={{ fontWeight: 500, fontSize: "18px", lineHeight: "22.7px" }}
=======
    <div style={{ position: 'relative', paddingBottom: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <SortByText>Sort by:</SortByText>
        <span
          style={{ fontWeight: 500, fontSize: '18px', lineHeight: '22.7px' }}
>>>>>>> development
        >
          {newLabel}
        </span>
        {isHidden ? (
<<<<<<< HEAD
          <DownArrow
            style={{ color: "black", fontSize: "35px", marginBottom: "5px" }}
            onClick={handleChange}
          />
        ) : (
          <UpArrow
            style={{ color: "black", fontSize: "35px", marginBottom: "5px" }}
            onClick={handleChange}
          />
=======
          <DownArrow onClick={handleChange} />
        ) : (
          <UpArrow onClick={handleChange} />
>>>>>>> development
        )}
      </div>
      <>
        {isHidden ? null : (
          <HiddenDiv>
            {options instanceof Array &&
              options.map((option, index) => {
                return (
<<<<<<< HEAD
                  <DropDownDiv
                    onClick={handleCheck}
                    style={{ height: "38px" }}
                    key={index}
                  >
                    <p style={{ fontWeight: 400, fontSize: "16px" }}>
                      {option}
                    </p>
                  </DropDownDiv>
=======
                  <DropDown
                    onClick={handleCheck}
                    style={{ height: '38px' }}
                    key={index}
                  >
                    <p style={{ fontWeight: 400, fontSize: '16px' }}>
                      {option}
                    </p>
                  </DropDown>
>>>>>>> development
                );
              })}
          </HiddenDiv>
        )}
      </>
    </div>
  );
};

const DownArrow = styled(KeyboardArrowDownIcon)`
<<<<<<< HEAD
=======
  color: black;
  margin-bottom: 5px;
  font-size: 35px;
>>>>>>> development
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

<<<<<<< HEAD
const UpArrow = styled(KeyboardArrowUpIcon)`
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export const FilterContainer = styled.div`
  height: 40px;
  background-color: #fafafa;
  border-radius: 20px;
`;

export const FilterDiv = styled.div`
  display: flex;
  padding: 9px 16px;
  width 140px;
  align-items: center;
  justify-content: space-between;
  color: #888888;
  background-color: #fafafa;
  border: none;
  border-radius: 20px;
  :hover {
    cursor: pointer;
    background-color: #D6D6D6;
    border-radius: 20px;
    color: black;
    box-shadow: 2px 2px 3px 1px #ccc;
  }
`;

export const HiddenDiv = styled.div`
=======
const SortByText = styled.span`
  color: #9e9e9e;
  font-weight: 500;
  font-size: 18px;
  padding-right: 8px;
`;

const UpArrow = styled(KeyboardArrowUpIcon)`
  color: black;
  margin-bottom: 5px;
  font-size: 35px;
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

const HiddenDiv = styled.div`
>>>>>>> development
  color: black;
  overflow-y: auto;
  max-height: 140px;
  position: absolute;
  width: 180px;
  background-color: white;
  right: 5%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  box-shadow: 2px 2px 8px 2px #ccc;
<<<<<<< HEAD
`;

export const DropDownSpan = styled.span``;

export const DropDownDiv = styled.div`
=======
  z-index: 1;
`;

const DropDown = styled.div`
>>>>>>> development
  padding: 9px 16px;
  border-radius: 20px;
  width 160px;
  color: #9e9e9e;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  :hover {
    background-color: #D6D6D6;
    color: white;
    cursor: pointer;
    color: black;
  }
`;

export default SortByFilter;
