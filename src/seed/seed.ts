import { getPayload } from "payload"
import config from "../payload.config"

const seed = async () => {
    const payload = await getPayload({ config });
    const admin = await payload.create({
        collection: 'users',
        data: {
            email: 'admin@test.nl',
            password: 'admin',
            role: 'admin',
        },
    });

    payload.logger.info('Admin created');

    const user1 = await payload.create({
        collection: 'users',
        data: {
            email: 'user1@test.nl',
            password: 'user',
            role: 'user',
        },
    });

    payload.logger.info('User 1 created');

    const user2 = await payload.create({
        collection: 'users',
        data: {
            email: 'user2@test.nl',
            password: 'user',
            role: 'user',
        },
    });

    payload.logger.info('User 2 created');

    await payload.create({
        collection: 'customers',
        data: {
            name: 'Customer 1',
            email: user1.email,
            user: user1.id,
            accountManager: admin.id,
        },
    });

    payload.logger.info('Customer 1 created');

    await payload.create({
        collection: 'customers',
        data: {
            name: 'Customer 2',
            email: user2.email,
            user: user2.id,
            accountManager: admin.id,
        },
    });

    payload.logger.info('Customer 2 created');
    payload.logger.info('Seed completed');
}

seed();