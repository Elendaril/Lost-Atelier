import { create } from 'zustand'
import type { ItemElement, ItemType } from '../types/items'

type Elements = Record<ItemElement, number>
type TextField = 'name' | 'description'

type ItemPreviewState = {
  name: string
  quality: number
  description: string
  elements: Elements
  type: ItemType[]
  setField: (field: TextField, value: string) => void
  setQuality: (value: number) => void
  setElement: (element: ItemElement, value: number) => void
  toggleType: (value: ItemType) => void
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export const useItemPreviewStore = create<ItemPreviewState>((set) => ({
  name: 'Life Stone',
  quality: 98,
  description:
    'A pulsating, crystalline core that radiates a rhythmic, amber glow, mimicking the steady beat of a heart.',
  elements: {
    fire: 3,
    water: 1,
    wind: 0,
    earth: 6,
    light: 5,
    shadow: 0,
  },
  type: ['stone', 'catalyst'],
  setField: (field, value) => set(() => ({ [field]: value })),
  setQuality: (value) => set(() => ({ quality: clamp(value, 0, 100) })),
  setElement: (element, value) =>
    set((state) => ({
      elements: {
        ...state.elements,
        [element]: clamp(value, 0, 9),
      },
    })),
  toggleType: (value) =>
    set((state) => ({
      type: state.type.includes(value) ? state.type.filter((entry) => entry !== value) : [...state.type, value],
    })),
}))
