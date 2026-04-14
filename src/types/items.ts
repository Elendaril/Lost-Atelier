export const itemElements = ['fire', 'water', 'wind', 'earth', 'light', 'shadow'] as const;
export type ItemElement = (typeof itemElements)[number];

export const itemTypes = ['herb', 'oil', 'catalyst', 'stone', 'wood', 'water', 'beast', 'metal'] as const;
export type ItemType = (typeof itemTypes)[number];

export type ItemRank = 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export type ItemElementValue = {
  element: ItemElement;
  value: number;
};

export type ItemIngredient = {
  id: number;
  name: string;
  description: string;
  quality: number;
  icon: string;
  image: string;
  elements: ItemElementValue[];
  type: ItemType[];
  material: boolean;
  usable: boolean;
  consumable: boolean;
};

export function getItemRankFromQuality(quality: number): ItemRank {
  if (quality >= 95) return 'S';
  if (quality >= 85) return 'A';
  if (quality >= 75) return 'B';
  if (quality >= 60) return 'C';
  if (quality >= 45) return 'D';
  if (quality >= 25) return 'E';
  return 'F';
}
