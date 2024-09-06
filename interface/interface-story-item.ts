import {IStory} from "@/interface/interface-story";

export interface IStoryItem {
    id: number;
    storyId: number;
    createdAt: Date;
    source: string;
    story: IStory;
}