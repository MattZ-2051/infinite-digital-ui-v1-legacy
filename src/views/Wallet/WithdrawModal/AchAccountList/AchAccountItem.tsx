import React from 'react';
import { CircleAchStatusEnum, IPlaidAccount } from 'entities/plaidAccount';
import * as S from '../../DepositModal/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import DustbinIcon from 'assets/svg/icons/dustbin.svg';

interface IAchAccountItemProps {
  onWithdraw?: (a: IPlaidAccount) => any;
  onRemove?: (a: IPlaidAccount) => any;
  item: IPlaidAccount;
}

const AchAccountItem = ({
  item,
  onWithdraw,
  onRemove,
}: IAchAccountItemProps) => {
  const isApprovalGood =
    item.circleInfo.status === CircleAchStatusEnum.complete;
  return (
    <S.Row
      onClick={
        onWithdraw && isApprovalGood
          ? () => {
              onWithdraw(item);
            }
          : undefined
      }
      style={{
        gridTemplateColumns: '18% 42% 40%',
        cursor: onRemove || !isApprovalGood ? 'initial' : undefined,
      }}
      disabled={false}
    >
      <S.FlexAlignCenter>
        <img
          alt="logo"
          src={item.plaidInfo.institution_logo}
          style={{
            backgroundColor: item.plaidInfo.institution_primary_color
              ? `#${item.plaidInfo.institution_primary_color}`
              : 'white',
            borderRadius: '100%',
            height: 48,
          }}
        />
      </S.FlexAlignCenter>
      <S.FlexColumn>
        <S.RowText style={{ color: '#000000', fontWeight: 500 }}>
          {item.plaidInfo.metadata.institution.name}
        </S.RowText>
        <S.RowSubText>xxxx{item.plaidInfo.metadata.account.mask}</S.RowSubText>
      </S.FlexColumn>
      {onWithdraw && (
        <S.FlexEnd>
          {item.circleInfo.status === CircleAchStatusEnum.pending ? (
            <span style={{ color: '#9E9E9E' }}>Pending Approval</span>
          ) : item.circleInfo.status === CircleAchStatusEnum.failed ? (
            <span style={{ color: 'red' }}>Approval Failed</span>
          ) : (
            <ArrowForwardIosIcon
              style={{ color: '#000000' }}
              className="icon__arrow"
            />
          )}
        </S.FlexEnd>
      )}
      {onRemove && (
        <S.FlexEnd>
          <button
            type="button"
            onClick={() => onRemove(item)}
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
            }}
          >
            <img src={DustbinIcon} alt="dustbin" style={{ marginRight: 5 }} />
          </button>
        </S.FlexEnd>
      )}
    </S.Row>
  );
};

AchAccountItem.displayName = 'AchAccountItem';

export default AchAccountItem;
