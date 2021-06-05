import {DateRange} from '../components/rms/common/navbar/navbar.component';

export function defaultDateRange(): DateRange {
  const today = Date.now();
  return {
    startDate: new Date(today - (2 * 7 * 24 * 60 * 60 * 1000)),
    endDate: new Date(today)
  };
}
