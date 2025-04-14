import express from "express";
import { AllItemDetail, itemDetailAdd, itemDetailUpdate } from "../controllers/itemDetail.controller.js";

const ItemDetailRouter = express.Router();

ItemDetailRouter.post("/add",itemDetailAdd);
ItemDetailRouter.put("/update/:id",itemDetailUpdate);
ItemDetailRouter.get("/get",AllItemDetail);



export default ItemDetailRouter;