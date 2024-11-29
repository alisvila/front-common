const withSeparator = (number: any) => {
  if (number) {
    return number
      .toString()
      .split(",")
      .join("")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return number;
};

export default withSeparator