//Helper function for parsing firebase timestap
export const convertTimestamp = (timestamp) => {
  if (!timestamp) return;

  let date = timestamp.toDate();
  let mm = date.getMonth();
  let dd = date.getDate();
  let yyyy = date.getFullYear();
  date = mm + '/' + dd + '/' + yyyy;
  return date;
};
