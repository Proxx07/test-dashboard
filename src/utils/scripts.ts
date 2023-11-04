export const getDateInterval = (days: number): [string, string] => {
  const today = new Date();
  const pastDate = new Date();
  pastDate.setDate(today.getDate() - days);
  return [pastDate.toLocaleDateString(), today.toLocaleDateString()];
}