import { IMultipleRaid, IRaid } from "@/lib/types/raider/raid.interface";
import { IMultipleRaiderTask, IRaiderTask } from "@/lib/types/raider/task.interface";
import { create } from "zustand";

interface RaiderTaskData {
  currentRaid?: IRaid;
  raids: IMultipleRaid;
}

interface RaiderTaskStore extends RaiderTaskData {
    setCurrentRaid: (currentRaid?: IRaid) => void;
    setRaids: (raids: IMultipleRaid) => void;
    updateRaiderTask: (raid: IRaid) => void;
    clearRaiderTask: () => void;
}

export const useRaidStore = create<RaiderTaskStore>((set) => ({
    raids: {
        raids: [],
        total_raids: 0,
        has_next: false
    },
    setCurrentRaid: (currentRaid) => set((state) => ({ ...state, currentRaid })),
    setRaids: (raids) => set((state) => ({ ...state, raids })),
    updateRaiderTask: (raid) => set((state) => {
        return { ...state, raiderTasks: { ...state.raids, raider_tasks: [raid, ...state.raids?.raids ] }};
    }),
    clearRaiderTask: () => set((state) => ({ ...state, raiderTask: undefined })),
}));