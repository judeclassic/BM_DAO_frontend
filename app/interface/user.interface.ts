export interface IUser {
    accountType?: string;
    name?: string;
    emailAddress?: string;
    accessToken?: string;
    wallet?: {
        balance?: {
            referalBonus?: number;
            taskBalance?: number;
            walletBalance?: number;
            totalBalance?: number;
        }
    },
    referal?: {
        myReferalCode?: string;
    },
    isVerified?: boolean;
    country?: string;
    raiderService?: {
        _id: string,
        accountType: string,
        userId: string,
        updatedAt?: string,
        createdAt?: string,
        subscriptionDate: number,
        isVerified: boolean,
        work_timeout: number,
        analytics: {
            availableTask: number;
            pendingTask: number;
            completedTask: number;
        }
    };
    moderatorService?: any;
    analytics?: {
        raiders: {
            totalUploaded: number,
            totalCompleted: number,
        },
        moderators: {
            totalUploaded: number,
            totalCompleted: number,
        },
        chatEngagers: {
            totalUploaded: number,
            totalCompleted: number,
        },
        collabManagers: {
            totalUploaded: number,
            totalCompleted: number,
        },
        totalUploaded: number,
        totalCompleted: number,
        totalPending: number,
    }
}
export interface IUserRegister {
    accountType: string,
    name: string;
    emailAddress: string;
    username: string;
    password: string;
    country: string;
    referralCode: string;
    phoneNumber: string;
}
export interface IUserLogin {
    emailAddress: string;
    password: string;
}

export interface IVerifyEmail {
    emailAddress: string;
    code: number;
}

export interface IForgotPassword {
    emailAddress: string;
}

export interface IResetPassword {
    emailAddress: string;
    code: string;
    password: string;
    confirmPassword: string;
}
