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
    companyName: {
      type: String,
      trim: true,
      required: true,
    },
    quantity: {
      type: Number,
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
  },
  { timestamps: true }
);
const ItemDetail = mongoose.model("ItemDetail",itemdetailSchema);
export default ItemDetail;
