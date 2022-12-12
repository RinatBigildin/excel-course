// Pure functions
export function capitalize(string) {
  if (typeof string !== 'string') {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
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
