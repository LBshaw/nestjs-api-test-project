/**
 * Define seed to user entity.
 * 
 * @author Videl Shaw
 * @email videl0680@gmail.com
 * @created 09/04/2024
 */
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../../users/entities/user.entity';
import { UserRole } from '../../common/guards/roles';

export default class UserSeeder implements Seeder {
    public async run( dataSource: DataSource, factoryManager: SeederFactoryManager ): Promise<void> {
        const repository = dataSource.getRepository(User);

        await repository.insert([
            {
                userName: 'Videl Shaw',
                email: 'admin@example.com',
                password: await bcrypt.hashSync("secret@videl", 10),
                role: UserRole.Admin
            }
        ]);

        const userFactory = await factoryManager.get(User);
        await userFactory.save();
    }
}