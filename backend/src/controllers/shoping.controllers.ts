import { Bind, Controller, Get, HttpStatus, Post, Request, Response } from "@nestjs/common";
import express from "express";
import { ShoppingService } from "src/services/shopping.service";

@Controller()
export class ShoppingController {
    constructor(private readonly shopping: ShoppingService) { }

    @Get("/api/shopping")
    @Bind(Request(), Response())
    async getShoppingsAll(req: express.Request, res: express.Response) {
        const result = await this.shopping.getAllShoppings();
        res.status(result.status).json(result.msg);
    }

    @Post("/api/shopping")
    @Bind(Request(), Response())
    async create_shopping(req: express.Request, res: express.Response){
        const {id_proveedor, id_user, id_client, id_product, date_shop, name_article, ammount, ammount_unit, ammount_total} = req.body;

        if (!id_proveedor || !date_shop || !id_user || !id_client || !id_product || !name_article || !ammount || !ammount_unit || !ammount_total) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                error: "Missing required fields: id_proveedor, id_user, id_product, date_shop, name_article, ammount, ammount_unit, and ammount_total"
            });
        }

        const result = await this.shopping.createShopping(id_proveedor, id_product, id_user, id_client, date_shop, name_article, ammount, ammount_unit, ammount_total)
        res.status(await result.code).send(await result.msg);
    }
}