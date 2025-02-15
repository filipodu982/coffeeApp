import React, { useState, useEffect } from 'react';
import './index.css';
import DialingGuide from './components/DialingGuide';

const RecipeForm = ({ onSave }) => {
  const [recipe, setRecipe] = useState({
    beanName: '',
    roaster: '',
    roastDate: new Date().toISOString().split('T')[0],
    grindSize: 20,
    doseWeight: 18,
    yield: 36,
    brewTime: 30
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Yield (g)
        </label>
        <input
          type="number"
          step="0.1"
          value={recipe.yield}
          onChange={(e) =>
            setRecipe({ ...recipe, yield: parseFloat(e.target.value) })
          }
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Brew Time (s)
        </label>
        <input
          type="number"
          value={recipe.brewTime}
          onChange={(e) =>
            setRecipe({ ...recipe, brewTime: parseInt(e.target.value) })
          }
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Add the Dialing Guide component here */}
      <DialingGuide 
        currentRecipe={recipe}
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
              <div className="font-bold">{recipe.beanName}</div>
              <div className="text-sm text-gray-500">
                {recipe.roaster} -{' '}
                {new Date(recipe.roastDate).toLocaleDateString()}
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
    const savedRecipes = localStorage.getItem('recipes');
    if (savedRecipes) {
      setRecipes(JSON.parse(savedRecipes));
    }
  }, []);

  const handleSaveRecipe = (newRecipe) => {
    const updatedRecipes = [...recipes, { ...newRecipe, id: Date.now() }];
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
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