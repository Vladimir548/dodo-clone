import {IStoryItem} from "@/interface/interface-story-item";

export interface IStory {
    id: number;
    createdAt: Date;
    previewImage: string;
    items: IStoryItem[];
}