import styled from 'styled-components/macro';

export const Container = styled.div`
  display: inline-block;
  cursor: pointer;
`;

export const Circle = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 17px;
  background-color: black;
`;
export const Bar1 = styled.div<{ change: boolean }>`
  width: 18px;
  height: 2px;
  background-color: white;
  margin: 4px 0;
  transition: 0.4s;
  ${({ change }) =>
    change &&
    `
 -webkit-transform: rotate(-45deg) translate(0px, 6px);
  transform: rotate(-45deg) translate(-4px, 4px);`}
`;
export const Bar2 = styled.div<{ change: boolean }>`
  width: 9px;
  height: 2px;
  background-color: white;
  margin: 0;
  transition: 0.4s;
  ${({ change }) =>
    change &&
    `
  opacity: 0;`}
`;
export const Bar3 = styled.div<{ change: boolean }>`
  width: 4px;
  height: 2px;
  background-color: white;
  margin: 4px 0;
  transition: 0.4s;
  ${({ change }) =>
    change &&
    `width:18px;
  -webkit-transform: rotate(45deg) translate(-8px, -8px) ;
  transform: rotate(45deg) translate(-4px, -4px)`}
`;
