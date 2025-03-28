import { format, isSameDay, isAfter, differenceInWeeks } from 'date-fns';
import { WorkoutDetails } from '../types/workout';
import { workoutSchedule } from './workoutSchedule';

export const getWeekNumber = (date: Date): number => {
  const startDate = new Date('2024-11-11'); // November 11, 2024 is the first week
  const diffTime = date.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const weekNumber = Math.floor(diffDays / 7) % 4 + 1;
  return weekNumber;
};

export const getWorkoutForDate = (date: Date): WorkoutDetails => {
  const weekNumber = getWeekNumber(date);
  const dayName = format(date, 'EEEE');

  // Special case for Saturdays with Isometricos workouts every 3 weeks starting from March 29th, 2025
  if (dayName === 'Saturday') {
    const march29th2025 = new Date(2025, 2, 29); // Month is 0-indexed
    
    // Check if date is after or same as March 29th, 2025
    if (isSameDay(date, march29th2025) || isAfter(date, march29th2025)) {
      const weeksSinceMarch29 = differenceInWeeks(date, march29th2025);
      
      // If it's March 29th or every 3 weeks after that date
      if (weeksSinceMarch29 % 3 === 0) {
        return { type: 'Funcional y Fuerza', exercise: 'Isometricos' };
      }
    }
  }

  return workoutSchedule[weekNumber]?.[dayName];
};

export const getWorkoutSchedule = (date: Date) => {
  return {
    today: getWorkoutForDate(date),
  };
};