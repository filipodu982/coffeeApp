// Types for the flavor wheel categories
interface FlavorCategory {
    id: string;
    name: string;
    subcategories: FlavorSubcategory[];
  }
  
  interface FlavorSubcategory {
    id: string;
    name: string;
    flavors: string[];
  }
  
  // Enhanced Recipe interface with taste profile
  interface Recipe {
    // ... existing recipe fields ...
    tasteProfile: {
      selectedFlavors: string[];  // Array of specific flavor IDs
      intensity: {
        acidity: number;        // 1-5 scale
        sweetness: number;      // 1-5 scale
        body: number;          // 1-5 scale
      };
      notes: string;
    };
  }
  
  // Initial flavor wheel data structure
  const flavorCategories: FlavorCategory[] = [
    {
      id: 'fruity',
      name: 'Fruity',
      subcategories: [
        {
          id: 'berry',
          name: 'Berry',
          flavors: ['blackberry', 'raspberry', 'blueberry', 'strawberry']
        },
        {
          id: 'citrus',
          name: 'Citrus',
          flavors: ['lemon', 'orange', 'grapefruit', 'lime']
        }
      ]
    },
    {
      id: 'sweet',
      name: 'Sweet',
      subcategories: [
        {
          id: 'brown-sugar',
          name: 'Brown Sugar',
          flavors: ['molasses', 'honey', 'caramel', 'maple']
        },
        {
          id: 'vanilla',
          name: 'Vanilla',
          flavors: ['vanilla', 'cream']
        }
      ]
    },
    {
      id: 'roasted',
      name: 'Roasted',
      subcategories: [
        {
          id: 'nutty',
          name: 'Nutty',
          flavors: ['peanut', 'almond', 'hazelnut', 'pecan']
        },
        {
          id: 'cocoa',
          name: 'Cocoa',
          flavors: ['dark chocolate', 'milk chocolate', 'cacao nibs']
        }
      ]
    }
  ];
  
  // Updated SQLite schema
  const sqlSchema = `
  ALTER TABLE recipes ADD COLUMN taste_profile_flavors TEXT;
  ALTER TABLE recipes ADD COLUMN taste_profile_acidity INTEGER;
  ALTER TABLE recipes ADD COLUMN taste_profile_sweetness INTEGER;
  ALTER TABLE recipes ADD COLUMN taste_profile_body INTEGER;
  `;