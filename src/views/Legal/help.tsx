import React, { useEffect } from 'react';
import useScript from 'hooks/useScript';
import * as S from './styles';

interface WindowWithHubspotForm extends Window {
  readonly hbspt?: any;
}

const Help = () => {
  const [loaded, error] = useScript('//js.hsforms.net/forms/v2.js');

  useEffect(() => {
    if (typeof window !== 'undefined' && window) {
      const windowWithHubspotForm: WindowWithHubspotForm = window;
      if (loaded && !error && windowWithHubspotForm.hbspt) {
        windowWithHubspotForm.hbspt.forms.create({
          region: 'na1',
          portalId: '8953348',
          formId: 'a25ae540-4e5a-4858-90fb-20edc5ca1252',
          target: '#embed-hubspot',
        });
      }
    }
  }, [loaded, error]);
  return (
    <S.HelpContainer>
      <S.HelpColumn>
        <S.Header>How can we help you?</S.Header>
        <S.SubTitle>
          Before submitting this support form, please search the{' '}
          <a
            target="_blank"
            href="https://support.suku.world/"
            rel="noreferrer"
          >
            SUKU Knowledge Base
          </a>
          for information on common support questions.
        </S.SubTitle>
        <S.SubTitle>
          Want to learn more, make suggestions, or just need help? Leave us a
          message and we&apos;ll get back to you!
        </S.SubTitle>
      </S.HelpColumn>
      <S.HelpColumn>
        <S.Container id="embed-hubspot"></S.Container>
      </S.HelpColumn>
    </S.HelpContainer>
  );
};

export default Help;
