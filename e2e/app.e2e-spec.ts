import { AppPage } from './app.po';

describe('angular2-keycloak-app App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display the home page heading', () => {
    page.navigateTo();
    expect(page.getHeadingText()).toEqual('Home');
  });
});
