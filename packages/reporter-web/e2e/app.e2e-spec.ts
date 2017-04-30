import { ReporterWebPage } from './app.po';

describe('reporter-web App', () => {
  let page: ReporterWebPage;

  beforeEach(() => {
    page = new ReporterWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('perfy works!');
  });
});
