// Enums for RaidAction and TaskPriority
export enum RaidActionEnum {
    FOLLOW = "Follow Account",
    LIKE = "Like Post",
    COMMENT = "Retweet Post",
    RETWEET ="Comment on Post",
  }
  
export enum TaskPriorityEnum {
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW",
}
  
  // RaidTaskInformation model
export interface IRaidTaskInformation {
    id: number; // Primary key
    action: RaidActionEnum;
    raid_link: string;
    campaign_caption: string;
    amount: number;
    created_at: Date;
    updated_at: Date;
}
  
  // RaiderTask model
export interface IRaiderTask {
    id: string,
    user_id: string,
    available_raids: number,
    total_raids: number,
    completed_raids: number,
    approved_raids: number,
    raid_information: {
        id: string,
        action: RaidActionEnum,
        raid_link: string,
        campaign_caption: string,
        amount: number,
        created_at: Date,
        updated_at: Date
    },
    started_at: Date,
    ended_at: Date,
    updated_at: Date,
    created_at: Date,
    is_verified: boolean,
    level: TaskPriorityEnum,
    start_time_line: number,
    end_time_line: number,
    is_moderated: boolean,
    moderator_id?: string
}

export type ICreateRaidTask = {
    total_raids: number;
    raid_information: RaidTaskInformationRequest;
    level: TaskPriorityEnum;
    start_time: Date;
    end_time: Date;
};

export type IGetTask = {
    task_id: string;
};

export type RaidTaskInformationRequest = {
    action: RaidActionEnum;
    raid_link: string;
    campaign_caption: string;
};

export interface IMultipleRaiderTask {
    raider_tasks: IRaiderTask[],
    total_raider_tasks: number,
    has_next: boolean
}