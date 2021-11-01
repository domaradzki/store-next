import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';
import { KeystoneContext } from '@keystone-next/types';
import { CartItem } from '../schemas/CartItem';
import {
  CartItemCreateInput,
  OrderCreateInput,
} from '../.keystone/schema-types';
import stripeConfig from '../lib/stripe';
/* eslint-disable @typescript-eslint/no-unsafe-return */

const graphql = String.raw;

interface Arguments {
  token: string;
}

export default async function checkout(
  root: any,
  { token }: Arguments,
  context: KeystoneContext
): Promise<OrderCreateInput> {
  // 1. Make sure they are signed in
  const userId = context.session.itemId;
  if (!userId) {
    throw new Error('Sorry! You must be signed in to create an order!');
  }
  // 1.5 Query the current user
  const user = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields: graphql`
      id
      name
      email
      cart {
          id
          quantity
          product {
              name
              price
              description
              id
              photo {
                  id
                  image {
                      id
                      publicUrlTransformed
                  }
              }
          }
      }
      `,
  });
  console.dir(user, { depth: null });
  // 2. calculate the total price for their order
  const cartItmes = user.cart.filter((cartItem) => cartItem.product);
  const amount = cartItmes.reduce(function (
    tally: number,
    cartItem: CartItemCreateInput
  ) {
    return tally + cartItem.quantity * cartItem.product.price;
  },
  0);
  console.log(amount);
  // 3. create the payment with the stripe library
  const charge = await stripeConfig.paymentIntents
    .create({
      amount,
      currency: 'PLN',
      confirm: true,
      payment_method: token,
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });
  // 4. convert the cartitems to orderitems
  // 5. create the order and return it
}
