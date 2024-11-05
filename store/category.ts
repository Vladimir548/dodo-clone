import {create} from "zustand";

interface State {
    activeSlug: string | null;
    setActiveSlug: (activeId: string) => void;
}

export const useCategoryStore = create<State>()((set) => ({
    activeSlug: null,
    setActiveSlug: (activeSlug: string) => set({ activeSlug }),
}));