// Pure functions
export function capitalize(string) {
  if (typeof string !== 'string') {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end];
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index);
}

export function storage(key, data=null) {
  if (!data) {
    if (key in localStorage) {
      return JSON.parse(localStorage.getItem(key));
    }
  } else {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

export function getCursorXY(objEvent) {
  let x = null;
  let y = null;
  if (objEvent) {
    x = objEvent.pageX;
    y = objEvent.pageY;
  } else {
    x = window.event.clientX;
    y = window.event.clientY;
  }
  return {x: x, y: y};
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
}

export function camelToDashCase(str) {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function debounce(fn, wait) {
  let timeout;
  return function(...args) {
    const later = () => {
      clearTimeout(timeout);
      // eslint-disable-next-line no-invalid-this
      fn.apply(this, args);
    }
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
}
