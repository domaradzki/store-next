import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';
// at it's simplest , the access control returns a yes ot no value depending on the users session

export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return session?.data.role?.[permission];
    },
  ])
);

// Permissions check if someone meets a criteria - yes or no
export const permissions = {
  ...generatedPermissions,
};

// Role based function
// Rules can return a boolean - yes or no - or a filter which limits which products they can CRUD

export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // 1. Do they have a permission of canManageProducts
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // 2. If not, do they own this item ?
    return { user: { id: session.itemId } };
  },
  canOrder({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // 1. Do they have a permission of canManageProducts
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // 2. If not, do they own this item ?
    return { user: { id: session.itemId } };
  },
  canManageOrderItems({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageCart({ session })) {
      return true;
    }
    return { order: { user: { id: session.itemId } } };
  },
  canReadProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageProducts({ session })) {
      return true; // they can read everything
    }
    // they should only see available products (based on the status field)
    return { status: 'AVAILABLE' };
  },
  canManageUsers({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // 1. Do they have a permission of canManageProducts
    if (permissions.canManageUsers({ session })) {
      return true;
    }
    // 2. Otherwise they may only update themselves
    return { id: session.itemId };
  },
};
