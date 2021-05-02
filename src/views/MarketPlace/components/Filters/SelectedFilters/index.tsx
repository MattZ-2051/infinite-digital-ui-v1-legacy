import styled from 'styled-components/macro';
import Chip from './Chip';

export interface IProps {
  activeFilters: any; // TODO: change type
  handleFilter: (name: string, data: any) => void;
  options: any; // TODO: change type
}

const SelectedFilters = ({ handleFilter, activeFilters, options }: IProps) => {
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

  // Find the name/label of the filter by id
  const findFilterLabel = (
    options: any, // TODO: change type
    filterId: string,
    categoryName: string
  ) => {
    let label = '';

    options[categoryName].forEach((el: { name: string; id: string }) => {
      if (el.id === filterId) {
        label = el.name;
      }
    });

    return label;
  };

  // Create chips for the dropdown-checkbox filters
  const createFilterCategoryChips = (
    categoryName: string,
    categoryItems: string[],
    chipElements: JSX.Element[]
  ) => {
    return categoryItems.map((value) => {
      chipElements.push(
        <Chip
          label={findFilterLabel(options, value, categoryName)}
          filterCategory={categoryName}
          handleDelete={handleDelete}
          id={value}
        />
      );
    });
  };

  const formatChipDateValue = (value: string[]) => {
    const result = `${value[0].slice(5)} to ${value[1].slice(5)}`;
    return result;
  };

  const formatRangeChipValue = (value: number[]) => {
    const result = `$${value[0]} to $${value[1]}`;
    return result;
  };

  const ChipItems = () => {
    const chipElements: JSX.Element[] = [];
    Object.keys(activeFilters).map((categoryName) => {
      if (activeFilters[categoryName]?.length) {
        switch (categoryName) {
          case 'category':
          case 'brand':
          case 'series':
          case 'rarity':
            createFilterCategoryChips(
              categoryName,
              activeFilters[categoryName],
              chipElements
            );
            break;
          case 'date':
            chipElements.push(
              <Chip
                label={formatChipDateValue(activeFilters[categoryName])}
                filterCategory={categoryName}
                handleDelete={handleDelete}
              />
            );
            break;
          case 'price':
            chipElements.push(
              <Chip
                label={formatRangeChipValue(activeFilters[categoryName])}
                filterCategory={categoryName}
                handleDelete={handleDelete}
              />
            );
            break;
          case 'sort':
            break;
          default:
            chipElements.push(
              <Chip
                label={activeFilters[categoryName]}
                filterCategory={categoryName}
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
