import ItemDetail from "../models/itemDetail.model.js";

const itemDetailAdd = async (req, res) => {
  try {
    const {
      itemCode,
      itemName,
      brandName,
      hsnCode,
      gst,
      unit,
      cnf,
      cnfMargin,
      distributorMargin,
      distributor,
      retailerMargin,
      retailer,
      mrp,
      wholesale,
    } = req.body;

    if (
      !itemCode ||
      !itemName ||
      !brandName ||
      !unit ||
      !hsnCode ||
      !gst ||
      !cnf ||
      !cnfMargin ||
      !distributor ||
      !distributorMargin ||
      !retailer ||
      !retailerMargin ||
      !mrp ||
      !wholesale
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields required.",
      });
    }

    const newItemdetail = await ItemDetail.create({
      itemCode,
      itemName,
      brandName,
      hsnCode,
      gst: Number(gst),
      unit,
      cnf: Number(cnf),
      cnfMargin: Number(cnfMargin),
      distributorMargin: Number(distributorMargin),
      distributor: Number(distributor),
      retailerMargin: Number(retailerMargin),
      retailer: Number(retailer),
      mrp: Number(mrp),
      wholesale: Number(wholesale),
    });
    if (newItemdetail) {
      return res.status(201).json({
        success: true,
        message: "Itemdetail Added.",
        data: newItemdetail,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error : ${error?.message}`,
    });
  }
};

const itemDetailUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      itemCode,
      itemName,
      brandName,
      hsnCode,
      gst,
      unit,
      cnf,
      cnfMargin,
      distributorMargin,
      distributor,
      retailerMargin,
      retailer,
      mrp,
      wholesale,
    } = req.body;

    const updateddata = {
      itemCode,
      itemName,
      brandName,
      hsnCode,
      gst: Number(gst),
      unit,
      cnf: Number(cnf),
      cnfMargin: Number(cnfMargin),
      distributorMargin: Number(distributorMargin),
      distributor: Number(distributor),
      retailerMargin: Number(retailerMargin),
      retailer: Number(retailer),
      mrp: Number(mrp),
      wholesale: Number(wholesale),
    };

    const updated = await ItemDetail.findByIdAndUpdate(id, updateddata, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      message: "Updated",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error : ${error?.message}`,
    });
  }
};

// Get all
const AllItemDetail = async (req, res) => {
  try {
    const AllItemdetails = await ItemDetail.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: AllItemdetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error : ${error?.message}`,
    });
  }
};

export { itemDetailAdd, itemDetailUpdate, AllItemDetail };
