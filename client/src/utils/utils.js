import { useLocation } from '@reach/router';

export const removeUndefinedProps = (obj) => {
  const newObj = {...obj};
  Object.keys(newObj).forEach(key => {
    obj[key] === undefined && delete obj[key];
  });
  return newObj;
};

export const useQuery = () => {
  const queries = new URLSearchParams(useLocation().search);
  let result = {};
  for (const [key, value] of queries.entries()) {
    result[key] = value;
  }
  return result;
};