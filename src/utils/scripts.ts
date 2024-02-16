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

export const formatters = {
  weeks: (str: string | number) => {
    const s = `${str}`.toLowerCase();

    return (
      (s === 'пн' || s === '1') ? 'Понедельник' :
      (s === 'вт' || s === '2') ? 'Вторник' :
      (s === 'ср' || s === '3') ? 'Среда' :
      (s === 'чт' || s === '4') ? 'Четверг' :
      (s === 'пт' || s === '5') ? 'Пятница' :
      (s === 'сб' || s === '6') ? 'Суббота' :
      (s === 'вск' || s === '7') ? 'Воскресенье' :
      str
    )
  },

  percent: (str: string | number) => {
    return `${str}%`
  }
}