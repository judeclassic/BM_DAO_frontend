import { IChatterService } from "./chatter.interace";
import { IModeratorService } from "./moderator.interface";
import { IRaiderService } from "./raider.interface";

export enum AccountTypeEnum {
    user = 'user',
    client = 'client',
}

export interface IWallet {
    balance: {
        referralBonus: number;
        taskBalance: number;
        walletBalance: number;
        totalBalance: number;
    };
    wallet?: {
        address: string;
        privateKey: string;
        balance?: string;
    }
}

export interface IAnalytics {
    totalUploaded: number;
    totalPending: number;
    totalCompleted: number;
    raiders: {
        totalUploaded: number;
        totalPending: number;
        totalCompleted: number;
    },
    moderators: {
        totalUploaded: number;
        totalPending: number;
        totalCompleted: number;
    },
    chatEngagers: {
        totalUploaded: number;
        totalPending: number;
        totalCompleted: number;
    },
    collabManagers: {
        totalUploaded: number;
        totalPending: number;
        totalCompleted: number;
    }
}

export interface IUser {
    _id?: string;
    accountType: AccountTypeEnum;
    name: string;
    username: string;
    emailAddress: string;
    phoneNumber?: string;
    country?: string;
    referral: {
        isGiven: boolean;
        myReferralCode: string;
        referralCodes: {
            1?: string
            2?: string
            3?: string
            4?: string
            5?: string
            6?: string
            7?: string
            8?: string
            9?: string
            10?: string
        };
        analytics: {
            totalAmount: number,
            totalEarned: number
            levels: {
                1: { amount: number, earned: number }
                2: { amount: number, earned: number }
                3: { amount: number, earned: number }
                4: { amount: number, earned: number }
                5: { amount: number, earned: number }
                6: { amount: number, earned: number }
                7: { amount: number, earned: number }
                8: { amount: number, earned: number }
                9: { amount: number, earned: number }
                10: { amount: number, earned: number }
            }
        }
    };
    password: string;
    updatedAt?: Date;
    createdAt?: Date;
    accessToken?: string;
    isVerified?: boolean;
    wallet: IWallet;
    authenticationCode?: string;
    analytics?: IAnalytics;
    isEmailVerified?: boolean;
    emailVerificationCode?: number;
    emailVerificationCodeExpires?: Date;
    resetPasswordOtp?: number;
    resetPasswordExpires?: Date;
    resetPasswordRequest?: boolean;
    chatterService?: IChatterService;
    raiderService?: IRaiderService;
    moderatorService?: IModeratorService;
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
