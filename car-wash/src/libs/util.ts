import moment from "moment";

/**
 * Returns the actual date in the yyyy-MM-dd format
 * @returns formated date string of the current day
 */
export function getFormatedActualDate(): string {
  const date = new Date();
  const month = date.getMonth() + 1;
  return `${date.getFullYear()}-${String(month).padStart(2, '0')}-${date.getDate()}`;
}

/**
 * Gets the current week
 * @returns an object with the start and end of the current week
 */
export function getWeeklyDate() {
  const weeklyDate = moment();


  return {
    start: weeklyDate.startOf('week').format('YYYY-MM-DD'),
    end: weeklyDate.clone().endOf('week').format('YYYY-MM-DD')
  }
}

/**
 * Gets the current month
 * @returns an object with the end and start dates of the current month
 */
export function getMonthlyDate() {
  const monthlyDate = moment();
  monthlyDate.startOf('month');
  return {
    start: monthlyDate.format('YYYY-MM-DD'),
    end: monthlyDate.clone().endOf('month').format('YYYY-MM-DD')
  }
}