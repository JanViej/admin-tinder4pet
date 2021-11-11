import React from 'react';
import { BILLING_STATUS } from 'configs/localData';
import TagCustom from 'components/common/TagCustom';
import i18next from 'i18next';

export const formatBillingStatus = (data) => {
  return (
    <TagCustom
      color={BILLING_STATUS.find((status) => status.value === data)?.textColor}
      backgroundColor={
        BILLING_STATUS.find((status) => status.value === data)?.color
      }
      name={i18next.t(
        BILLING_STATUS.find((status) => status.value === data)?.text,
      )}
    />
  );
};
