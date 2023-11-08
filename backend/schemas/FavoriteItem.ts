import { list } from '@keystone-next/keystone/schema';
import { relationship } from '@keystone-next/fields';
import { rules, isSignedIn } from '../access';

export const FavoriteItem = list({
  access: {
    create: isSignedIn,
    read: () => true,
    update: rules.canManageUsers,
    delete: rules.canManageUsers,
  },
  ui: { listView: { initialColumns: ['product', 'user'] } },
  fields: {
    product: relationship({ ref: 'Product' }),
    user: relationship({ ref: 'User.favorite' }),
  },
});
