export interface User {
    readonly twitchID: number;
    accessToken: string;
    canList?: boolean;
}