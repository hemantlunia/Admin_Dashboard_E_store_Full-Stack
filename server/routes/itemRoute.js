import express from "express";
import { addItem, getItems, updateItem } from "../controllers/item.controller.js";

const ItemRouter = express.Router();

ItemRouter.post("/add",addItem);
ItemRouter.get("/get",getItems);
ItemRouter.put("/update/:id",updateItem);

export default ItemRouter;