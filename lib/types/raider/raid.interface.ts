import { IRaiderAccount } from "./raider.interface";
import { IRaiderTask } from "./task.interface";

export type ICreateRaid = {
	task_id: string
}

// Enums for TaskStatus and RaidType
enum RaidTaskStatus {
    PENDING = "PENDING",
    STARTED = "STARTED",
    EXPIRED = "EXPIRED",
    COMPLETED = "COMPLETED",
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
    task_status: RaidTaskStatus;
    proofs: string[];
    moderator_id?: string; // Optional, since it can be null
    moderator_expired_time: number;
    created_at: string; // ISO 8601 timestamp
    updated_at: string; // ISO 8601 timestamp
};

// Type for IMultipleRaid
export type IMultipleRaid = {
    total_raids: number;
    raids: IRaid[];
    has_next: boolean;
};
