import mongoose from "mongoose";

const itemdetailSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      trim: true,
      required: true,
    },
    itemCode: {
      type: String,
      trim: true,
      required: true,
    },
    brandName: {
      type: String,
      trim: true,
      required: true,
    },
    cnf: {
      type: Number,
      trim: true,
      required: true,
    },
    cnfMargin: {
      type: String,
      trim: true,
      required: true,
    },
    hsnCode: {
      type: String,
      trim: true,
      required: true,
    },
    gst: {
      type: Number,
      trim: true,
      required: true,
    },
    distributor: {
      type: String,
      trim: true,
      required: true,
    },
    distributorMargin: {
      type: Number,
      trim: true,
      required: true,
    },
    retailer: {
      type: Number,
      trim: true,
      required: true,
    },
    retailerMargin: {
      type: Number,
      trim: true,
      required: true,
    },
    mrp: {
      type: Number,
      trim: true,
      required: true,
    },
    wholesale: {
      type: Number,
      trim: true,
      required: true,
    },
    unit: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);
const ItemDetail = mongoose.model("ItemDetail",itemdetailSchema);
export default ItemDetail;
