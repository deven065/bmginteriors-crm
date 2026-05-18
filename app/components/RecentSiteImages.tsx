import React from 'react';

const images = [
  { id: 1, src: 'https://picsum.photos/seed/img1/200/300' },
  { id: 2, src: 'https://picsum.photos/seed/img2/200/300' },
  { id: 3, src: 'https://picsum.photos/seed/img3/200/300' },
];

export default function RecentSiteImages() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Recent Site Images</h2>
        <a href="#" className="text-[#FFC700] text-sm font-medium hover:underline">View all</a>
      </div>
      
      <div className="flex-1 flex gap-3">
        {images.map((img) => (
          <div key={img.id} className="flex-1 rounded-xl overflow-hidden relative group cursor-pointer">
            <img src={img.src} alt="Site" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button className="w-8 h-8 rounded-full bg-blue-500/80 hover:bg-blue-600 backdrop-blur-sm flex items-center justify-center transition-colors" title="Edit">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </button>
              <button className="w-8 h-8 rounded-full bg-red-500/80 hover:bg-red-600 backdrop-blur-sm flex items-center justify-center transition-colors" title="Delete">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
