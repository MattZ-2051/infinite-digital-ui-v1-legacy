import styled from 'styled-components/macro';
import Chip from './Chip';

export interface IProps {
  activeFilters: any;
  handleFilter: (name: string, data: any) => void;
}

const SelectedFilters: React.FC<IProps> = ({ handleFilter, activeFilters }) => {
  const handleDelete = (filterCategory: string, value: any) => {
    let filterValues = [];

    switch (filterCategory) {
      case 'category':
      case 'brand':
      case 'series':
      case 'rarity':
        filterValues = activeFilters[filterCategory].filter(
          (el: string) => el !== value
        );
        break;
    }

    handleFilter(filterCategory, filterValues);
  };

  const createFilterCategoryChips = (
    categoryName,
    categoryItems,
    chipArray
  ) => {
    return categoryItems.map((value) => {
      chipArray.push(
        <Chip
          label={value}
          filterCategory={categoryName}
          handleDelete={handleDelete}
        />
      );
    });
  };

  const formatChipDateValue = (value) => {
    const result = `${value[0].slice(5)} to ${value[1].slice(5)}`;
    return result;
  };

  const formatRangeChipValue = (value) => {
    const result = `$${value[0]} to $${value[1]}`;
    return result;
  };

  const ChipItems = () => {
    const chipElements: any = [];
    Object.keys(activeFilters).map((category) => {
      if (activeFilters[category].length) {
        switch (category) {
          case 'category':
          case 'brand':
          case 'series':
          case 'rarity':
            createFilterCategoryChips(
              category,
              activeFilters[category],
              chipElements
            );
            break;
          case 'date':
            chipElements.push(
              <Chip
                label={formatChipDateValue(activeFilters[category])}
                filterCategory={category}
                handleDelete={handleDelete}
              />
            );
            break;
          case 'price':
            chipElements.push(
              <Chip
                label={formatRangeChipValue(activeFilters[category])}
                filterCategory={category}
                handleDelete={handleDelete}
              />
            );
            break;
          case 'sort':
            break;
          default:
            chipElements.push(
              <Chip
                label={activeFilters[category]}
                filterCategory={category}
                handleDelete={handleDelete}
              />
            );
            break;
        }
      }
    });

    return <>{chipElements}</>;
  };

  return (
    <Container>
      <ChipItems />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default SelectedFilters;
