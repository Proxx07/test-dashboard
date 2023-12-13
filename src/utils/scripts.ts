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

export const weekDaysFormatter = (str: string | number) => {
  const s = `${str}`.toLowerCase();
  switch (s) {
    case 'пн': case '1': return 'Понедельник';
    case 'вт': case '2': return 'Вторник';
    case 'ср': case '3': return 'Среда';
    case 'чт': case '4': return 'Четверг';
    case 'пт': case '5': return 'Пятница';
    case 'сб': case '6': return 'Суббота';
    case 'вск': case '7': return 'Воскресенье';

    default:
      return str;
  }
}