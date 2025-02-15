import { useMemo } from 'react';
import recommendations from '../data/coffee-recommendations.json';

export const useCoffeeRecommendations = (currentRecipe) => {
  const generateSteps = (adjustments, recipe) => {
    const steps = [];
    const ratio = recipe ? (recipe.yield / recipe.doseWeight).toFixed(2) : 0;

    if (adjustments.grind) {
      steps.push(`Make the grind ${adjustments.grind.direction} by ${adjustments.grind.steps} steps`);
    }

    if (adjustments.dose) {
      const newDose = (recipe.doseWeight + adjustments.dose.change).toFixed(1);
      steps.push(`Adjust dose to ${newDose}${adjustments.dose.unit}`);
    }

    if (adjustments.ratio) {
      steps.push(`Aim for a ${adjustments.ratio} ratio than 1:${ratio}`);
    }

    if (adjustments.keepCurrent) {
      adjustments.keepCurrent.forEach(param => {
        steps.push(`Keep current ${param}`);
      });
    }

    if (adjustments.saveParameters) {
      steps.push(
        `Grind size: ${recipe.grindSize}`,
        `Dose: ${recipe.doseWeight}g`,
        `Yield: ${recipe.yield}g (1:${ratio})`,
        `Time: ${recipe.brewTime}s`
      );
    }

    if (adjustments.yield) {
      steps.push(`${adjustments.yield} yield while keeping grind size the same`);
    }

    return steps;
  };

  const getRecommendation = (strength, extraction) => {
    if (!strength || !extraction) return null;

    const recommendation = recommendations.recommendations[extraction]?.[strength];
    if (!recommendation) return null;

    return {
      ...recommendation,
      steps: generateSteps(recommendation.adjustments, currentRecipe)
    };
  };

  const getStrengthInfo = (strength) => {
    return recommendations.strength[strength];
  };

  const getExtractionInfo = (extraction) => {
    return recommendations.extraction[extraction];
  };

  const options = useMemo(() => ({
    strength: Object.keys(recommendations.strength),
    extraction: Object.keys(recommendations.extraction)
  }), []);

  return {
    getRecommendation,
    getStrengthInfo,
    getExtractionInfo,
    options
  };
};
