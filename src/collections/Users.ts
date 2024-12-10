import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      defaultValue: 'user',
      saveToJWT: true,
      options: [
        {
          label: 'User',
          value: 'user',
        },
        {
          label: 'Admin',
          value: 'admin',
        },
      ],
    },
    {
      name: 'managedCustomers',
      label: 'Managed Customers',
      type: 'join',
      collection: 'customers',
      on: 'accountManager',
      hasMany: true,
    }
  ],
}
