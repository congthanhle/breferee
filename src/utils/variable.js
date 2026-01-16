import _ from 'lodash';

export const blank = value => {
  if (_.isNil(value)) {
    return true;
  }
  if (_.isFunction(value)) {
    return false;
  }
  if (_.isObject(value) || _.isString(value)) {
    return !_.size(value);
  }
  return false;
};

export const notBlank = value => !blank(value);

export const empty = value => {
  if (blank(value)) {
    return true;
  }
  if (_.isString(value) && value.match(/^0(\.0+)?$/)) {
    return true;
  }
  return !value;
};

export const notEmpty = value => !empty(value);

export const ifBlank = (value, elseValue) => (blank(value) ? elseValue : value);

export const ifEmpty = (value, elseValue) => (empty(value) ? elseValue : value);
