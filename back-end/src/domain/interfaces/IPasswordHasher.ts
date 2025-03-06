export interface IPasswordHasher {
    hash(password: string): Promise<string>;
    comparePassword(password: string, hash: string): Promise<boolean>;
}