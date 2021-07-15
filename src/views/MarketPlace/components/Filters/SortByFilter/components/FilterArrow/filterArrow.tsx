import { IFilterArrow } from './IFilterArrow';
import * as S from './styles';

const FilterArrow = ({ isHidden, setIsHidden }: IFilterArrow) => {
  const handleChange = () => {
    setIsHidden(!isHidden);
  };
  return (
    <>
      {isHidden ? (
        <S.DownArrow onClick={handleChange} />
      ) : (
        <S.UpArrow onClick={handleChange} />
      )}
    </>
  );
};

export default FilterArrow;
