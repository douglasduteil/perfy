import { browser, by, element } from 'protractor';

export class ReporterWebPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('perfy-root h1')).getText();
  }
}
