export function isLeapYear(date: Date) {
  const year = date.getFullYear();
  return (year % 100 !== 0 && year % 4 === 0) || year % 400 === 0;
}
