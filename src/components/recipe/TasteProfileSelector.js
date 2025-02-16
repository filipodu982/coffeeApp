import React, { useState } from 'react';
import { flavorCategories } from '../../data/flavor-categories';

const TasteProfileSelector = ({ onProfileChange, initialProfile }) => {
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

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Flavors</h4>
        {flavorCategories.map(category => (
          <div key={category.id} className="space-y-2">
            <h5 className="text-sm font-medium text-gray-600">{category.name}</h5>
            <div className="flex flex-wrap gap-2">
              {category.subcategories.map(subcategory => (
                subcategory.flavors.map(flavor => (
                  <button
                    key={flavor}
                    type="button"
                    onClick={() => handleFlavorToggle(flavor)}
                    className={`px-3 py-1 text-sm rounded-full ${
                      profile.selectedFlavors.includes(flavor)
                        ? 'bg-brown-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {flavor}
                  </button>
                ))
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Intensity</h4>
        {Object.entries(profile.intensity).map(([type, value]) => (
          <div key={type} className="space-y-1">
            <label className="text-sm text-gray-600 capitalize">{type}</label>
            <input
              type="range"
              min="1"
              max="5"
              value={value}
              onChange={(e) => handleIntensityChange(type, parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-right text-sm text-gray-500">{value}/5</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasteProfileSelector;