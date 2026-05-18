import React from 'react';

const projects = [
  { id: 1, name: 'Skyline Apartments', loc: 'Mumbai', progress: '75%', status: 'In Progress' },
  { id: 2, name: 'Orchid Commercial', loc: 'Delhi', progress: '40%', status: 'In Progress' },
  { id: 3, name: 'Green Valley Villa', loc: 'Bangalore', progress: '90%', status: 'Near Completion' },
  { id: 4, name: 'Palm Resort', loc: 'Goa', progress: '20%', status: 'Planning' },
];

export default function RecentProjects() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Recent Projects</h2>
        <a href="#" className="text-[#FFC700] text-sm font-medium hover:underline">View all</a>
      </div>
      
      <div className="flex-1 flex flex-col gap-5">
        {projects.map((proj) => (
          <div key={proj.id} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-gray-200">
                <img src={`https://picsum.photos/seed/${proj.id}/80/80`} alt={proj.name} className="w-full h-full object-cover" />
              </div>
              <div className="overflow-hidden">
                <h4 className="text-sm font-bold text-gray-800 truncate">{proj.name}</h4>
                <p className="text-xs text-gray-500 truncate">{proj.loc}</p>
              </div>
            </div>
            
            <div className="w-20 shrink-0">
              <span className="text-sm font-bold text-gray-800">{proj.progress}</span>
              <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1">
                <div 
                  className="h-full rounded-full bg-[#FFC700]" 
                  style={{ width: proj.progress }}
                ></div>
              </div>
            </div>
            
            <div className="w-28 shrink-0 text-right">
              <span className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border whitespace-nowrap inline-block ${
                proj.status === 'In Progress' ? 'text-orange-500 bg-orange-50/50 border-orange-100' : 
                proj.status === 'Near Completion' ? 'text-green-600 bg-green-50/50 border-green-100' : 
                'text-yellow-600 bg-yellow-50/50 border-yellow-100'
              }`}>
                {proj.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
