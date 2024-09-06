export interface Story {
    id: number;
    createdAt: Date;
    previewImage: string;
    items: StoryItem[];
}


export interface StoryItem {
    id: number;
    storyId: number;
    createdAt: Date;
    source: string;
    story: Story;
}

export enum OrderStatus {
    PENDING = 'PENDING',
    SUCCEEDED = 'SUCCEEDED',
    CANCELLED = 'CANCELLED',
}

export enum TypeProduct {
    PIZZA = 'PIZZA',
    DRINKS = 'DRINKS',
    SNACKS = 'SNACKS',
    DESSERTS = 'DESSERTS',
    COMBO = 'COMBO',
    SAUCES = 'SAUCES',
}

export enum TypePizza {
    TRADITIONAL = 'TRADITIONAL',
    THIN = 'THIN',
}

export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
}