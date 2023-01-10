import {$} from '@core/dom';
import {ActiveRoute} from './ActiveRoute';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is bot provided in Router');
    }

    this.$placeholder = $(selector);
    this.routes = routes;
    this.page = null;

    this.changePageHandler = this.changePageHandler.bind(this);

    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
  }

  changePageHandler(event) {
    this.$placeholder.clear();

    const Page = ActiveRoute.path.includes('excel')
    ? this.routes.excel
    : this.routes.dashboard;

    // if (this.page) {
    //   this.page.destroy();
    // }
    this.page = new Page(ActiveRoute.param);
    this.$placeholder.append(this.page.getRoot());
    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
