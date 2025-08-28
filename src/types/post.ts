export interface Post {
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    caption: string;
    distance: number;
    duration: number;
    pace: number;
    route?: string; // URL to route the image/map
    likes: number;
    comments: number;
    timestamp: Date;
}