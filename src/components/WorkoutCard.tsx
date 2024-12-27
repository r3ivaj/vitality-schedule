import React from 'react';
import { WorkoutType, WorkoutDetails } from '../types/workout';

interface WorkoutCardProps {
  title: string;
  workout: WorkoutDetails;
  opacity?: string;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ title, workout, opacity = 'opacity-100' }) => {
  const getWorkoutStyle = (type: WorkoutType) => {
    switch (type) {
      case 'Funcional':
        return 'bg-white text-black border-2 border-[#9AC21A]';
      case 'Fuerza':
        return 'bg-[#9AC21A] text-white';
      case 'Combinado':
        return 'bg-gradient-to-r from-white to-[#9AC21A] text-black';
      default:
        return 'bg-gray-100 text-gray-400';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-4 md:p-6 ${opacity}`} role="article" aria-label={`Workout for ${title}`}>
      <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <div className={`rounded-md p-3 md:p-4 ${getWorkoutStyle(workout.type)}`}>
        <p className="text-lg md:text-xl font-bold mb-1 md:mb-2">{workout.type}</p>
        <p className="text-sm" aria-label={`Exercise: ${workout.exercise}`}>{workout.exercise}</p>
      </div>
    </div>
  );
};