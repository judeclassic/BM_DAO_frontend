import { IPaginatedRequest } from "../pagination";
import { IRaiderAccount } from "./raider.interface";
import { IRaiderTask } from "./task.interface";

export type ICreateRaid = {
	task_id: string
}

export type IApproveRaid = {
	raid_id: string
}

export type IRejectRaid = {
	raid_id: string
}

export type IGetRaid = {
	raid_id: string
}

export type IGetRaids = {
    task_id?: string;
	status: RaidTaskStatus
} & IPaginatedRequest

export type ICompleteRaid = {
	raid_id: string
    proofs: File[],
}

// Enums for TaskStatus and RaidType
export enum RaidTaskStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
}

export enum RaidApprovalStatus {
    WAITING = "WAITING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
}

// Type for Raid
export type IRaid = {
    id: string;
    assigner_id: string;
    assignee_id: string;
    account_id: string;
    account: IRaiderAccount;
    task_id: string;
    task: IRaiderTask; // Assuming RaiderTask is defined elsewhere
    timeline: number;
    approval_status: RaidApprovalStatus;
    task_status: RaidTaskStatus;
    proofs: string[];
    moderator_id?: string; // Optional, since it can be null
    moderator_expired_time: number;
    created_at: string; // ISO 8601 timestamp
    updated_at: string; // ISO 8601 timestamp
};

export type IRaidHandler = {
    old: IRaid,
    new: IRaid,
}

// Type for IMultipleRaid
export type IMultipleRaid = {
    total_raids: number;
    raids: IRaid[];
    has_next: boolean;
};
