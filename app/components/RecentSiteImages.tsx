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
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
