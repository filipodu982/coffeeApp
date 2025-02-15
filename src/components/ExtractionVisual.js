import React from 'react';

const ExtractionVisual = ({ selectedExtraction }) => {
  // Helper function to determine which section is selected
  const getOpacity = (section) => {
    if (!selectedExtraction) return 'opacity-40';
    return selectedExtraction === section ? 'opacity-100' : 'opacity-40';
  };

  return (
    <div className="w-full space-y-2">
      {/* Gradient bar */}
      <div className="relative h-8 rounded-lg overflow-hidden">
        {/* Under-extracted section */}
        <div 
          className={`absolute left-0 w-1/3 h-full bg-gradient-to-r from-yellow-200 to-yellow-400 
            ${getOpacity('under')} transition-opacity duration-300`}
        >
          <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-yellow-800">
            Sour
          </div>
        </div>
        
        {/* Well-extracted section */}
        <div 
          className={`absolute left-1/3 w-1/3 h-full bg-gradient-to-r from-green-300 to-green-500 
            ${getOpacity('good')} transition-opacity duration-300`}
        >
          <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-green-800">
            Sweet
          </div>
        </div>
        
        {/* Over-extracted section */}
        <div 
          className={`absolute right-0 w-1/3 h-full bg-gradient-to-r from-brown-400 to-brown-600 
            ${getOpacity('over')} transition-opacity duration-300`}
        >
          <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-brown-800">
            Bitter
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-between text-xs text-gray-600">
        <div className="flex flex-col items-center">
          <div>Under-extracted</div>
          <div className="text-yellow-600">Fast shot</div>
        </div>
        <div className="flex flex-col items-center">
          <div>Well-extracted</div>
          <div className="text-green-600">Balanced</div>
        </div>
        <div className="flex flex-col items-center">
          <div>Over-extracted</div>
          <div className="text-gray-600">Slow shot</div>
        </div>
      </div>

      {/* Additional Visual Indicators */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className={`p-3 rounded-lg ${selectedExtraction === 'under' ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'}`}>
          <div className="text-sm font-medium text-center">⚡ Fast Flow</div>
          <div className="text-xs text-center text-gray-500">20-25s</div>
        </div>
        <div className={`p-3 rounded-lg ${selectedExtraction === 'good' ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
          <div className="text-sm font-medium text-center">✨ Ideal Flow</div>
          <div className="text-xs text-center text-gray-500">25-30s</div>
        </div>
        <div className={`p-3 rounded-lg ${selectedExtraction === 'over' ? 'bg-gray-100 border border-gray-200' : 'bg-gray-50'}`}>
          <div className="text-sm font-medium text-center">🐌 Slow Flow</div>
          <div className="text-xs text-center text-gray-500">30-35s</div>
        </div>
      </div>
    </div>
  );
};

export default ExtractionVisual;