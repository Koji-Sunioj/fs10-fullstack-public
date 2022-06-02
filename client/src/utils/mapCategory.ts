function mapCategory(category: string) {
  const optValue = category
    .split(" ")
    .map((op: string, index: number) => {
      if (index !== 0) {
        return op.charAt(0).toUpperCase() + op.substr(1).toLowerCase();
      } else {
        return op;
      }
    })
    .join("");
  return optValue;
}

export default mapCategory;
