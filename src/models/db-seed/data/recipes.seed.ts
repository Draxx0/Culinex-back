import { Recipe } from 'src/models/recipes/types/recipes';

export const recipesSeed: Array<Recipe> = [
  {
    title: 'Poulet au curry',
    description: 'Un délicieux poulet au curry',
    difficulty: 'Facile',
    type: 'Plat',
    instructions: [
      'Faire revenir le poulet dans une poêle',
      'Ajouter le curry',
      'Laisser mijoter 30 minutes',
    ],
    ingredients: ['Poulet', 'Curry'],
    details: [
      {
        ingredientName: 'Poulet',
        quantity: '300g',
      },
      {
        ingredientName: 'Curry',
        quantity: '2 cuillères à soupe',
      },
    ],
  },
];