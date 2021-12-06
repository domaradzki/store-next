import { text, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { permissions, isSignedIn } from '../access';

export const Category = list({
  access: {
    create: isSignedIn,
    read: () => true,
    update: permissions.canManageProducts,
    delete: permissions.canManageProducts,
  },
  fields: {
    name: text(),
    product: relationship({ ref: 'Product.category', many: true }),
  },
  ui: {
    listView: { initialColumns: ['name', 'product'] },
  },
});
