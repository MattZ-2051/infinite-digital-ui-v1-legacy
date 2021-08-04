import { IFilterArrow } from './IFilterArrow';
import * as S from './styles';

const FilterArrow = ({ isHidden, setIsHidden, theme }: IFilterArrow) => {
  const handleChange = () => {
    setIsHidden(!isHidden);
  };
  return (
    <>
      {isHidden ? (
        <S.DownArrow themeStyle={theme} onClick={handleChange} />
      ) : (
        <S.UpArrow themeStyle={theme} onClick={handleChange} />
      )}
    </>
  );
};

export default FilterArrow;
