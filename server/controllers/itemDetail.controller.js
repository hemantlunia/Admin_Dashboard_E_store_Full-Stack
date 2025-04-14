import ItemDetail from "../models/itemDetail.model.js";

const itemDetailAdd = async (req, res) => {
 try {
     const { itemCode, itemName, companyName, quantity, hsnCode, gst } = req.body;
   
     if (!itemCode || !itemName || !companyName || !quantity || !hsnCode || !gst) {
       return res.status(400).json({
         success: false,
         message: "All fields required.",
       });
     }
   
     const newItemdetail = await ItemDetail.create({
       itemCode,
       itemName,
       companyName,
       quantity:Number(quantity),
       hsnCode,
       gst:Number(gst),
     });
     if (newItemdetail) {
       return res.status(201).json({
           success:true,
           message:"Itemdetail Added.",
           data:newItemdetail
       })
     }
 } catch (error) {
    return res.status(500).json({
        success:false,
        message:`Internal server error : ${error?.message}`,
    })
 }
};

const itemDetailUpdate = async (req, res) => {
    try {
        const {id} = req.params;
        const { itemCode, itemName, companyName, quantity, hsnCode, gst } = req.body;
       
        const updated = await ItemDetail.findByIdAndUpdate(id,{itemCode, itemName, companyName, quantity:Number(quantity), hsnCode, gst:Number(gst)},{new:true});
        return res.status(200).json({
            success:true,
            message:"Updated",
            data:updated
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`Internal server error : ${error?.message}`,
        })
    }
};

// Get all 
const AllItemDetail = async(req,res)=>{
    try {
        const AllItemdetails = await ItemDetail.find().sort({createdAt:-1});
        return res.status(200).json({
            success:true,
            data:AllItemdetails
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`Internal server error : ${error?.message}`,
        })
    }
}

export { itemDetailAdd, itemDetailUpdate, AllItemDetail };
