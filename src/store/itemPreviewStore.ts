import { create } from 'zustand'

type Elements = {
  light: number
  fire: number
}

type TextField = 'name' | 'rank' | 'description' | 'type'

type ItemPreviewState = {
  name: string
  rank: string
  quality: number
  description: string
  elements: Elements
  type: string
  setField: (field: TextField, value: string) => void
  setQuality: (value: number) => void
  setElement: (element: keyof Elements, value: number) => void
}

export const useItemPreviewStore = create<ItemPreviewState>((set) => ({
  name: 'Life Stone',
  rank: 'S',
  quality: 98,
  description:
    'A pulsating, crystalline core that radiates a rhythmic, amber glow, mimicking the steady beat of a heart',
  elements: {
    light: 2,
    fire: 1,
  },
  type: 'Stone, Catalyst',
  setField: (field, value) => set(() => ({ [field]: value })),
  setQuality: (value) => set(() => ({ quality: value })),
  setElement: (element, value) =>
    set((state) => ({
      elements: {
        ...state.elements,
        [element]: value,
      },
    })),
}))
