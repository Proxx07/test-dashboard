export const validDate = (date: Date): string => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `${year}-${month < 10 ? '0'+month : month}-${day < 10 ? '0'+day : day}`
}

export const getDateInterval = (days: number): string | [string, string] => {
  const today = new Date();
  const pastDate = new Date();
  pastDate.setDate(today.getDate() - days);
  if (!days) return today.toISOString().split('T')[0]
  return  [
    pastDate.toISOString().split('T')[0],
    today.toISOString().split('T')[0]
  ];
}