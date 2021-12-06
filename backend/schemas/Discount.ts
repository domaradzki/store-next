import { text, relationship, integer } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { permissions, isSignedIn } from '../access';

export const Discount = list({
  access: {
    create: isSignedIn,
    read: () => true,
    update: permissions.canManageProducts,
    delete: permissions.canManageProducts,
  },
  fields: {
    name: text(),
    percent: integer(),
    product: relationship({ ref: 'Product.discount', many: true }),
  },
  ui: {
    listView: { initialColumns: ['name', 'percent', 'product'] },
  },
});
