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
