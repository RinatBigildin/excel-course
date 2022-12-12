export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // dispatch, fire, trigger
  // Уведомляет слушателей, если они есть
  // formul.emit('tabel:select', {a: 1)
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
    return true;
  }

  // on, listen
  // Подписываемся на уведомления
  // Добавляем слушателей
  // formula.subscribe('table:select', () => {})
  subscribe(event, fn) {
    this.listeners[event]= this.listeners[event] || [];
    this.listeners[event].push(fn);
    return () => {
      this.listeners[event] =
        this.listeners[event].filter((listener)=> listener !== fn);
    }
  }
}

// const emitter = new Emitter();
// const usub = emitter.subscribe('vladilen', (data)=> {
//   console.log(data);
// });

// emitter.emit('vladilen', '01.02.2022');

// setTimeout(() => {
//   emitter.emit('vladilen', 'After 2 seconds')
// }, 2000);

// setTimeout(() => {
//   usub();
// }, 3000);

// setTimeout(() => {
//   emitter.emit('vladilen', 'After 4 seconds')
// }, 4000);
