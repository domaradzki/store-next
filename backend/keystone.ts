import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { FavoriteItem } from './schemas/FavoriteItem';
import { Discount } from './schemas/Discount';
import { Brand } from './schemas/Brand';
import { Category } from './schemas/Category';
import { Role } from './schemas/Role';
import { OrderItem } from './schemas/OrderItem';
import { Order } from './schemas/Order';
import { CartItem } from './schemas/CartItem';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { User } from './schemas/User';
import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';

import 'dotenv/config';
import { sendPasswordResetEmail } from './lib/mail';
import { extendGraphqlSchema } from './mutations/index';

import { insertSeedData } from './seed-data';

const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long they stay signed in
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO add in initial roles
  },
  passwordResetLink: {
    async sendToken(args) {
      // send email
      await sendPasswordResetEmail(args.token, args.identity);
    },
  },
});

export default withAuth(
  config({
    // @ts-ignore
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      async onConnect(keystone) {
        console.log('Connected to the database!');
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      },
    },
    lists: createSchema({
      // TODO: add data seeding here
      User,
      Product,
      ProductImage,
      Category,
      FavoriteItem,
      Brand,
      Discount,
      CartItem,
      OrderItem,
      Order,
      Role,
    }),
    extendGraphqlSchema,
    ui: {
      // Show this UI only for peaple who pass this test
      isAccessAllowed: ({ session }: ListAccessArgs) => !!session?.data,
    },
    session: withItemData(statelessSessions(sessionConfig), {
      User: `id name email role { ${permissionsList.join(' ')} }`,
    }),
  })
);
