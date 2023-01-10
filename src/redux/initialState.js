import {defaultStyles, defaultTitle} from '../constants';
import {clone} from '../core/utils';

export const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {}, // {'0:1': 'fdfs'}
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  openedDate: new Date().toJSON(),
}

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
});

export function noarmalizeInitialState(state) {
  return state? normalize(state): clone(defaultState);
}
