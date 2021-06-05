import {Column} from '../components/rms/common/navbar/navbar.component';

export const displayedColumns = (columns: Column[]) => columns.filter(column => column.selected).map(column => column.name);

export const minutesFromSeconds = (seconds: number) => Math.round(seconds / 60);

export const secondsFromSeconds = (seconds: number) => seconds % 60;
