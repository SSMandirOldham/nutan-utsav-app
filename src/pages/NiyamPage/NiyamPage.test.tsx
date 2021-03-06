import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../../test/testUtils';
import NiyamPage from './NiyamPage';
import { resources } from '../../config/i18n';
import { useTranslation } from 'react-i18next';
import { RecoilRoot } from 'recoil';

function getTranslations(niyamId: string, property: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return resources.en[niyamId]?.[property];
}

jest.mock('react-i18next');

describe('NiyamPage', () => {
  function renderPage(niyamId: string) {
    return renderWithRouter(
      <RecoilRoot>
        <NiyamPage />
      </RecoilRoot>,
      '/niyam/:niyamId',
      { route: `/niyam/${niyamId}` },
    );
  }

  beforeEach(() => {
    (useTranslation as jest.Mock).mockImplementation((niyamId) => {
      let language: string | undefined = 'en';
      return {
        t: (key: string) => getTranslations(niyamId, key),
        i18n: {
          changeLanguage(lng?: string) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            language = lng;
          },
        },
      };
    });
  });

  test.each([
    { niyamId: 'orada-na-pads', title: 'Orada na Pads' },
    {
      niyamId: 'janmangal-namavali-stotram',
      title: 'Janmangal Namavali/Stotram',
    },
  ])('should be able to read niyams', ({ niyamId, title }) => {
    renderPage(niyamId);

    screen.getByTestId(niyamId);
    screen.getByText(title);
    screen.getByTestId('tabs-container');
  });

  test('should render 404 if niyam is not valid', () => {
    renderPage('not-a-valid-niyam');

    screen.getByTestId('404-page');
  });
});
