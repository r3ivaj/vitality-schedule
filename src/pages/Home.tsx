import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { WorkoutCard } from '../components/WorkoutCard';
import { getWorkoutSchedule } from '../utils/dateUtils';

export const Home: React.FC = () => {
  const { yesterday, today, tomorrow } = getWorkoutSchedule(new Date());

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#9AC21A]">Seguimiento de entrenamiento</h1>
          <Link
            to="/calendar"
            className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black transition-colors"
          >
            <Calendar size={20} />
            Ver calendario
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:order-1 order-3">
            <WorkoutCard title="Ayer" workout={yesterday} opacity="opacity-50" />
          </div>
          <div className="md:order-2 order-1">
            <WorkoutCard title="Hoy" workout={today} />
          </div>
          <div className="md:order-3 order-2">
            <WorkoutCard title="Mañana" workout={tomorrow} opacity="opacity-75" />
          </div>
        </div>
      </div>
    </div>
  );
};