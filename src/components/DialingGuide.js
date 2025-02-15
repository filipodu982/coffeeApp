import React, { useState } from 'react';
import { Alert, AlertDescription } from '../../components/ui/alert.jsx';
import { useCoffeeRecommendations } from '../hooks/useCoffeeRecommendations';

const DialingGuide = ({ currentRecipe, onUpdateRecipe }) => {
  const [step, setStep] = useState(1);
  const [strength, setStrength] = useState(null);
  const [extraction, setExtraction] = useState(null);
  
  const { 
    getRecommendation, 
    getStrengthInfo, 
    getExtractionInfo,
    options 
  } = useCoffeeRecommendations(currentRecipe);

  const currentRecommendation = getRecommendation(strength, extraction);

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold text-gray-900">Dialing Assistant</h2>
      
      {/* Step 1: Strength Assessment */}
      <div className={`transition-opacity ${step === 1 ? 'opacity-100' : 'opacity-50'}`}>
        <h3 className="font-medium mb-2">How's the strength?</h3>
        <div className="grid grid-cols-3 gap-4">
          {options.strength.map((str) => {
            const info = getStrengthInfo(str);
            return (
              <button
                key={str}
                type="button"
                onClick={() => {
                  setStrength(str);
                  if (!extraction) setStep(2);
                }}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  strength === str
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <div>{info.name}</div>
                <div className="text-sm opacity-75">{info.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Extraction Assessment */}
      <div className={`transition-opacity ${step === 2 ? 'opacity-100' : 'opacity-50'}`}>
        <h3 className="font-medium mb-2">How's the extraction?</h3>
        <div className="grid grid-cols-3 gap-4">
          {options.extraction.map((ext) => {
            const info = getExtractionInfo(ext);
            return (
              <button
                key={ext}
                type="button"
                onClick={() => {
                  setExtraction(ext);
                  setStep(3);
                }}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  extraction === ext
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <div>{info.name}</div>
                <div className="text-sm opacity-75">{info.description}</div>
                <div className="mt-2 text-xs">
                  <ul className="list-disc list-inside">
                    {info.characteristics.map((char, idx) => (
                      <li key={idx}>{char}</li>
                    ))}
                  </ul>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recommendation Display */}
      {(strength || extraction) && (
        <Alert className="mt-4">
          <AlertDescription>
            {strength && !extraction ? (
              <div>
                <div className="font-bold text-lg mb-2">Now, let's check the extraction</div>
                <div className="text-sm text-gray-600">Choose how the coffee tastes in terms of extraction above.</div>
              </div>
            ) : currentRecommendation ? (
              <>
                <div className="font-bold text-lg mb-2">{currentRecommendation.primary}</div>
                <div className="text-sm text-gray-600 mb-2">{currentRecommendation.explanation}</div>
                <ul className="list-disc list-inside space-y-1">
                  {currentRecommendation.steps.map((step, idx) => (
                    <li key={idx} className="text-sm">{step}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </AlertDescription>
        </Alert>
      )}

      {/* Reset Button */}
      <button
        onClick={() => {
          setStep(1);
          setStrength(null);
          setExtraction(null);
        }}
        className="text-sm text-gray-500 hover:text-gray-700"
      >
        Start Over
      </button>
    </div>
  );
};

export default DialingGuide;