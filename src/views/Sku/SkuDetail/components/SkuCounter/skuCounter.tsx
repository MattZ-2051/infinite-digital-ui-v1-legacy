import { Sku } from 'entities/sku';
import * as S from './styles';
import { createMessage } from './SkuTextCalculator';

type SkuCounterProps = {
  sku: Sku;
};

export const SkuCounter = ({ sku }: SkuCounterProps): JSX.Element => {
  return <S.Info>{createMessage(sku)}</S.Info>;
};
