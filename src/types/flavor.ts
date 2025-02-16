export interface FlavorCategory {
    id: string;
    name: string;
    subcategories: FlavorSubcategory[];
  }
  
  export interface FlavorSubcategory {
    id: string;
    name: string;
    flavors: string[];
  }
  
  export interface TasteProfile {
    selectedFlavors: string[];
    intensity: {
      acidity: number;
      sweetness: number;
      body: number;
    };
    notes: string;
  }
  
  // Update the existing TasteResults interface
  export interface EnhancedTasteResults extends Omit<TasteResults, 'taste'> {
    taste: {
      sour: boolean;
      bitter: boolean;
      balanced: boolean;
      strength: 'weak' | 'good' | 'strong';
      notes: string;
      profile: TasteProfile;
    };
  }