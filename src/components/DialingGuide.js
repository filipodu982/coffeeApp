import React, { useState } from 'react';
import { Alert, AlertDescription } from '../components/ui/alert.jsx';
import { useCoffeeRecommendations } from '../hooks/useCoffeeRecommendations';
import ExtractionVisual from './ExtractionVisual';

const DialingGuide = ({ currentRecipe, onUpdateRecipe }) => {
  const [step, setStep] = useState(1);
  const [strength, setStrength] = useState(null);
  const [extraction, setExtraction] = useState(null);
  
  const strengthOptions = ['weak', 'good', 'strong'];
  const extractionOptions = ['under', 'good', 'over'];

  // Calculate the ratio for reference
  const ratio = currentRecipe ? (currentRecipe.yield / currentRecipe.doseWeight).toFixed(2) : 0;
  
  const getRecommendation = () => {
    if (!strength || !extraction) return null;
    
    // Comprehensive recommendation logic based on both strength and extraction
    if (extraction === 'under') {
      if (strength === 'weak') {
        return {
          primary: "Grind finer and/or increase dose",
          explanation: "Your coffee is both under-extracted and weak. Try:",
          steps: [
            "Decrease grind size by 2 steps",
            `Consider increasing dose from ${currentRecipe.doseWeight}g to ${(currentRecipe.doseWeight + 0.5).toFixed(1)}g`,
            `Current ratio is 1:${ratio}, aim for a lower ratio for more strength`
          ]
        };
      } else if (strength === 'good') {
        return {
          primary: "Grind finer only",
          explanation: "Your coffee is under-extracted but has good strength. Try:",
          steps: [
            "Decrease grind size by 2 steps",
            "Keep current dose and ratio",
            "This should increase extraction while maintaining strength"
          ]
        };
      } else {
        return {
          primary: "Grind finer and decrease dose",
          explanation: "Your coffee is under-extracted and too strong. Try:",
          steps: [
            "Decrease grind size by 2 steps",
            `Consider decreasing dose from ${currentRecipe.doseWeight}g to ${(currentRecipe.doseWeight - 0.5).toFixed(1)}g`,
            `Current ratio is 1:${ratio}, aim for a slightly higher ratio`
          ]
        };
      }
    } else if (extraction === 'over') {
      if (strength === 'weak') {
        return {
          primary: "Grind coarser and increase dose",
          explanation: "Your coffee is over-extracted and weak. Try:",
          steps: [
            "Increase grind size by 2 steps",
            `Consider increasing dose from ${currentRecipe.doseWeight}g to ${(currentRecipe.doseWeight + 0.5).toFixed(1)}g`,
            `Current ratio is 1:${ratio}, aim for a lower ratio`
          ]
        };
      } else if (strength === 'good') {
        return {
          primary: "Grind coarser only",
          explanation: "Your coffee is over-extracted but has good strength. Try:",
          steps: [
            "Increase grind size by 2 steps",
            "Keep current dose and ratio",
            "This should reduce extraction while maintaining strength"
          ]
        };
      } else {
        return {
          primary: "Grind coarser and decrease dose",
          explanation: "Your coffee is over-extracted and too strong. Try:",
          steps: [
            "Increase grind size by 2 steps",
            `Consider decreasing dose from ${currentRecipe.doseWeight}g to ${(currentRecipe.doseWeight - 0.5).toFixed(1)}g`,
            `Current ratio is 1:${ratio}, aim for a higher ratio`
          ]
        };
      }
    } else {
      if (strength === 'weak') {
        return {
          primary: "Increase dose or decrease yield",
          explanation: "Your extraction is good but coffee is weak. Try:",
          steps: [
            "Keep current grind size",
            `Consider increasing dose from ${currentRecipe.doseWeight}g to ${(currentRecipe.doseWeight + 0.5).toFixed(1)}g`,
            "Or decrease yield while keeping grind size the same"
          ]
        };
      } else if (strength === 'good') {
        return {
          primary: "Perfect! Save this recipe",
          explanation: "You've found the sweet spot! Record these parameters:",
          steps: [
            `Grind size: ${currentRecipe.grindSize}`,
            `Dose: ${currentRecipe.doseWeight}g`,
            `Yield: ${currentRecipe.yield}g (1:${ratio})`,
            `Time: ${currentRecipe.brewTime}s`
          ]
        };
      } else {
        return {
          primary: "Decrease dose or increase yield",
          explanation: "Your extraction is good but coffee is too strong. Try:",
          steps: [
            "Keep current grind size",
            `Consider decreasing dose from ${currentRecipe.doseWeight}g to ${(currentRecipe.doseWeight - 0.5).toFixed(1)}g`,
            "Or increase yield while keeping grind size the same"
          ]
        };
      }
    }
  };

  const recommendation = getRecommendation();

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold text-gray-900">Dialing Assistant</h2>
      
      {/* Step 1: Strength Assessment */}
      <div className={`transition-opacity ${step === 1 ? 'opacity-100' : 'opacity-50'}`}>
        <h3 className="font-medium mb-2">How's the strength?</h3>
        <div className="grid grid-cols-3 gap-4">
          {strengthOptions.map((str) => (
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
              {str.charAt(0).toUpperCase() + str.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Extraction Assessment */}
      <div className={`transition-opacity ${step === 2 ? 'opacity-100' : 'opacity-50'}`}>
        <h3 className="font-medium mb-2">How's the extraction?</h3>
        
        {/* Extraction Visual Guide */}
        <div className="mb-6">
          <ExtractionVisual selectedExtraction={extraction} />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {extractionOptions.map((ext) => (
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
              {ext === 'under' ? 'Under-extracted' :
               ext === 'over' ? 'Over-extracted' : 'Good'}
            </button>
          ))}
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
            ) : recommendation ? (
              <>
                <div className="font-bold text-lg mb-2">{recommendation.primary}</div>
                <div className="text-sm text-gray-600 mb-2">{recommendation.explanation}</div>
                <ul className="list-disc list-inside space-y-1">
                  {recommendation.steps.map((step, idx) => (
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
        className="text-sm text-gray-500 hover:bg-gray-200 rounded px-2 py-1"
      >
        Start Over
      </button>
    </div>
  );
};

export default DialingGuide;