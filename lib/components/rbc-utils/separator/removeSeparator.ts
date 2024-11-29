const removeSeparator = (number: any) => {
  if (number) {
    return number.toString().split(",").join("").trim();
  }
  return number;
};

export default removeSeparator