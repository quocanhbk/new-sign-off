export const removeUndefinedProps = (obj) => {
  const newObj = {...obj};
  Object.keys(newObj).forEach(key => {
    obj[key] === undefined && delete obj[key];
  });
  return newObj;
}