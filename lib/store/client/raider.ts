import { IMultipleRaiderTask, IRaiderTask } from "@/lib/types/raider/task.interface";
import { create } from "zustand";

interface RaiderTaskData {
  currentTask?: IRaiderTask;
  raiderTasks: IMultipleRaiderTask;
}

interface RaiderTaskStore extends RaiderTaskData {
    setCurrentTask: (currentTask: IRaiderTask) => void;
    setRaiderTask: (raiderTask: IMultipleRaiderTask) => void;
    updateRaiderTask: (raiderTask: IRaiderTask) => void;
    clearRaiderTask: () => void;
}

export const useRaiderTaskStore = create<RaiderTaskStore>((set) => ({
    raiderTasks: {
        raider_tasks: [],
        total_raider_tasks: 0,
        has_next: false
    },
    setCurrentTask: (currentTask) => set((state) => ({ ...state, currentTask })),
    setRaiderTask: (raiderTasks) => set((state) => ({ ...state, raiderTasks })),
    updateRaiderTask: (raiderTask) => set((state) => {
        return { ...state, raiderTasks: { ...state.raiderTasks, raider_tasks: [raiderTask, ...state.raiderTasks?.raider_tasks ] }};
    }),
    clearRaiderTask: () => set((state) => ({ ...state, raiderTask: undefined })),
}));