import { Access, CollectionConfig, FieldAccess, PayloadRequest } from "payload";

const isAdmin: (args: { req: PayloadRequest }) => boolean = ({ req }) => req?.user?.role === 'admin';

export const Customers: CollectionConfig = {
    slug: 'customers',
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'email'],
    },
    access: {
        create: isAdmin,
        update: isAdmin,
        read: ({ req }) => {
            if (req.user?.role === 'admin') return true;
            
            return {
                user: {
                    equals: req.user?.id,
                }
            }
        }
    },
    fields: [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            required: true,
        },
        {
            name: 'user',
            label: 'User',
            type: 'relationship',
            relationTo: 'users',
        },
        {
            name: 'accountManager',
            label: 'Account Manager',
            type: 'relationship',
            relationTo: 'users',
            access: {
                read: () => true,
                update: isAdmin,
                create: isAdmin,
            }
        }
    ],
}