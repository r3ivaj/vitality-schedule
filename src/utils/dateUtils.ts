import { format } from 'date-fns';
import { WorkoutDetails } from '../types/workout';
import { workoutSchedule } from './workoutSchedule';

export const getWeekNumber = (date: Date): number => {
  const startDate = new Date('2024-11-11'); // November 11, 2024 is the first week
  const diffTime = date.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const weekNumber = Math.floor(diffDays / 7) % 4 + 1;
  return weekNumber;
};

export const getWorkoutForDate = (date: Date): WorkoutDetails | { type: 'Descanso', exercise: '' } => {
  const weekNumber = getWeekNumber(date);
  const dayName = format(date, 'EEEE');
  
  if (dayName === 'Sunday') {
    return { type: 'Descanso', exercise: '' };
  }
  
  return workoutSchedule[weekNumber]?.[dayName] || { type: 'Descanso', exercise: '' };
};

export const getWorkoutSchedule = (date: Date) => {
  return {
    today: getWorkoutForDate(date),
  };
};