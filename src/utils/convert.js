export const toOptions = (obj) => {
  return Object.entries(obj).map(([value, label]) => ({
    value,
    label,
  }));
};