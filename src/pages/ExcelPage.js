import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Table} from '@/components/table/Table';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {rootReducer} from '../redux/rootReducer';
import {createStore} from '@core/store/createStore';
import {noarmalizeInitialState} from '../redux/initialState';

import {Page} from '../core/page/Page';
import {StateProcessor} from '../core/page/StateProcessor';
import {LocalStorageClient} from '../shared/LocalStorageClient';

export class ExcelPage extends Page {
  constructor(param) {
    super(param);
    this.storeSub = null;
    this.processor = new StateProcessor(
        new LocalStorageClient(this.params),
        400,
    );
  }
  async getRoot() {
    // const params = this.params ? this.params: Date.now().toString();

    // const state = storage(storageName(params));
    const state = await this.processor.get();
    const initialState = noarmalizeInitialState(state);
    const store = createStore(rootReducer, initialState);

    this.storeSub = store.subscribe(this.processor.listen);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }
  destroy() {
    this.excel.destroy();
    this.storeSub.unsubscribe();
  }
}
