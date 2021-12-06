import { list } from '@keystone-next/keystone/schema';
import {
  text,
  relationship,
  select,
  integer,
  checkbox,
} from '@keystone-next/fields';
import { rules, isSignedIn } from '../access';

export const Product = list({
  access: {
    create: isSignedIn,
    read: rules.canReadProducts,
    update: rules.canManageProducts,
    delete: rules.canManageProducts,
  },
  fields: {
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    brand: relationship({
      ref: 'Brand.product',
    }),
    category: relationship({
      ref: 'Category.product',
    }),
    code: text(),
    discount: relationship({ ref: 'Discount.product' }),
    new: checkbox({ isRequired: true }),
    isFavorite: relationship({ ref: 'User.favorite', many: true }),
    photo: relationship({
      ref: 'ProductImage.product',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    }),
    status: select({
      options: [
        { label: 'Draft', value: 'DRAFT' },
        { label: 'Available', value: 'AVAILABLE' },
        { label: 'Unavailaible', value: 'UNAVAILABLE' },
      ],
      defaultValue: 'DRAFT',
      ui: {
        displayMode: 'segmented-control',
        createView: {
          fieldMode: 'hidden',
        },
      },
    }),
    price: integer(),
    user: relationship({
      ref: 'User.products',
      defaultValue: ({ context }) => ({
        connect: { id: context.session?.itemId },
      }),
    }),
  },
});
