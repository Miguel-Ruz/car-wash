/**
 * Returns the actual date in the yyyy-MM-dd format
 * @returns formated date string
 */
export function getFormatedActualDate(): string {
  const date = new Date();
  const month = date.getMonth() + 1;
  return `${date.getFullYear()}-${String(month).padStart(2, '0')}-${date.getDate()}`;
}