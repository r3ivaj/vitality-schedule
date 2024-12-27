import { format } from 'date-fns';
import { WorkoutDetails } from '../types/workout';
import { workoutSchedule } from './workoutSchedule';

export const getWeekOfMonth = (date: Date): number => {
  const weekNum = Math.ceil(date.getDate() / 7);
  return weekNum > 4 ? 4 : weekNum;
};

export const getWorkoutForDate = (date: Date): WorkoutDetails | { type: 'Rest Day', exercise: '' } => {
  const weekOfMonth = getWeekOfMonth(date);
  const dayName = format(date, 'EEEE');
  
  if (dayName === 'Sunday') {
    return { type: 'Rest Day', exercise: '' };
  }
  
  return workoutSchedule[weekOfMonth]?.[dayName] || { type: 'Rest Day', exercise: '' };
};

export const getWorkoutSchedule = (date: Date) => {
  return {
    yesterday: getWorkoutForDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1)),
    today: getWorkoutForDate(date),
    tomorrow: getWorkoutForDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)),
  };
};