import { Item } from './item';

export interface ShopCartItem {
    id: string;
    item: Item;
    amount: number;
}
