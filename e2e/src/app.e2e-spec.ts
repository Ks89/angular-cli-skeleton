import { AppPage } from './app.po';

describe('angular-cli-skeleton App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    // expect(page.getTitle()).toEqual('KS Welcome');
  });
});
