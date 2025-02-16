import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import Slider from '@react-native-community/slider';

interface TasteProfileSelectorProps {
  onFlavorSelect: (flavors: string[]) => void;
  onIntensityChange: (type: 'acidity' | 'sweetness' | 'body', value: number) => void;
  initialFlavors?: string[];
  initialIntensity?: {
    acidity: number;
    sweetness: number;
    body: number;
  };
}

export const TasteProfileSelector: React.FC<TasteProfileSelectorProps> = ({
  onFlavorSelect,
  onIntensityChange,
  initialFlavors = [],
  initialIntensity = { acidity: 3, sweetness: 3, body: 3 }
}) => {
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>(initialFlavors);
  const [intensity, setIntensity] = useState(initialIntensity);

  const handleFlavorToggle = (flavor: string) => {
    const newSelection = selectedFlavors.includes(flavor)
      ? selectedFlavors.filter(f => f !== flavor)
      : [...selectedFlavors, flavor];
    
    setSelectedFlavors(newSelection);
    onFlavorSelect(newSelection);
  };

  const handleIntensityChange = (type: 'acidity' | 'sweetness' | 'body', value: number) => {
    setIntensity(prev => ({ ...prev, [type]: value }));
    onIntensityChange(type, value);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Flavor Profile" />
        <Card.Content>
          {flavorCategories.map(category => (
            <View key={category.id} style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>{category.name}</Text>
              {category.subcategories.map(subcategory => (
                <View key={subcategory.id} style={styles.subcategoryContainer}>
                  <Text style={styles.subcategoryTitle}>{subcategory.name}</Text>
                  <View style={styles.flavorsContainer}>
                    {subcategory.flavors.map(flavor => (
                      <TouchableOpacity
                        key={flavor}
                        style={[
                          styles.flavorButton,
                          selectedFlavors.includes(flavor) && styles.selectedFlavor
                        ]}
                        onPress={() => handleFlavorToggle(flavor)}
                      >
                        <Text style={styles.flavorText}>{flavor}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Intensity" />
        <Card.Content>
          {Object.entries(intensity).map(([type, value]) => (
            <View key={type} style={styles.sliderContainer}>
              <Text style={styles.sliderLabel}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={5}
                step={1}
                value={value}
                onValueChange={(val) => handleIntensityChange(type as any, val)}
              />
              <Text style={styles.sliderValue}>{value}</Text>
            </View>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 8,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subcategoryContainer: {
    marginLeft: 16,
    marginBottom: 12,
  },
  subcategoryTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  flavorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  flavorButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
  },
  selectedFlavor: {
    backgroundColor: '#8B4513',
  },
  flavorText: {
    fontSize: 14,
  },
  sliderContainer: {
    marginBottom: 16,
  },
  sliderLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderValue: {
    textAlign: 'center',
    fontSize: 16,
  },
});