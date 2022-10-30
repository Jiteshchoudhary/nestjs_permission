import { compare, hash } from 'bcryptjs';

export async function passwordEncyrption(password: string) {
    return await hash(password, 12);
}

export async function comparePassword(password: string, hashPassword: string) {
    return await compare(password, hashPassword);
}
