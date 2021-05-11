import React, { useEffect } from 'react';
import useScript from 'hooks/useScript';
import * as S from './styles';

interface WindowWithHubspotForm extends Window {
  readonly hbspt?: any;
}

const Help: React.FC<unknown> = () => {
  const [loaded, error] = useScript('//js.hsforms.net/forms/v2.js');

  useEffect(() => {
    if (typeof window !== 'undefined' && window) {
      const windowWithHubspotForm: WindowWithHubspotForm = window;
      if (loaded && !error && windowWithHubspotForm.hbspt) {
        windowWithHubspotForm.hbspt.forms.create({
          region: 'na1',
          portalId: '8953348',
          formId: '22f866de-9203-45d5-83c6-75a4a1f53ae6',
          target: '#embed-hubspot',
        });
      }
    }
  }, [loaded, error]);
  return <S.Container id="embed-hubspot"></S.Container>;
};

export default Help;
