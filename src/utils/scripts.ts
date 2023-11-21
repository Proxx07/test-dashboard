export const getDateInterval = (days: number): [string, string] => {
  const today = new Date();
  const pastDate = new Date();
  pastDate.setDate(today.getDate() - days);
  return  [
    pastDate.toISOString().split('T')[0],
    today.toISOString().split('T')[0]
  ];
}

export const declination = (value: number, words: [string, string, string]): string => {
  value = Math.abs(value) % 100;
  let num = value % 10;
  if(value > 10 && value < 20) return words[2];
  if(num > 1 && num < 5) return words[1];
  if(num == 1) return words[0];
  return words[2];
}