export const removeHTML = (str) => {
  if (!str) return str;
  return str.replace(/(<([^>]+)>)/gi, '');
};
