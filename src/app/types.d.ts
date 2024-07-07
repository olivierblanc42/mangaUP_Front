import { Manga } from './types.d';

export type Author = {
    id: number;
    lastname: string;
    firstname: string;
    description: string;
    createdAt: Date;
};

export type Cart = {
    id: number;
    createdAt: Date;
    status: string;
    paymentCart: PaymentCart;
    user: User;
};

export type Category = {
    id: number;
    name: string; 
    description: string; 
    createdAt: Date; 
};

export type Comment = {
    id: number;
    rating: number;
    createdAt: Date;
    comment: string;
    user: User;
}


export type Gender = {
    id: number;
    label: string;
};

export type Genre = {
    id: number; 
    label: string; 
    createdDate: Date;
};

export type Manga = {
    id: number;
    title: string;
    releaseDate: Date;
    summary: string;
    createdAt: Date;
    price: number;
    pointFidelity: number;
    category: Category;
    authors: Author[];
    genres: Genre[];
    pictures: Picture[];
    users: User[];
};

export type OrdersStatus = {
    id: number;
    label: string;
};

export type PaymentCart = {
    id: number; 
    label: string; 
    createdAt: Date;
};

export type Picture = {
    id: number;
    img: string;
    isPoster: boolean;
    title: string;
}

export type User = {
    id: number; 
    username: string; 
    email: string; 
    password: string; 
    fisrtname: string; 
    lastname: string; 
    createdAt: Date; 
    img: string;
    address: Address; 
    gender: Gender;
};

export type DataManga = {
    comments: Comment[];
    manga: Manga;
}

export type DataUser = {
    user: User;
    mangasId: number[];

}