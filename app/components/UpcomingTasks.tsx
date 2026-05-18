import React from 'react';

const tasks = [
  { id: 1, name: 'Electrical Work - Level 2', proj: 'Skyline Apartments', priority: 'High', date: 'Today', prioColor: 'text-red-500 bg-red-50' },
  { id: 2, name: 'Modular Kitchen Setup', proj: 'Green Valley Villa', priority: 'Medium', date: 'Tomorrow', prioColor: 'text-orange-500 bg-orange-50' },
  { id: 3, name: 'False Ceiling Installation', proj: 'Orchid Commercial', priority: 'Medium', date: '27 May', prioColor: 'text-orange-500 bg-orange-50' },
  { id: 4, name: 'Painting Touch-up', proj: 'Palm Resort', priority: 'Low', date: '29 May', prioColor: 'text-green-500 bg-green-50' },
];

export default function UpcomingTasks() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Upcoming Tasks</h2>
        <a href="#" className="text-[#FFC700] text-sm font-medium hover:underline">View all</a>
      </div>
      
      <div className="flex-1 flex flex-col gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between group">
            <div className="flex items-start gap-3 w-3/5">
              <div className="w-8 h-8 rounded bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 text-gray-400 group-hover:border-[#FFC700] group-hover:text-[#FFC700] transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div className="overflow-hidden">
                <h4 className="text-sm font-bold text-gray-800 truncate">{task.name}</h4>
                <p className="text-xs text-gray-500 truncate">{task.proj}</p>
              </div>
            </div>
            
            <div className="w-1/5 text-center">
              <span className={`text-[10px] font-bold px-2 py-1 rounded border ${
                task.priority === 'High' ? 'text-red-600 border-red-200' : 
                task.priority === 'Medium' ? 'text-orange-500 border-orange-200' : 
                'text-green-600 border-green-200'
              }`}>
                {task.priority}
              </span>
            </div>
            
            <div className="w-1/5 text-right">
              <span className="text-xs text-gray-500 font-medium">{task.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
