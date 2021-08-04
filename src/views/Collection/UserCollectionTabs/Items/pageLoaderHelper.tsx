import PageLoader from 'components/PageLoader';
import { ProductWithFunctions } from 'entities/product';

interface IProps {
  userItems: ProductWithFunctions[] | undefined;
}

export const PageLoaderHelper = ({ userItems }: IProps) => {
  const screenWidth = window.innerWidth;
  const calculateHeight = (): string => {
    let itemCount = 0;
    if (userItems) itemCount = userItems.length;
    const cardHeight = 507;
    if (screenWidth > 1401) {
      const height =
        cardHeight * (Math.floor(itemCount / 4) + (itemCount % 4 == 0 ? 0 : 1));
      return height + 'px';
    }
    if (screenWidth > 1076) {
      const height =
        cardHeight * (Math.floor(itemCount / 3) + (itemCount % 3 == 0 ? 0 : 1));
      return height + 'px';
    }
    if (screenWidth > 748) {
      const height =
        cardHeight * (Math.floor(itemCount / 2) + (itemCount % 2 == 0 ? 0 : 1));
      return height + 'px';
    }
    return cardHeight * itemCount + 'px';
  };
  return (
    <PageLoader
      height={calculateHeight()}
      color={'black'}
      backGroundColor={'white'}
    />
  );
};
