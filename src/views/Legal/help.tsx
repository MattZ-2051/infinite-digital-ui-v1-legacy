import React, { useEffect } from 'react';
import useScript from 'hooks/useScript';
import * as S from './styles';
import { config } from 'config';
import { useMediaQuery } from '@material-ui/core';

interface WindowWithHubspotForm extends Window {
  readonly hbspt?: any;
}

const Help = () => {
  const [loaded, error] = useScript('//js.hsforms.net/forms/v2.js');
  const matchesMobile = useMediaQuery('(max-width:1100px)', { noSsr: true });

  useEffect(() => {
    if (typeof window !== 'undefined' && window) {
      const windowWithHubspotForm: WindowWithHubspotForm = window;
      if (loaded && !error && windowWithHubspotForm.hbspt) {
        windowWithHubspotForm.hbspt.forms.create({
          region: config.hubspot.region,
          portalId: config.hubspot.helpSection.portalId,
          formId: config.hubspot.helpSection.formId,
          target: '#embed-hubspot',
        });
      }
    }
  }, [loaded, error]);
  return (
    <S.HelpContainer>
      <S.HelpColumn>
        <S.Header style={matchesMobile ? { textAlign: 'center' } : {}}>
          How can we help you?
        </S.Header>
        <S.SubTitle>
          Before submitting the contact/support form, please search the{' '}
          <a
            target="_blank"
            href="https://support.suku.world/infinite-powered-by-suku"
            rel="noreferrer"
          >
            FAQ/Knowledge Base
          </a>
          for information on common questions.
        </S.SubTitle>
        <S.SubTitle>
          If you still have a question or suggestion, please submit the
          contact/support form or email us at{' '}
          <a href="mailto:support@goinfinite.com">support@goinfinite.io</a>
        </S.SubTitle>
      </S.HelpColumn>
      <S.HelpColumn>
        <S.Header
          style={
            matchesMobile ? { textAlign: 'center', marginBottom: '20px' } : {}
          }
        >
          Contact/Support Form
        </S.Header>
        <S.Container id="embed-hubspot" />
      </S.HelpColumn>
    </S.HelpContainer>
  );
};

export default Help;
