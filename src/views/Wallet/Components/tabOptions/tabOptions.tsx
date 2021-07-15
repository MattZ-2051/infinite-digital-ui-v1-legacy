import useMediaQuery from '@material-ui/core/useMediaQuery';
import MobileTab from '../MobileTab/mobileTab';
import { ITabOptions } from './ITabOptions';
import * as S from './styles';

const TabOptions = ({ options, setSelectedTab, selectedTab }: ITabOptions) => {
  const matchesMobile = useMediaQuery('(max-width:962px)', { noSsr: true });
  return (
    <>
      {!matchesMobile && (
        <S.TabOptions>
          {options.map((el, i) => (
            <S.TabButton highlightOption={i} selectedTab={selectedTab} key={i}>
              <S.Tab onClick={() => setSelectedTab(i)}>{el}</S.Tab>
            </S.TabButton>
          ))}
        </S.TabOptions>
      )}

      {matchesMobile && (
        <MobileTab
          options={options}
          setSelectedTab={setSelectedTab}
          selectedTab={selectedTab}
        />
      )}
    </>
  );
};

export default TabOptions;
