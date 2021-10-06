/* eslint-disable @typescript-eslint/no-unsafe-return */
import { KeystoneContext } from '@keystone-next/types';
import { Product } from '../schemas/Product';
import { Session } from '../types';
import { CartItemCreateInput } from '../.keystone/schema-types';

export default async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  console.log('ADDING TO CART');
  // 1. query the current user see if they are signed
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error('You must be logged in to do this');
  }
  // 2. query the curent users cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: sesh.itemId }, product: { id: productId } },
    resolveFields: 'id, quantity',
  });

  const [existingCartItem] = allCartItems;
  // 3. see if curent item is in their cart
  if (existingCartItem) {
    console.log(existingCartItem);
    console.log(
      `There are already ${existingCartItem.quantity}, increment by 1`
    );
    // 4. if it is , increment by 1
    return context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
    });
  }
  // 4. if isnt create a new cart item
  return context.lists.CartItem.createOne({
    data: {
      product: {
        connect: { id: productId },
      },
      user: { connect: { id: sesh.itemId } },
    },
  });
}
