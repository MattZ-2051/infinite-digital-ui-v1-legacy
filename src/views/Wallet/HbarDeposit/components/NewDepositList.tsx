import * as S from '../../styles';
import {
  LatestTransactionsContainer,
  NewDepositsSubheader,
  ProductsGrid,
} from '../styles';
import { INewHbarDeposit } from '../index';
import HbarTransaction from './HbarTransaction';

const NewDepositList = ({
  depSummary,
}: {
  depSummary: INewHbarDeposit[];
}): JSX.Element => (
  <>
    <LatestTransactionsContainer>
      <S.Content>
        <NewDepositsSubheader>
          <span style={{ color: '#7d7d7d' }}>New Deposits</span>
          {depSummary?.length === 0 ? (
            <span className="tx__number" style={{ color: '#9e9e9e' }}>
              No transactions found
            </span>
          ) : (
            <span className="tx__number" style={{ fontWeight: 700 }}>
              {depSummary.length}
            </span>
          )}
        </NewDepositsSubheader>
        <ProductsGrid>
          {depSummary?.length > 0 &&
            depSummary.map((dep) => <HbarTransaction dep={dep} key={dep.id} />)}
        </ProductsGrid>
      </S.Content>
    </LatestTransactionsContainer>
  </>
);

export default NewDepositList;
