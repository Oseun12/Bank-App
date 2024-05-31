import bcrypt from 'bcryptjs';

export class AppUtils {
    public static async generateHashPassword(pass: string): Promise<string> {
        try {
            // Hash password
            const hashedPassword = await bcrypt.hash(pass, 10);
            console.log('Hashed Password:', hashedPassword);
            return hashedPassword;
        } catch (error) {
            console.error('Error:', error);
            Promise.reject('Error hashing password');
        }
        return Promise.resolve('')
    }

    public async compareHashedPassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        try {
            //compare the hashed password with the plain text password
            const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
            console.log('password Match:', isMatch);
            return isMatch;
        } catch (error) {
            console.error('Error:', error);
        }
        return false;
    }
}