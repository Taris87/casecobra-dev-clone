// bg-blue-950 border-blue-950
// bg-zinc-900 border-zinc-900
// bg-rose-700 border-rose-700

import { PRODUCT_PRICES } from '@/config/products'

export const COLORS = [
  { label: 'Black', value: 'black', tw: 'zinc-900' },
  {
    label: 'Blue',
    value: 'blue',
    tw: 'blue-950',
  },
  { label: 'Rose', value: 'rose', tw: 'rose-700' },
] as const

export const MODELS = {
  name: 'models',
  options: [
    {
      label: 'iPhone X',
      value: 'iphonex',
    },
    {
      label: 'iPhone 11',
      value: 'iphone11',
    },
    {
      label: 'iPhone 12',
      value: 'iphone12',
    },
    {
      label: 'iPhone 13',
      value: 'iphone13',
    },
    {
      label: 'iPhone 14',
      value: 'iphone14',
    },
    {
      label: 'iPhone 15',
      value: 'iphone15',
    },
  ],
} as const

export const MATERIALS = {
  name: 'material',
  options: [
    {
      label: 'Silikon',
      value: 'silicone',
      description: undefined,
      price: PRODUCT_PRICES.material.silicon,
    },
    {
      label: 'Weiches Polycarbonat',
      value: 'polycarbonate',
      description: 'kratzfeste Beschichtung',
      price: PRODUCT_PRICES.material.polycarbonate,
    },
  ],
} as const

export const FINISHES = {
  name: 'finish',
  options: [
    {
      label: 'glatte Oberfläche',
      value: 'smooth',
      description: undefined,
      price: PRODUCT_PRICES.finish.smooth,
    },
    {
      label: 'Textur',
      value: 'textured',
      description: 'weiche, griffige Oberfläche',
      price: PRODUCT_PRICES.finish.textured,
    },
  ],
} as const
