const BREWING_METHODS = {
  ESPRESSO: 'espresso',
  V60: 'v60'
};

class RecipeStorage {
  constructor() {
    this.storageKey = 'recipes';
  }

  async migrateExistingRecipes() {
    const existingRecipes = this.getAllRecipes();
    const migratedRecipes = existingRecipes.map(recipe => {
      // First, check if recipe needs the brewing method migration
      if (!('brewingMethod' in recipe)) {
        recipe = this.migrateToNewFormat(recipe);
      }
      
      // Then, check if recipe needs the taste profile
      if (!recipe.results?.taste?.profile) {
        recipe = {
          ...recipe,
          results: {
            ...recipe.results,
            taste: {
              ...recipe.results.taste,
              profile: {
                selectedFlavors: [],
                intensity: {
                  acidity: 3,
                  sweetness: 3,
                  body: 3
                },
                notes: ''
              }
            }
          }
        };
      }
      
      return recipe;
    });

    localStorage.setItem(this.storageKey, JSON.stringify(migratedRecipes));
  }

  migrateToNewFormat(recipe) {
    return {
      id: recipe.id || Date.now().toString(),
      createdAt: recipe.createdAt || new Date().toISOString(),
      brewingMethod: BREWING_METHODS.ESPRESSO,
      beanInfo: {
        name: recipe.beanName || '',
        roaster: recipe.roaster || '',
        roastDate: recipe.roastDate || new Date().toISOString(),
      },
      baseParams: {
        grindSize: recipe.grindSize || 20,
        doseWeight: recipe.doseWeight || 18,
        waterTemperature: recipe.temperature,
      },
      methodParams: {
        yield: recipe.yield || 36,
        brewTime: recipe.brewTime || 30,
        pressure: recipe.pressure,
      },
      results: {
        rating: recipe.rating || 0,
        taste: {
          sour: recipe.isSour || false,
          bitter: recipe.isBitter || false,
          balanced: recipe.isBalanced || false,
          strength: 'good',
          notes: recipe.notes || '',
        },
      },
    };
  }

  createRecipe(recipe) {
    const newRecipe = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      brewingMethod: recipe.brewingMethod || BREWING_METHODS.ESPRESSO,
      beanInfo: {
        name: '',
        roaster: '',
        roastDate: new Date().toISOString(),
        ...recipe.beanInfo,
      },
      baseParams: {
        grindSize: 20,
        doseWeight: recipe.brewingMethod === BREWING_METHODS.ESPRESSO ? 18 : 15,
        ...recipe.baseParams,
      },
      methodParams: recipe.brewingMethod === BREWING_METHODS.ESPRESSO 
        ? {
            yield: 36,
            brewTime: 30,
            ...recipe.methodParams,
          }
        : {
            totalWater: 250,
            bloomWater: 30,
            bloomTime: 30,
            pourStages: [],
            totalTime: 180,
            ...recipe.methodParams,
          },
      results: {
        rating: 0,
        taste: {
          sour: false,
          bitter: false,
          balanced: false,
          strength: 'good',
          notes: '',
          profile: {
            selectedFlavors: [],
            intensity: {
              acidity: 3,
              sweetness: 3,
              body: 3
            },
            notes: ''
          }
        },
        ...recipe.results,
      },
    };

    const recipes = this.getAllRecipes();
    recipes.push(newRecipe);
    localStorage.setItem(this.storageKey, JSON.stringify(recipes));
    return newRecipe;
  }

  getAllRecipes() {
    const recipesJson = localStorage.getItem(this.storageKey);
    return recipesJson ? JSON.parse(recipesJson) : [];
  }

  updateRecipe(updatedRecipe) {
    const recipes = this.getAllRecipes();
    const index = recipes.findIndex(r => r.id === updatedRecipe.id);
    if (index !== -1) {
      recipes[index] = updatedRecipe;
      localStorage.setItem(this.storageKey, JSON.stringify(recipes));
    }
  }

  deleteRecipe(id) {
    const recipes = this.getAllRecipes();
    const filteredRecipes = recipes.filter(r => r.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(filteredRecipes));
  }
}

export const recipeStorage = new RecipeStorage();