import {camelToDashCase} from '../core/utils';
import {CHANGE_TEXT,
  CHANGE_STYLES,
  TABLE_RESIZE,
  APPLY_STYLE,
  CHANGE_TITLE} from './types';

// Pure Function
export function rootReducer(state, action) {
  let field = null;
  let val;
  switch (action.type) {
    case TABLE_RESIZE:
    {
      field = action.data.type === 'col' ? 'colState': 'rowState';
      return {...state, [field]: value(state, field, action)};
    }
    case CHANGE_TEXT: {
      field = 'dataState';
      return {...state,
        currentText: action.data.value,
        [field]: value(state, field, action)};
    }
    case CHANGE_STYLES:
    {
      return {...state, currentStyles: action.data};
    }
    case APPLY_STYLE: {
      field = 'stylesState';
      val = state[field] || {};
      action.data.ids.forEach((id) => {
        val[id] = {...val[id], ...action.data.value};
      });
      return {...state,
        [field]: val,
        currentStyles: {...state.currentStyles, ...action.data.value}};
    }
    case CHANGE_TITLE: {
      return {...state, title: action.data};
    }
    default: return state;
  }
}

function value(state, field, action) {
  const val = state[field] || {};
  val[action.data.id] = action.data.value;
  return val;
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
      .map((key) => `${camelToDashCase(key)}: ${styles[key]}`)
      .join(';');
}