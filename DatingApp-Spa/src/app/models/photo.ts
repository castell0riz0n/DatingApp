export interface Photo {
    id: number;
    url: string;
    description: string;
    dateAdded: Date;
    isMain: boolean;
    isApproved: boolean;
}

export interface PhotoUrls {
    small: string;
    medium: string;
    big: string;
    description: string;
}
