import styled from 'styled-components/macro';

export const Container = styled.div<{ height?: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fffff;
  height: ${(props) => (props.height ? `${props.height};` : `100%`)};
  width: 100%;
  max-width: 700px;
  max-height: 700px;
  overflow: hidden;

  img {
    width: 100%;
    user-select: none;
  }

  @media screen and (max-width: 1160px) {
    max-width: 100%;
  }

  @media screen and (max-width: 640px) {
    overflow: auto;
    height: auto !important;
  }
`;

export const ImageContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const ThumbnailMenu = styled.div`
  position: absolute;
  display: inline-grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  grid-gap: 8px;
  left: 30px;
  bottom: 30px;
`;

interface ThumbnailItemProps {
  active?: boolean;
}

export const Thumbnail = styled.div<ThumbnailItemProps>`
  transition: 0.4s;
  opacity: 0.6;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85px;
  height: 85px;
  border: 1px solid;
  border-color: ${(props) => (props.active ? 'black' : '#d2d2d2')};
  cursor: pointer;
  overflow: hidden;

  &:hover {
    border-color: black;
  }
`;