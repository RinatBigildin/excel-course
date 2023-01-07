import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.store = options.store;
    this.unsubscribers=[];
    this.prepare();
  }

  // Настараиваем наш компонент до init
  prepare() {}

  // Уведомляем слушателей по событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  // Подписываем слушателей
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  // Сюда приходя только измененяи по тем полям, на которые мы подписались
  storeChanged() {
  }

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  // Возвращает шаблон компонента
  toHTML() {
    return '';
  }

  // Иницилизируе компонент
  // Добавляем DOM слушателей
  init() {
    this.initDomListeners();
  }

  // Удалям компонент
  // Удаляем слушателей
  destroy() {
    this.removeDomListeners();
    this.unsubscribers.forEach((unsub)=> {
      unsub();
    });
  }
}
