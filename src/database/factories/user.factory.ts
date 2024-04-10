/**
 * Define factory to seed user entites.
 *
 * @author Videl Shaw
 * @email videl0680@gmail.com
 * @created 09/04/2024
 */
import { setSeederFactory } from "typeorm-extension";
import * as bcrypt from 'bcrypt';

import { User } from "../../users/entities/user.entity";
import { CreateUserDto } from "../../users/dto/create-user.dto";
import { UserRole } from "../../common/guards/roles";


export default setSeederFactory(User, async (faker): Promise<Partial<User>> => {
    const user: CreateUserDto = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        role: UserRole.User,
        password: await bcrypt.hashSync("secret@cat", 10),
    }

    return user;
});