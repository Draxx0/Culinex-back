import { IngredientCategory } from 'src/models/ingredients-category/types/ingredients-category';

interface Category {
  name: IngredientCategory;
}

export const categoriesSeed: Array<Category> = [
  {
    name: 'Viandes Rouges',
  },
  {
    name: 'Viandes Blanches',
  },
  {
    name: 'Champignons',
  },
  {
    name: 'Volailles',
  },
  {
    name: 'Chocolat',
  },
  {
    name: 'Fromages',
  },
  {
    name: 'Poissons et fruits de mer',
  },
  {
    name: 'Œufs',
  },
  {
    name: 'Féculents',
  },
  {
    name: 'Charcuteries',
  },
  {
    name: 'Légumes',
  },
  {
    name: 'Fruits',
  },
  {
    name: 'Céréales et Grains',
  },
  {
    name: 'Produits Laitiers',
  },
  {
    name: 'Épices et Condiments',
  },
  {
    name: 'Huiles et Matières Grasses',
  },
  {
    name: 'Sucres et Édulcorants',
  },
  {
    name: 'Boissons',
  },
  {
    name: 'Produits Transformés',
  },
  {
    name: 'Produits de Boulangerie',
  },
  {
    name: 'Légumineuses',
  },
  {
    name: 'Produits Fermentés',
  },
];
