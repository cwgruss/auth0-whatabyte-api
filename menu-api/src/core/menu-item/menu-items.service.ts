// ========================================
// = Menu Service:  SUBTITLE           =
// ========================================

import { MenuItems } from "./menu-items.interface";
import { MenuItem } from "./menu-item.interface";

// ** In-Memory Store
// ******************************************
const items: MenuItems = {
    1: {
        id: 1,
        name: 'Burger',
        price: 5.99,
        description: 'A tasty, meaty sandwhich.',
        image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
    },
    2: {
        id: 2,
        name: "Pizza",
        price: 2.99,
        description: "Cheesy",
        image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
      },
      3: {
        id: 3,
        name: "Tea",
        price: 1.99,
        description: "Informative",
        image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png"
      }
}

// ** Service Methods
// ******************************************

/**
 * FindAll: Returns the entire store of menu items
 */
export const findAll = async(): Promise<MenuItems> => {
    return items;
};

/**
 * Find: Search for an individual menu item based on a 
 * menu id.
 * @param id
 */
export const find = async(id: number): Promise<MenuItem> => {
    const menuItem: MenuItem = items[id];
    if (!menuItem) {
        throw new Error(`No menu item found with id ${id}`);
    }

    return menuItem;
}

/**
 * Create: 
 * @param newItem 
 */
export const create = async(newItem: MenuItem): Promise<MenuItems> => {
    const id = new Date().valueOf();
    items[id] = {
        ...newItem,
        id
    };
    return items;
};

/**
 * Update: Receives a MenuItem to use as a new value in the list of items
 * @param updatedItem
 */
export const update = async(updatedItem: MenuItem): Promise<void> => {
    const id = updatedItem.id;
    let itemToUpdate = items[id];
    if (!itemToUpdate) {
        throw new Error(`No menu item found with id ${id}`);
    }

    items[id] = {
        ...itemToUpdate,
        ...updatedItem
    };
}

/**
 * Remove: Deletes a menu item from the dictionary of menu items
 * @param id 
 */
export const remove = async(id: number): Promise<MenuItem> => {
    const menuItem = items[id];
    if (!menuItem) {
        throw new Error(`No menu item found with id ${id}`);
    }

    delete items[id];
    return menuItem;
}

