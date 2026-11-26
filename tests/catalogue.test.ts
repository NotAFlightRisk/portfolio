import { expect, it } from 'vitest';
import { shelf } from '#lib/server/catalogue.ts';
import type { App, Category } from '#lib/types.ts';

const app = (name: string, stars: number, category = 'trains') =>
  ({ name, title: name, category, stars }) as App;
const all = [
  app('cows', 1),
  app('leaves', 9),
  app('swans', 4),
  app('signals', 4),
  app('else', 99, 'buses')
];
const names = (apps: App[]) => apps.map(({ name }) => name);

it('lists a category in its own order, then the rest most starred first', () => {
  const trains = { slug: 'trains', apps: ['cows', 'swans'] } as Category;
  expect(names(shelf(trains, all))).toEqual(['cows', 'swans', 'leaves', 'signals']);
});

it('sorts a category with no order of its own by stars, then title', () => {
  expect(names(shelf({ slug: 'trains' } as Category, all))).toEqual([
    'leaves',
    'signals',
    'swans',
    'cows'
  ]);
});
