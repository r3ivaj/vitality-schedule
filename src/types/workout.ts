export type WorkoutType = 
  | 'Funcional'  
  | 'Fuerza'    
  | 'Funcional y Fuerza'    
  | 'Descanso';   

export type ExerciseType =
  | 'Upper Body'
  | 'Leg Day'
  | 'Isometricos'
  | 'Pliometricos'
  | 'Full Body'
  | 'Potencia'
  | 'Coordinacion y Agilidad'
  | '';

export interface WorkoutDetails {
  type: WorkoutType;
  exercise: ExerciseType;
}

export type WeekSchedule = {
  [key: number]: {
    [key: string]: WorkoutDetails;
  };
};