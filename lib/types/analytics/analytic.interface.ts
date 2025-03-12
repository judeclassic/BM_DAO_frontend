export interface IAnalytic {
  total_uploaded: number; // Maps to int64
  total_pending: number;  // Maps to int64
  total_completed: number; // Maps to int64
}

export interface IAnalytics {
  id: string; // UUID as string
  user_id: string; // UUID as string
  total_uploaded: number; // Maps to int64
  total_pending: number;  // Maps to int64
  total_completed: number; // Maps to int64
  raiders: IAnalytic; // Embedded IAnalytic
  moderators: IAnalytic; // Embedded IAnalytic
  chat_engagers: IAnalytic; // Embedded IAnalytic
  collab_managers: IAnalytic; // Embedded IAnalytic
}

export interface IMultipleIAnalytics {
  total_users: number; // Total analytics count
  users: IAnalytics[]; // Array of IAnalytics
  has_next: boolean; // Pagination flag
}
