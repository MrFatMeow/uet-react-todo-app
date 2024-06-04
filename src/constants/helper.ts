export const isValidated = (rule: any, value: any) => {
  console.log("isvalidated", rule);
  if (!rule) return true;
  console.log("isvalidated", rule);
  if (rule.min && value?.length < rule.min) {
    return false;
  }
  return true;
};
