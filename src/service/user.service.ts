import { User } from "../persistence/entity/user";
import { UserRequest } from "../model/request/user.request";
import { AppUtils } from "../core/utils/app.utils";
import { AppRole } from "../model/enums/app.role";

export async function createUserProfile(request: UserRequest): Promise<User> {
    try {
        const user = await User.findOne({ where: { username: request.username } });
        if(user) {
            console.log("User already exists!");
            throw new Error("User already exists!");
        }

        //Hash the password
        const hashedPassword = AppUtils.generateHashPassword(request.password);
        if (!hashedPassword) {
            console.error('Error hashing password');
            throw new Error('Error hashing password');
        }
        // Create a new User
        const newUser = new User({
            userName: request.username,
            password: hashedPassword,
            role: request.role,
            email: request.email,
            status: request.status,
            createdAt: new Date()
        });

        //Save the user
        const savedUser = await newUser.save();
        console.log('User created successfully');
        return savedUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Internal server error-1')
    }
}

export async function updateUserProfile(request: UserRequest, id: number): Promise<User> {
    return new Promise<User>((resolve, reject) => {
        User.findByPk(id).then(async(user) => {
            if(!user) {
                console.log('User not found!');
                throw new Error('User not found!');
            }
            // Hash the password
            let hashedPassword = '';
            if (request.password) {
                hashedPassword = await AppUtils.generateHashPassword(request.password);
                if(!hashedPassword) {
                    console.error('Error hashing password');
                    reject('Error hashing password');
                }
            }
            //Update the user
            if (request.username) user.username = request.username;
            if (request.password) user.password = hashedPassword;
            if(request.role) user.role = request.role as AppRole;
            if(request.email) user.email = request.email;
            if(request.status) user.status = request.status;
            user.updateAt = new Date();

            //Save the user
            user.save()
            .then((user) => {
                console.log('User updated!');
                resolve(user)
                return user;
            }).catch((error) => {
                console.error("Error creating User:", error);
                reject(null);
            });
        }).catch((error) => {
            reject(error);
        });
    });
}

export async function getUserProfile(id: number): Promise<User> {
    return new Promise<User>((resolve, reject) => {
        User.findByPk(id).then((user) => {
            if(!user) {
                console.log('User not found!');
                throw Error('User not found!');
            }
            console.log('User found');
            resolve(user)
            return user;
        }).catch((error) => {
            reject(error);
            throw new Error('User not Found!')
        });
    });
}

export async function getUserProfileByUsernameOrEmail(username: string, email: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
        User.findOne({
            where: { username, email }
        }).then((user) => {
            if (!user) {
                console.log('User not found!');
                throw new Error('User not found');
            }
            resolve(user)
            return user;
        }).catch((error) => {
            reject(error);
            throw new Error('user not found!!!')
        })
    })
}