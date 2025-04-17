import Item from "../models/item.model.js";


const addItem = async (req, res) => {
  try {
    const items = req.body;
    const data = Array.isArray(items) ? items : [items];
    
    for (const item of data) {
      const requiredFields = [
        "invoiceDate",
        "invoiceNumber",
        "itemCode",
        "itemName",
        "companyName",
        "hsnCode",
        "retailPrice",
        "unit",
        "quantity",
        "discount",
        "gst",
        "cgst",
        "sgst",
        "amount",
        "mrp",
        "cnfPrice",
        "distributorPrice",
        "wholesalePrice"
      ];

      for (const field of requiredFields) {
        if (
          item[field] === undefined ||
          item[field] === null ||
          item[field].toString().trim() === ""
        ) {
          return res
            .status(400)
            .json({ message: `Missing field: ${field}`, success: false });
        }
      }

      item.invoiceNumber = parseInt(item.invoiceNumber);
      item.rate = parseFloat(item.rate);
      item.unit = parseFloat(item.unit);
      item.quantity = parseFloat(item.quantity);
      item.discount = parseFloat(item.discount);
      item.gst = parseFloat(item.gst);
      item.cgst = parseFloat(item.cgst);
      item.mrp = parseFloat(item.mrp);
      item.cnfPrice = parseFloat(item.cnfPrice);
      item.distributorPrice = parseFloat(item.distributorPrice);
      item.wholesalePrice = parseFloat(item.wholesalePrice);
      item.sgst = parseFloat(item.sgst);
      item.totalAmount = parseFloat(item.totalAmount);
    }

    // saving in db
    let savedItem;
    if (data.length === 1) {
      savedItem = await Item.insertOne(data[0]);
    } else {
      savedItem = await Item.insertMany(items);
    }
    // console.log("saved _Item : ", savedItem);

    return res.status(201).json({
      message: "Item added successfully",
      item: savedItem,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

//   Get item
const getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.status(200).json({ data: items, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// update item
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, unit, rate, totalAmount } = req.body;
    await Item.findByIdAndUpdate(
      id,
      { quantity, unit, rate, totalAmount },
      { new: true }
    );
    res.json({ success: true, message: "Item updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export { addItem, getItems, updateItem };
