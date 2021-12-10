/* eslint-disable @typescript-eslint/no-unsafe-return */
import { KeystoneContext } from '@keystone-next/types';
import { Session } from '../types';
import { FavoriteItemCreateInput } from '../.keystone/schema-types';

export default async function toggleFavorite(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<FavoriteItemCreateInput> {
  console.log('ADDING TO Favorite');
  // 1. query the current user see if they are signed
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error('You must be logged in to do this');
  }
  // 2. query the curent users Favorite
  const allFavoriteItems = await context.lists.FavoriteItem.findMany({
    where: { user: { id: sesh.itemId }, product: { id: productId } },
    resolveFields: 'id',
  });

  const [existingFavoriteItem] = allFavoriteItems;
  // 3. see if curent item is in their Favorite
  if (existingFavoriteItem) {
    console.log(existingFavoriteItem);
    // 4. if it is , delete it
    return context.lists.FavoriteItem.deleteOne({
      id: existingFavoriteItem.id,
    });
  }
  // 4. if isnt create a new Favorite item
  return context.lists.FavoriteItem.createOne({
    data: {
      product: {
        connect: { id: productId },
      },
      user: { connect: { id: sesh.itemId } },
    },
  });
}
