import React from 'react';
import { useAppSelector } from 'store/hooks';
import * as S from './styles';
export interface IProps {
  handleFilter: (name: string, data: string) => void;
  activeFilterStatus: string;
}

const MenuFilter = ({ handleFilter, activeFilterStatus }: IProps) => {
  const skuTotal = useAppSelector((state) => state.sku.skus.total) as number;
  return (
    <S.ButtonFilters>
      <S.Li>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <S.Button
            onClick={() => handleFilter('status', '')}
            style={{
              color: `${activeFilterStatus === '' ? 'black' : '#9e9e9e'}`,
            }}
          >
            All{' '}
            {activeFilterStatus === '' && (
              <S.TotalFilter>&nbsp; ({skuTotal})</S.TotalFilter>
            )}
          </S.Button>
          {/* <small style={{ paddingLeft: '10px', color: '#9e9e9e' }}>
            (12, 244)
          </small> */}
        </div>
      </S.Li>
      <S.Li>
        <S.Button
          onClick={() => handleFilter('status', 'onSale')}
          style={{
            color: `${activeFilterStatus === 'onSale' ? 'black' : '#9e9e9e'}`,
          }}
        >
          On Sale{' '}
          {activeFilterStatus === 'onSale' && (
            <S.TotalFilter>&nbsp; ({skuTotal})</S.TotalFilter>
          )}
        </S.Button>
      </S.Li>
      <S.Li>
        <S.Button
          onClick={() => handleFilter('status', 'upcoming')}
          style={{
            color: `${activeFilterStatus === 'upcoming' ? 'black' : '#9e9e9e'}`,
          }}
        >
          Upcoming{' '}
          {activeFilterStatus === 'upcoming' && (
            <S.TotalFilter>&nbsp; ({skuTotal})</S.TotalFilter>
          )}
        </S.Button>
      </S.Li>
    </S.ButtonFilters>
  );
};

export default MenuFilter;
