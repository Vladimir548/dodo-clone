import {create} from "zustand";

interface State {
    activeId: number | null;
    setActiveId: (activeId: number) => void;
}

export const useCategoryStore = create<State>()((set) => ({
    activeId: null,
    setActiveId: (activeId: number) => set({ activeId }),
}));