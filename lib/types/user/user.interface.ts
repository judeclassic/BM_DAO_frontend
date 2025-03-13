import { IAnalytics } from "../analytics/analytic.interface";
import { IPaginatedRequest } from "../pagination";

export enum AccountTypeEnum {
    user = 'user',
    client = 'client',
}

export enum SubscriptionStatus {
	PRO = "PRO",
	BASIC = "BASIC",
	ENTERPRISE = "ENTERPRISE",
}

export enum AccountType {
	USER = "USER",
	CLIENT = "CLIENT",
}

export type IWalletBalance = {
	referral_bonus: number,
	task_balance: number,
	wallet_balance: number,
	total_balance: number,
}

export type IWallet = {
	balance: IWalletBalance,
}

export type ISubscription = {
	raider: string;
	moderator: string;
}

export type IPersonal = {
	name:    string,
	username:   string,
	phone_number:   string,
	country:   string,
	email_address: string
}

export type Level = {
	id: string,
	amount: number,
	earned: number,
}

export type IReferralAnalytics = {
	id: string,
	total_amount: number,
	total_earned: number,
	levels:      Level[]
}

export type IReferral = {
	id: string,
	is_given: boolean,
	my_referral_code: string,
	referral_codes: IReferralCode[],
	analytics: IReferralAnalytics,
}

export type IReferralCode = {
	id: string,
	referral_id: string,
	code_index: string,
	code_value: string,
}

export type IPeripheral = {
	referral: IReferral,
	timeout: Date,
	is_banned: boolean,
	is_verified: boolean,
}

export type ICustomSetting = {
	default_theme: string
	is_accepting_request:  boolean
}

export type ISetting = {
	custom_setting: ICustomSetting,
	subscription: ISubscription,
	analytics: IAnalytics,
}

export type IUser = {
	id: string,
	account_type: AccountType,
	personal:  IPersonal,
	wallet: IWallet,
	setting: ISetting,
	peripheral: IPeripheral,
	created_at: Date,
	updated_at: Date,
}

export type IMultipleUser = {
	total_users: number,
	users:      IUser[],
	has_next:   boolean
}

export type IUpdateProfile = {
    name: string;
    username: string;
    phone_number: string;
    country: string;
}

export type IGetReferral = {
    level: number;
} & IPaginatedRequest