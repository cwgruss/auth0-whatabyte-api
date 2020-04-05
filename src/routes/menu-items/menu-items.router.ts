// ----------------------------------------
//  Menu Items Router: 
// ---
//  Saturday, April 04 2020
// ----------------------------------------
import express, { Request, Response } from 'express';
import * as MenuItemService from '../../core/menu-item/menu-items.service';
import { MenuItems } from '../../core/menu-item/menu-items.interface';
import { MenuItem } from '../../core/menu-item/menu-item.interface';
import { checkJwt } from '../../middleware/authorization/auth0.middleware';

/** Router Definition */
export const menuItemsRouter = express.Router();


/** Controller Definitions */

// ** GET items/
// ******************************************
menuItemsRouter.get('/', async(req: Request, res: Response) => {
    try {
        const items: MenuItems = await MenuItemService.findAll();
        res.status(200).send(items);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// ** GET items/:id
// ******************************************
menuItemsRouter.get('/:id', async(req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const item: MenuItem = await MenuItemService.find(id);
        res.status(200).send(item);
    } catch (e) {
        res.status(404).send(e.message);
    }
});


// # Authorization JWT
menuItemsRouter.use(checkJwt);


// ** POST items/
// ******************************************
menuItemsRouter.post('/', async(req: Request, res: Response) => {
    try {
        const item: MenuItem = req.body.item;
        await MenuItemService.create(item);
        res.sendStatus(201);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// ** PUT items/
// ******************************************
menuItemsRouter.put('/', async(req: Request, res: Response) => {
    try {
        const item: MenuItem = req.body.item;
        await MenuItemService.update(item);
        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// ** DELETE items/:id
// ******************************************
menuItemsRouter.delete('/:id', async(req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        await MenuItemService.remove(id);
        res.sendStatus(200);
    } catch (e) {
       res.status(500).send(e.message); 
    }
});
