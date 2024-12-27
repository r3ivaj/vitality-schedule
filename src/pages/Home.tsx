import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { WorkoutCard } from '../components/WorkoutCard';
import { getWorkoutForDate, getWorkoutSchedule } from '../utils/dateUtils';
import { isBefore } from 'date-fns';

export const Home: React.FC = () => {
  const { today } = getWorkoutSchedule(new Date());
  const daysOfWeek = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#9AC21A]">Entrenamientos</h1>
          <Link
            to="/calendar"
            className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black transition-colors"
          >
            <Calendar size={20} />
            Calendario
          </Link>
        </div>
        <h2 className="text-2xl font-bold text-black mb-6">Vista rápida</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <WorkoutCard title="Hoy" workout={today} />
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-black mb-6">Esta semana</h2>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-2">
            {daysOfWeek.map((day) => {
              const date = new Date(
                  new Date().setDate(
                    new Date().getDate() - new Date().getDay() + daysOfWeek.indexOf(day) + 1
                  )
                )
              const workout = getWorkoutForDate(
                date
              );

              const today = new Date();
              const isBeforeToday = isBefore(date, today);

              return (
                <div key={day} className="h-full">
                  <WorkoutCard 
                    title={day} 
                    workout={workout}
                    opacity={isBeforeToday ? 'opacity-50' : 'opacity-100'}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};