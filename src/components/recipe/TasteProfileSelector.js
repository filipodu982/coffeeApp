import React, { useState } from 'react';
import { flavorCategories } from '../../data/flavor-categories';
import { ChevronDown, ChevronUp } from 'lucide-react';

const TasteProfileSelector = ({ onProfileChange, initialProfile }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [profile, setProfile] = useState(initialProfile || {
    selectedFlavors: [],
    intensity: {
      acidity: 3,
      sweetness: 3,
      body: 3
    },
    notes: ''
  });

  const handleFlavorToggle = (flavor) => {
    const newSelectedFlavors = profile.selectedFlavors.includes(flavor)
      ? profile.selectedFlavors.filter(f => f !== flavor)
      : [...profile.selectedFlavors, flavor];
    
    const newProfile = {
      ...profile,
      selectedFlavors: newSelectedFlavors
    };
    
    setProfile(newProfile);
    onProfileChange(newProfile);
  };

  const handleIntensityChange = (type, value) => {
    const newProfile = {
      ...profile,
      intensity: {
        ...profile.intensity,
        [type]: value
      }
    };
    
    setProfile(newProfile);
    onProfileChange(newProfile);
  };

  const getSelectedFlavorsSummary = () => {
    if (profile.selectedFlavors.length === 0) {
      return "No flavors selected";
    }
    const displayCount = 3;
    const displayed = profile.selectedFlavors.slice(0, displayCount);
    const remaining = profile.selectedFlavors.length - displayCount;
    
    return `${displayed.join(', ')}${remaining > 0 ? ` and ${remaining} more` : ''}`;
  };

  return (
    <div className="space-y-2 border rounded-lg p-4 bg-white">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex justify-between items-center text-left"
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Taste Profile</h3>
          <p className="text-sm text-gray-500">{getSelectedFlavorsSummary()}</p>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-6 w-6 text-gray-500" />
        ) : (
          <ChevronDown className="h-6 w-6 text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          <div className="space-y-4">
            {flavorCategories.map(category => (
              <div key={category.id} className="space-y-2">
                <h4 className="font-medium text-gray-700">{category.name}</h4>
                {category.subcategories.map(subcategory => (
                  <div key={subcategory.id} className="ml-4 space-y-2">
                    <h5 className="text-sm font-medium text-gray-600">{subcategory.name}</h5>
                    <div className="flex flex-wrap gap-2">
                      {subcategory.flavors.map(flavor => (
                        <button
                          key={flavor}
                          type="button"
                          onClick={() => handleFlavorToggle(flavor)}
                          className={`px-3 py-1 text-sm rounded-full transition-colors ${
                            profile.selectedFlavors.includes(flavor)
                              ? 'bg-brown-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {flavor}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-700">Intensity</h4>
            {Object.entries(profile.intensity).map(([type, value]) => (
              <div key={type} className="space-y-1">
                <div className="flex justify-between">
                  <label className="text-sm text-gray-600 capitalize">{type}</label>
                  <span className="text-sm text-gray-500">{value}/5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={value}
                  onChange={(e) => handleIntensityChange(type, parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TasteProfileSelector;