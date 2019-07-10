import { Dish } from './Dish';

export interface Menu {
    category:string;
    dishes:Dish[];
}