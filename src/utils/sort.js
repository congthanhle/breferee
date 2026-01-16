export const sortByKey = (array, key, order = 'asc') => {
  if (!Array.isArray(array) || !key) {
    throw new Error('Invalid input: array must be an array and key must be a string.');
  }

  return array.sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    if (valueA === undefined || valueB === undefined) {
      throw new Error(`Key "${key}" does not exist on some objects in the array.`);
    }

    if (order === 'asc') {
      return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
    } else if (order === 'desc') {
      return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
    } else {
      throw new Error('Invalid order: must be "asc" or "desc".');
    }
  });
};