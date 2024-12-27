import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { getWorkoutForDate } from '../utils/dateUtils';
import { format, addMonths, subMonths, isBefore, startOfMonth, isSameMonth } from 'date-fns';
import { es } from 'date-fns/locale';

export const Calendar: React.FC = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const dates = Array.from({ length: daysInMonth }, (_, i) => 
    new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1)
  );

  const handlePreviousMonth = () => {
    const previousMonth = subMonths(currentDate, 1);
    if (!isBefore(startOfMonth(previousMonth), startOfMonth(today))) {
      setCurrentDate(previousMonth);
    }
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => addMonths(prev, 1));
  };

  const getWorkoutColor = (workout: ReturnType<typeof getWorkoutForDate>) => {
    switch (workout.type) {
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

  const isPreviousMonthDisabled = isSameMonth(currentDate, today);

  return (
    <div className="min-h-screen bg-gray-100 p-2 md:p-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center justify-between md:justify-start gap-4 mb-4 md:mb-0">
            <Link
              to="/"
              className="flex items-center gap-2 text-black hover:text-[#9AC21A] transition-colors"
            >
              <ArrowLeft size={24} />
              <span>Inicio</span>
            </Link>
            <h1 className="text-3xl font-bold text-[#9AC21A]">
              {format(currentDate, 'MMMM yyyy', { locale: es }).replace(/^\w/, c => c.toUpperCase())}
            </h1>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <button
              onClick={handlePreviousMonth}
              disabled={isPreviousMonthDisabled}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isPreviousMonthDisabled
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#9AC21A] text-white hover:bg-[#8ab118]'
              }`}
            >
              <ChevronLeft size={20} />
              Anterior
            </button>
            <button
              onClick={() => setCurrentDate(today)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-black transition-colors"
            >
              Mes actual
            </button>
            <button
              onClick={handleNextMonth}
              className="flex items-center gap-2 px-4 py-2 bg-[#9AC21A] text-white rounded-lg hover:bg-[#8ab118] transition-colors"
            >
              Siguiente
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-2 md:p-6">
          <div className="grid grid-cols-7 gap-2 md:gap-4">
            {['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'].map(day => (
              <div key={day} className="font-bold text-center text-gray-600">
                {day}
              </div>
            ))}
            
            {Array.from({ length: firstDayOfMonth.getDay() }).map((_, index) => (
              <div key={`empty-${index}`} />
            ))}

            {dates.map(date => {
              const workout = getWorkoutForDate(date);
              const isToday = isSameMonth(date, today) && date.getDate() === today.getDate();
              
              return (
                <div
                  key={date.getDate()}
                  className={`md:p-2 rounded-lg ${
                    isToday ? 'ring-2 ring-[#030b08] ring-offset-2' : ''
                  }`}
                >
                  <div className="text-sm font-semibold mb-1">{date.getDate()}</div>
                  <div className={`text-xs p-1 rounded ${getWorkoutColor(workout)}`}>
                    <div className="hidden md:block">{workout.type}</div>
                    {workout.exercise && (
                      <div className="text-xs mt-1 truncate overflow-hidden text-ellipsis">{workout.exercise}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};