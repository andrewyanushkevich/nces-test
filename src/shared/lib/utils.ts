export const hasIntersection = <T>(arr1: T[], arr2: T[]) => {
  const set = new Set(arr1);
  return arr2.some((item) => set.has(item));
};
