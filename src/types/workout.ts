export type WorkoutType = 
  | 'Funcional'  
  | 'Fuerza'    
  | 'Combinado'    
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