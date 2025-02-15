import { useMemo } from 'react';
import recommendations from '../data/coffee-recommendations.json';

export const useCoffeeRecommendations = (currentRecipe) => {
  const generateSteps = (adjustments, recipe) => {
    const steps = [];
    const brewingMethod = recipe.brewingMethod || 'espresso';
    
    // Calculate ratio based on brewing method
    const ratio = brewingMethod === 'espresso' 
      ? (recipe.methodParams.yield / recipe.baseParams.doseWeight).toFixed(2)
      : (recipe.methodParams.totalWater / recipe.baseParams.doseWeight).toFixed(1);

    // Add grind adjustment
    if (adjustments.grind) {
      steps.push(`Make the grind ${adjustments.grind.direction} by ${adjustments.grind.steps} steps`);
    }

    // Add dose adjustment
    if (adjustments.dose) {
      const newDose = (recipe.baseParams.doseWeight + adjustments.dose.change).toFixed(1);
      steps.push(`Adjust dose to ${newDose}${adjustments.dose.unit}`);
    }

    // Add ratio adjustment
    if (adjustments.ratio) {
      if (typeof adjustments.ratio === 'string') {
        // Legacy format for espresso
        steps.push(`Aim for a ${adjustments.ratio} ratio than 1:${ratio}`);
      } else {
        // New format for V60
        steps.push(`Aim for 1:${adjustments.ratio.target} ratio (currently 1:${ratio})`);
      }
    }

    // Add technique instructions for V60
    if (adjustments.technique) {
      adjustments.technique.forEach(instruction => {
        steps.push(instruction);
      });
    }

    // Add temperature adjustments
    if (adjustments.temperature) {
      if (adjustments.temperature.change) {
        steps.push(`Decrease water temperature by ${Math.abs(adjustments.temperature.change)}°C`);
      } else if (adjustments.temperature.min && adjustments.temperature.max) {
        steps.push(`Use water temperature between ${adjustments.temperature.min}-${adjustments.temperature.max}°C`);
      }
    }

    // Keep current parameters
    if (adjustments.keepCurrent) {
      adjustments.keepCurrent.forEach(param => {
        steps.push(`Keep current ${param}`);
      });
    }

    // Save parameters based on brewing method
    if (adjustments.saveParameters) {
      if (brewingMethod === 'espresso') {
        steps.push(
          `Grind size: ${recipe.baseParams.grindSize}`,
          `Dose: ${recipe.baseParams.doseWeight}g`,
          `Yield: ${recipe.methodParams.yield}g (1:${ratio})`,
          `Time: ${recipe.methodParams.brewTime}s`
        );
      } else {
        steps.push(
          `Grind size: ${recipe.baseParams.grindSize}`,
          `Dose: ${recipe.baseParams.doseWeight}g`,
          `Total water: ${recipe.methodParams.totalWater}g (1:${ratio})`,
          `Water temperature: ${recipe.baseParams.waterTemperature}°C`,
          `Total time: ${recipe.methodParams.totalTime}s`,
          `Bloom: ${recipe.methodParams.bloomWater}g for ${recipe.methodParams.bloomTime}s`
        );
      }
    }

    // Handle yield adjustments (mainly for espresso)
    if (adjustments.yield) {
      steps.push(`${adjustments.yield} yield while keeping grind size the same`);
    }

    return steps;
  };

  const getRecommendation = (strength, extraction) => {
    if (!strength || !extraction) return null;

    const brewingMethod = currentRecipe?.brewingMethod || 'espresso';
    const recommendation = recommendations.recommendations[brewingMethod]?.[extraction]?.[strength];
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
    const brewingMethod = currentRecipe?.brewingMethod || 'espresso';
    const info = recommendations.extraction[extraction];
    return {
      ...info,
      characteristics: info.characteristics[brewingMethod] || info.characteristics
    };
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