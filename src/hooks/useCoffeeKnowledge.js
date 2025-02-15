import { useState, useEffect } from 'react';
import coffeeKnowledge from '../data/coffee-knowledge.json';

export const useCoffeeKnowledge = () => {
  const [knowledge, setKnowledge] = useState(coffeeKnowledge);
  
  const getExtractionInfo = (type) => {
    return knowledge.extraction[type] || null;
  };

  const getStrengthInfo = (type) => {
    return knowledge.strength[type] || null;
  };

  const getRecommendation = (extraction, strength) => {
    if (!extraction || !strength) return null;
    return knowledge.recommendations[extraction]?.[strength] || null;
  };

  const getParameterInfo = (parameter) => {
    return knowledge.parameters[parameter] || null;
  };

  return {
    getExtractionInfo,
    getStrengthInfo,
    getRecommendation,
    getParameterInfo,
    parameters: knowledge.parameters
  };
};
