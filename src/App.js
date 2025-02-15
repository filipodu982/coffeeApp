import React, { useState, useEffect } from 'react';
import './index.css';
import DialingGuide from './components/DialingGuide';
import { recipeStorage } from './utils/recipeStorage.js';

const RecipeForm = ({ onSave }) => {
  const [brewingMethod, setBrewingMethod] = useState('espresso');
  const [recipe, setRecipe] = useState({
    beanInfo: {
      name: '',
      roaster: '',
      roastDate: new Date().toISOString().split('T')[0],
    },
    baseParams: {
      grindSize: 20,
      doseWeight: brewingMethod === 'espresso' ? 18 : 15,
      waterTemperature: 93,
    },
    methodParams: brewingMethod === 'espresso' ? {
      yield: 36,
      brewTime: 30,
      pressure: null,
    } : {
      totalWater: 250,
      bloomWater: 30,
      bloomTime: 30,
      pourStages: [],
      totalTime: 180,
      drawdownTime: null,
    },
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(recipe);
    setRecipe({
      beanName: '',
      roaster: '',
      roastDate: new Date().toISOString().split('T')[0],
      grindSize: 20,
      doseWeight: 18,
      yield: 36,
      brewTime: 30
    });
  };

  const handleMethodChange = (method) => {
    setBrewingMethod(method);
    setRecipe(prev => ({
      ...prev,
      baseParams: {
        ...prev.baseParams,
        doseWeight: method === 'espresso' ? 18 : 15,
      },
      methodParams: method === 'espresso' ? {
        yield: 36,
        brewTime: 30,
        pressure: null,
      } : {
        totalWater: 250,
        bloomWater: 30,
        bloomTime: 30,
        pourStages: [],
        totalTime: 180,
        drawdownTime: null,
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-6">
  <label className="block text-gray-700 text-sm font-bold mb-2">
    Brewing Method
  </label>
  <div className="flex gap-4">
    <button
      type="button"
      onClick={() => handleMethodChange('espresso')}
      className={`px-4 py-2 rounded ${
        brewingMethod === 'espresso' 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-200 text-gray-700'
      }`}
    >
      Espresso
    </button>
    <button
      type="button"
      onClick={() => handleMethodChange('v60')}
      className={`px-4 py-2 rounded ${
        brewingMethod === 'v60' 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-200 text-gray-700'
      }`}
    >
      V60
    </button>
  </div>
</div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Bean Name
        </label>
        <input
          type="text"
          value={recipe.beanName}
          onChange={(e) => setRecipe({ ...recipe, beanName: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Roaster
        </label>
        <input
          type="text"
          value={recipe.roaster}
          onChange={(e) => setRecipe({ ...recipe, roaster: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Roast Date
        </label>
        <input
          type="date"
          value={recipe.roastDate}
          onChange={(e) => setRecipe({ ...recipe, roastDate: e.target.value })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Grind Size
        </label>
        <input
          type="number"
          value={recipe.grindSize}
          onChange={(e) =>
            setRecipe({ ...recipe, grindSize: parseInt(e.target.value) })
          }
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Dose (g)
        </label>
        <input
          type="number"
          step="0.1"
          value={recipe.doseWeight}
          onChange={(e) =>
            setRecipe({ ...recipe, doseWeight: parseFloat(e.target.value) })
          }
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {brewingMethod === 'espresso' ? (
  <div className="space-y-4">
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Yield (g)
      </label>
      <input
        type="number"
        step="0.1"
        value={recipe.methodParams.yield}
        onChange={(e) => setRecipe({
          ...recipe,
          methodParams: { ...recipe.methodParams, yield: parseFloat(e.target.value) }
        })}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Brew Time (s)
      </label>
      <input
        type="number"
        value={recipe.methodParams.brewTime}
        onChange={(e) => setRecipe({
          ...recipe,
          methodParams: { ...recipe.methodParams, brewTime: parseInt(e.target.value) }
        })}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  </div>
) : (
  <div className="space-y-4">
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Total Water (g)
      </label>
      <input
        type="number"
        step="1"
        value={recipe.methodParams.totalWater}
        onChange={(e) => setRecipe({
          ...recipe,
          methodParams: { ...recipe.methodParams, totalWater: parseInt(e.target.value) }
        })}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Bloom Water (g)
        </label>
        <input
          type="number"
          value={recipe.methodParams.bloomWater}
          onChange={(e) => setRecipe({
            ...recipe,
            methodParams: { ...recipe.methodParams, bloomWater: parseInt(e.target.value) }
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Bloom Time (s)
        </label>
        <input
          type="number"
          value={recipe.methodParams.bloomTime}
          onChange={(e) => setRecipe({
            ...recipe,
            methodParams: { ...recipe.methodParams, bloomTime: parseInt(e.target.value) }
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    </div>
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Total Time (s)
      </label>
      <input
        type="number"
        value={recipe.methodParams.totalTime}
        onChange={(e) => setRecipe({
          ...recipe,
          methodParams: { ...recipe.methodParams, totalTime: parseInt(e.target.value) }
        })}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  </div>
)}

      {/* Add the Dialing Guide component here */}
      <DialingGuide 
  currentRecipe={recipe}
  brewingMethod={brewingMethod}
  onUpdateRecipe={(updatedRecipe) => {
    setRecipe(updatedRecipe);
  }}
/>
      
      <div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save Recipe
        </button>
      </div>
    </form>
  );
};

const RecipeList = ({ recipes, onSelect }) => {
  if (recipes.length === 0) {
    return <p className="text-center text-gray-500">No recipes found</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Saved Recipes</h2>
      <ul className="space-y-4">
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <button
              type="button"
              onClick={() => onSelect(recipe)}
              className="block w-full p-4 text-left bg-white rounded-lg shadow hover:bg-gray-100"
            >
              <div className="font-bold">
                {recipe.beanInfo ? recipe.beanInfo.name : recipe.beanName}
              </div>
              <div className="text-sm text-gray-500">
                {recipe.beanInfo ? recipe.beanInfo.roaster : recipe.roaster} -{' '}
                {new Date(recipe.beanInfo ? recipe.beanInfo.roastDate : recipe.roastDate).toLocaleDateString()}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {recipe.brewingMethod ? recipe.brewingMethod.toUpperCase() : 'ESPRESSO'}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const RecipeDetail = ({ recipe, onClose }) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
      <h2 className="text-2xl font-bold mb-4">Recipe Details</h2>
      <div className="mb-4">
        <div className="font-bold">Bean Name</div>
        <div>{recipe.beanName}</div>
      </div>
      <div className="mb-4">
        <div className="font-bold">Roaster</div>
        <div>{recipe.roaster}</div>
      </div>
      <div className="mb-4">
        <div className="font-bold">Roast Date</div>
        <div>{new Date(recipe.roastDate).toLocaleDateString()}</div>
      </div>
      <div className="mb-4">
        <div className="font-bold">Grind Size</div>
        <div>{recipe.grindSize}</div>
      </div>
      <div className="mb-4">
        <div className="font-bold">Dose</div>
        <div>{recipe.doseWeight} g</div>
      </div>
      <div className="mb-4">
        <div className="font-bold">Yield</div>
        <div>{recipe.yield} g</div>
      </div>
      <div className="mb-4">
        <div className="font-bold">Brew Time</div>
        <div>{recipe.brewTime} s</div>
      </div>

      <div>
        <button
          type="button"
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          &larr; Back
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const initializeApp = async () => {
      await recipeStorage.migrateExistingRecipes();
      const savedRecipes = recipeStorage.getAllRecipes();
      setRecipes(savedRecipes);
    };
    
    initializeApp();
  }, []);

  const handleSaveRecipe = (recipeData) => {
    const newRecipe = recipeStorage.createRecipe(recipeData);
    setRecipes(prevRecipes => [...prevRecipes, newRecipe]);
  };

  return (
    <div className="max-w-lg mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
        Coffee Dialing App
      </h1>

      {selectedRecipe ? (
        <RecipeDetail
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      ) : (
        <>
          <RecipeForm onSave={handleSaveRecipe} />
          <RecipeList
            recipes={recipes}
            onSelect={(recipe) => setSelectedRecipe(recipe)}
          />
        </>
      )}
    </div>
  );
};

export default App;