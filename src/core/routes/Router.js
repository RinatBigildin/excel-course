import {Loader} from '../../components/Loader';
import {$} from '../dom';
import {ActiveRoute} from './ActiveRoute';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is bot provided in Router');
    }

    this.$placeholder = $(selector);
    this.routes = routes;
    this.loader = new Loader();
    this.page = null;

    this.changePageHandler = this.changePageHandler.bind(this);

    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
  }

  async changePageHandler(event) {
    this.$placeholder.clear().append(this.loader);

    const Page = ActiveRoute.path.includes('excel')
    ? this.routes.excel
    : this.routes.dashboard;

    // if (this.page) {
    //   this.page.destroy();
    // }
    this.page = new Page(ActiveRoute.param);
    const root = await this.page.getRoot();
    this.$placeholder.clear().append(root);
    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
