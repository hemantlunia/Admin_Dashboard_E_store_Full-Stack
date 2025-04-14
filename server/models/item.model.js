import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
    invoiceDate: { type: String, required: true },
    itemCode: { type: String, required: true },
    itemName: { type: String, required: true },
    companyName: { type: String, required: true },
    hsnCode: { type: String, required: true },
    retailPrice: { type: Number, required: true },
    unit: { type: Number, required: true },
    quantity: { type: Number, required: true },
    discount: { type: Number, required: true },
    gst: { type: Number, required: true },
    cgst: { type: Number, required: true },
    sgst: { type: Number, required: true },
    amount: { type: Number, required: true },
    mrp:{type:Number,required:true},
    distributorPrice:{type:Number,required:true},
    wholesalePrice:{type:Number,required:true},
    cnfPrice:{type:Number,required:true}

  },{timestamps:true});

const Item = mongoose.model("Item",ItemSchema);
export default Item;


