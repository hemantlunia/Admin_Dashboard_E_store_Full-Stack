/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import handlePdfMaker from "../constants/PdfMaker";

const AddPurchase = () => {
  let BACKEND_URL = import.meta.env.VITE_MODE ==="development" ? "http://localhost:8080/api":"/api"

  const [items, setItems] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [formData, setFormData] = useState({
    invoiceDate: "",
    invoiceNumber: "",
    itemCode: "",
    itemName: "",
    companyName: "",
    hsnCode: "",
    retailPrice: "",
    distributorPrice:"",
    wholesalePrice:"",
    unit: "",
    quantity: "",
    discount: "",
    gst: "",
    cgst: "",
    sgst: "",
    mrp:"",
    amount: "",
  });

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB");
    setFormData((prev) => ({
      ...prev,
      invoiceDate: formattedDate,
    }));

    axios
      .get(`${BACKEND_URL}/itemdetails/get`)
      .then((res) => setItemList(res?.data?.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "itemCode") {
      const selected = itemList.find((item) => item.itemCode === value);
      if (selected) {
        setFormData((prev) => ({
          ...prev,
          itemCode: value,
          itemName: selected.itemName,
          companyName: selected.companyName,
          hsnCode: selected.hsnCode,
          gst: selected.gst,
          quantity: selected.quantity,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          itemCode: value,
          itemName: "",
          companyName: "",
          hsnCode: "",
          gst: "",
          quantity: "",
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  useEffect(() => {
    const retailPrice = parseFloat(formData.retailPrice) || 0;
    const quantity = parseFloat(formData.quantity) || 0;
    const discount = parseFloat(formData.discount) || 0;
    const gst = parseFloat(formData.gst) || 0;

    let total = retailPrice * quantity;
    total -= (total * discount) / 100;
    const gstAmount = (total * gst) / 100;
    const finalTotal = total + gstAmount;

    setFormData((prev) => ({
      ...prev,
      amount: finalTotal.toFixed(2),
      cgst: (gstAmount / 2).toFixed(2),
      sgst: (gstAmount / 2).toFixed(2),
    }));
  }, [formData.retailPrice, formData.quantity, formData.discount]);

  const handleAddItem = () => {
    if (formData.itemCode && formData.itemName && formData.companyName) {
      setItems([...items, { ...formData, invoiceNumber: Date.now() }]);
      setFormData((prev) => ({
        ...prev,
        invoiceNumber: "",
        itemCode: "",
        itemName: "",
        companyName: "",
        hsnCode: "",
        retailPrice: "",
        unit: "",
        quantity: "",
        discount: "",
        gst: "",
        cgst: "",
        sgst: "",
        amount: "",
        distributorPrice:"",
        wholesalePrice:"",
        cnfPrice:"",
        mrp:""
      }));
    } else {
      alert("Please fill all required fields!");
    }
  };

  const handleSubmit = async () => {
    if (items.length === 0) {
      alert("No items to submit!");
      return;
    }

    try {
        // console.log(items);
        
      await axios.post(`${BACKEND_URL}/add`, items, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      alert("Items added successfully!");
      setItems([]);
    } catch (error) {
      console.error("Error adding items:", error);
    }
  };

  const calculateTotal = (retailPrice, quantity, discount, gst) => {
    let total = retailPrice * quantity;
    total -= (total * discount) / 100;
    const gstAmount = (total * gst) / 100;
    return {
      amount: (total + gstAmount).toFixed(2),
      cgst: (gstAmount / 2).toFixed(2),
      sgst: (gstAmount / 2).toFixed(2),
    };
  };

  const handleEditItem = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    const retailPrice = parseFloat(updatedItems[index].retailPrice) || 0;
    const quantity = parseFloat(updatedItems[index].quantity) || 0;
    const discount = parseFloat(updatedItems[index].discount) || 0;
    const gst = parseFloat(updatedItems[index].gst) || 0;

    const { amount, cgst, sgst } = calculateTotal(retailPrice, quantity, discount, gst);

    updatedItems[index].amount = amount;
    updatedItems[index].cgst = cgst;
    updatedItems[index].sgst = sgst;

    setItems(updatedItems);
  };

  // remove item in preview
  const handleDeleteItem = (indexToRemove) => {
    setItems((prevItems) => prevItems.filter((_, idx) => idx !== indexToRemove));
  };


  return (

    <div className="p-4 w-full max-w-[1600px] mx-auto">
  <form className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-gradient-to-br from-gray-600 via-gray-400 to-gray-600 p-6 shadow-2xl rounded-2xl backdrop-blur-md">
    {[
      { label: "Invoice Date", name: "invoiceDate", disabled: true, type: "text" },
      { label: "Invoice Number", name: "invoiceNumber", disabled: true, type: "text" },
      { label: "Item Code", name: "itemCode", type: "text" },
      { label: "Item Name", name: "itemName", disabled: true, type: "text" },
      { label: "Company Name", name: "companyName", disabled: true, type: "text" },
      { label: "HSN Code", name: "hsnCode", type: "text" },
      { label: "Retail Price", name: "retailPrice", type: "number" },
      { label: "Distributor Price", name: "distributorPrice", type: "number" },
      { label: "Wholesale Price", name: "wholesalePrice", type: "number" },
      { label: "CNF Price", name: "cnfPrice", type: "number" },
      { label: "Unit", name: "unit", type: "number" },
      { label: "Quantity", name: "quantity", type: "number" },
      { label: "Discount (%)", name: "discount", type: "number" },
      { label: "GST (%)", name: "gst", type: "number", disabled: true },
      { label: "CGST(%)", name: "cgst", disabled: true, type: "number" },
      { label: "SGST(%)", name: "sgst", disabled: true, type: "number" },
      { label: "MRP", name: "mrp", disabled: false, type: "number" },
      { label: "Amount", name: "amount", disabled: true, type: "number" },
      
    ].map(({ label, name, disabled, type }) => (
      <div key={name} className="relative">
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          disabled={disabled}
          placeholder=" "
          className={`${disabled == true ? "bg-gray-300":"bg-white"} border-2 border-gray-300  backdrop-blur-sm rounded-xl w-full px-4 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-purple-500 peer transition-all`}
        />
        <label className="absolute top-2 left-4 text-gray-600 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm">
          {label}
        </label>
      </div>
    ))}
  </form>

  <div className="flex justify-end mt-4">
    <button
      onClick={handleAddItem}
      className="w-36 bg-gradient-to-r from-green-300 to-green-500 hover:from-green-400 hover:to-green-700 text-white font-semibold py-2 rounded-xl transition-all shadow-md hover:scale-105"
    >
      Preview
    </button>
  </div>

  {items.length > 0 && (
    <>
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handlePdfMaker(items)}
          className="bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-700 hover:to-emerald-600 text-white font-medium py-2 px-6 rounded-xl shadow-md transition-all hover:scale-105"
        >
          Download PDF
        </button>
      </div>

      <div className="mt-4 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg overflow-x-auto">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-purple-500 text-gray-800 font-semibold">
            <tr>
              {[
                "Sr.No", "Invoice No", "Date", "Item Code", "itemName", "Company", "HSN",
                "Retail Price","Distributor Price","Wholesale Price", "CNF Price","Unit", "Qty", "Discount", "GST", "CGST", "SGST","MRP", "Amount", "Action"
              ].map((head, idx) => (
                <th key={idx} className="p-2 border border-gray-300 text-center">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="hover:bg-green-400 transition">
                <td className="p-2 border text-center">{index + 1}</td>
                <td className="p-2 border text-center">{item.invoiceNumber}</td>
                <td className="p-2 border text-center">{item.invoiceDate}</td>
                <td className="p-2 border text-center">{item.itemCode}</td>
                <td className="p-2 border text-center">{item.itemName}</td>
                <td className="p-2 border text-center">{item.companyName}</td>
                <td className="p-2 border text-center">{item.hsnCode}</td>
                <td className="p-2 border">
                  <input
                    type="number"
                    value={item.retailPrice}
                    onChange={(e) => handleEditItem(index, "retailPrice", e.target.value)}
                    className="w-20 px-2 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="number"
                    value={item.distributorPrice}
                    onChange={(e) => handleEditItem(index, "distributorPrice", e.target.value)}
                    className="w-20 px-2 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="number"
                    value={item.wholesalePrice}
                    onChange={(e) => handleEditItem(index, "wholesalePrice", e.target.value)}
                    className="w-20 px-2 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="number"
                    value={item.cnfPrice}
                    onChange={(e) => handleEditItem(index, "cnfPrice", e.target.value)}
                    className="w-20 px-2 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="number"
                    value={item.unit}
                    onChange={(e) => handleEditItem(index, "unit", e.target.value)}
                    className="w-20 px-2 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleEditItem(index, "quantity", e.target.value)}
                    className="w-20 px-2 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="number"
                    value={item.discount}
                    onChange={(e) => handleEditItem(index, "discount", e.target.value)}
                    className="w-20 px-2 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="number"
                    value={item.gst}
                    disabled={true}
                    onChange={(e) => handleEditItem(index, "gst", e.target.value)}
                    className=" w-20 px-2 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </td>
                <td className="p-2 border text-center">{item.cgst}</td>
                <td className="p-2 border text-center">{item.sgst}</td>
                <td className="p-2 border">
                  <input
                    type="number"
                    value={item.mrp}
                    disabled={false}
                    onChange={(e) => handleEditItem(index, "mrp", e.target.value)}
                    className=" w-20 px-2 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </td>
                <td className="p-2 border text-center font-semibold text-gray-800">{item.amount}</td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => handleDeleteItem(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow transition-transform duration-300 hover:scale-105"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-sky-400 to-red-600 hover:from-blue-600 hover:to-green-500 text-white text-pretty px-6 py-2 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
          >
            Add
          </button>
        </div>
      </div>
    </>
  )}
</div>

  );
};

export default AddPurchase;



// import { useState, useEffect } from "react";
// import axios from "axios";

// const AddPurchase = () => {
//   const [items, setItems] = useState([]);
//   const [itemList, setItemList] = useState([]);
//   const [formData, setFormData] = useState({
//     invoiceDate: "",
//     invoiceNumber: "",
//     itemCode: "",
//     itemName: "",
//     companyName: "",
//     hsnCode: "",
//     rate: "",
//     unit: "",
//     quantity: "",
//     discount: "",
//     gst: "",
//     cgst: "",
//     sgst: "",
//     totalAmount: "",
//   });

//   useEffect(() => {
//     const today = new Date();
//     const formattedDate = today.toLocaleDateString("en-GB");
//     setFormData((prev) => ({
//       ...prev,
//       invoiceDate: formattedDate,
//     }));

//     axios
//       .get("http://localhost:8080/api/itemdetails/get")
//       .then((res) => setItemList(res?.data?.data))
//       .catch((err) => console.error("Fetch error:", err));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "itemCode") {
//       const selected = itemList.find((item) => item.itemCode === value);
//       if (selected) {
//         setFormData((prev) => ({
//           ...prev,
//           itemCode: value,
//           itemName: selected.itemName,
//           companyName: selected.companyName,
//           hsnCode: selected.hsnCode,
//           gst: selected.gst,
//           quantity: selected.quantity,
//         }));
//       } else {
//         setFormData((prev) => ({
//           ...prev,
//           itemCode: value,
//           itemName: "",
//           companyName: "",
//           hsnCode: "",
//           gst: "",
//           quantity: "",
//         }));
//       }
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   useEffect(() => {
//     const rate = parseFloat(formData.rate) || 0;
//     const qty = parseFloat(formData.quantity) || 0;
//     const discount = parseFloat(formData.discount) || 0;
//     const gst = parseFloat(formData.gst) || 0;

//     let total = rate * qty;
//     total -= (total * discount) / 100;
//     const gstAmt = (total * gst) / 100;
//     const finalTotal = total + gstAmt;

//     setFormData((prev) => ({
//       ...prev,
//       totalAmount: finalTotal.toFixed(2),
//       cgst: (gstAmt / 2).toFixed(2),
//       sgst: (gstAmt / 2).toFixed(2),
//     }));
//   }, [formData.rate, formData.quantity, formData.discount, formData.gst]);

//   const handleAddItem = () => {
//     if (formData.itemCode && formData.itemName) {
//       setItems([...items, { ...formData, invoiceNumber: Date.now() }]);
//       setFormData({
//         invoiceDate: formData.invoiceDate,
//         invoiceNumber: "",
//         itemCode: "",
//         itemName: "",
//         companyName: "",
//         hsnCode: "",
//         rate: "",
//         unit: "",
//         quantity: "",
//         discount: "",
//         gst: "",
//         cgst: "",
//         sgst: "",
//         totalAmount: "",
//       });
//     } else {
//       alert("Fill all required fields");
//     }
//   };

//   const calculateTotal = (rate, quantity, discount, gst) => {
//     let total = rate * quantity;
//     total -= (total * discount) / 100;
//     const gstAmt = (total * gst) / 100;
//     return {
//       totalAmount: (total + gstAmt).toFixed(2),
//       cgst: (gstAmt / 2).toFixed(2),
//       sgst: (gstAmt / 2).toFixed(2),
//     };
//   };

//   const handleEditItem = (index, field, value) => {
//     const updatedItems = [...items];
//     updatedItems[index][field] = value;

//     const rate = parseFloat(updatedItems[index].rate) || 0;
//     const qty = parseFloat(updatedItems[index].quantity) || 0;
//     const discount = parseFloat(updatedItems[index].discount) || 0;
//     const gst = parseFloat(updatedItems[index].gst) || 0;

//     const totals = calculateTotal(rate, qty, discount, gst);
//     updatedItems[index].totalAmount = totals.totalAmount;
//     updatedItems[index].cgst = totals.cgst;
//     updatedItems[index].sgst = totals.sgst;

//     setItems(updatedItems);
//   };

//   const handleDeleteItem = (index) => {
//     setItems((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async () => {
//     if (!items.length) return alert("Add items first");

//     try {
//       await axios.post("http://localhost:8080/api/add", items, {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true,
//       });
//       alert("Items added successfully");
//       setItems([]);
//     } catch (err) {
//       console.error("Submission error:", err);
//     }
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Add Purchase</h2>

//       {/* --- Form Section --- */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white p-4 rounded shadow">
//         <input
//           type="text"
//           name="itemCode"
//           placeholder="Item Code"
//           className="input input-bordered"
//           value={formData.itemCode}
//           onChange={handleChange}
//         />

//         <input
//           type="text"
//           name="itemName"
//           placeholder="Item Name"
//           className="input input-bordered bg-gray-100"
//           value={formData.itemName}
//           readOnly
//         />

//         <select
//           name="companyName"
//           className="input input-bordered"
//           value={formData.companyName}
//           onChange={handleChange}
//         >
//           <option value="">Select Company</option>
//           {[...new Set(itemList.map((i) => i.companyName))].map((name) => (
//             <option key={name} value={name}>
//               {name}
//             </option>
//           ))}
//         </select>

//         <select
//           name="hsnCode"
//           className="input input-bordered"
//           value={formData.hsnCode}
//           onChange={handleChange}
//         >
//           <option value="">Select HSN</option>
//           {[...new Set(itemList.map((i) => i.hsnCode))].map((hsn) => (
//             <option key={hsn} value={hsn}>
//               {hsn}
//             </option>
//           ))}
//         </select>

//         <input
//           type="number"
//           name="rate"
//           placeholder="Rate"
//           className="input input-bordered"
//           value={formData.rate}
//           onChange={handleChange}
//         />

//         <input
//           type="text"
//           name="unit"
//           placeholder="Unit"
//           className="input input-bordered"
//           value={formData.unit}
//           onChange={handleChange}
//         />

//         <input
//           type="number"
//           name="quantity"
//           placeholder="Quantity"
//           className="input input-bordered"
//           value={formData.quantity}
//           onChange={handleChange}
//         />

//         <input
//           type="number"
//           name="discount"
//           placeholder="Discount (%)"
//           className="input input-bordered"
//           value={formData.discount}
//           onChange={handleChange}
//         />

//         <input
//           type="number"
//           name="gst"
//           placeholder="GST (%)"
//           className="input input-bordered"
//           value={formData.gst}
//           onChange={handleChange}
//         />

//         <input
//           type="text"
//           name="cgst"
//           placeholder="CGST"
//           className="input input-bordered bg-gray-100"
//           value={formData.cgst}
//           readOnly
//         />

//         <input
//           type="text"
//           name="sgst"
//           placeholder="SGST"
//           className="input input-bordered bg-gray-100"
//           value={formData.sgst}
//           readOnly
//         />

//         <input
//           type="text"
//           name="totalAmount"
//           placeholder="Total Amount"
//           className="input input-bordered bg-gray-100"
//           value={formData.totalAmount}
//           readOnly
//         />
//       </div>

//       <div className="flex justify-between mt-4">
//         <button onClick={handleAddItem} className="btn btn-primary">
//           Preview
//         </button>
//         <button onClick={handleSubmit} className="btn btn-success">
//           Add
//         </button>
//       </div>

//       {/* --- Preview Table --- */}
//       {items.length > 0 && (
//         <div className="mt-6 overflow-x-auto">
//           <table className="table w-full border">
//             <thead>
//               <tr>
//                 <th>Item Code</th>
//                 <th>Item Name</th>
//                 <th>Company</th>
//                 <th>HSN</th>
//                 <th>Rate</th>
//                 <th>Unit</th>
//                 <th>Qty</th>
//                 <th>Discount</th>
//                 <th>GST</th>
//                 <th>CGST</th>
//                 <th>SGST</th>
//                 <th>Total</th>
//                 <th></th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((item, idx) => (
//                 <tr key={idx}>
//                   <td>{item.itemCode}</td>
//                   <td>{item.itemName}</td>
//                   <td>{item.companyName}</td>
//                   <td>{item.hsnCode}</td>
//                   <td>
//                     <input
//                       type="number"
//                       value={item.rate}
//                       onChange={(e) => handleEditItem(idx, "rate", e.target.value)}
//                       className="input input-sm"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       value={item.unit}
//                       onChange={(e) => handleEditItem(idx, "unit", e.target.value)}
//                       className="input input-sm"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="number"
//                       value={item.quantity}
//                       onChange={(e) => handleEditItem(idx, "quantity", e.target.value)}
//                       className="input input-sm"
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="number"
//                       value={item.discount}
//                       onChange={(e) => handleEditItem(idx, "discount", e.target.value)}
//                       className="input input-sm"
//                     />
//                   </td>
//                   <td>{item.gst}</td>
//                   <td>{item.cgst}</td>
//                   <td>{item.sgst}</td>
//                   <td>{item.totalAmount}</td>
//                   <td>
//                     <button
//                       onClick={() => handleDeleteItem(idx)}
//                       className="btn btn-xs btn-error"
//                     >
//                       ❌
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddPurchase;




























// import { useState, useEffect } from "react";
// import axios from "axios";

// const AddPurchase = () => {
//   const [items, setItems] = useState([]);
//   const [companyNames, setCompanyNames] = useState([]);
//   const [hsnCodes, setHsnCodes] = useState([]);
//   const [formData, setFormData] = useState({
//     itemCode: "",
//     itemName: "",
//     companyName: "",
//     quantity: "",
//     hsnCode: "",
//     gst: "",
//     invoiceDate: "",
//     price: "",
//     discount: "",
//     total: "",
//     cgst: "",
//     sgst: "",
//     finalAmount: ""
//   });

//   const [previewItems, setPreviewItems] = useState([]);

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const fetchItems = async () => {
//     const res = await axios.get("http://localhost:8080/api/itemdetails/get");
//     setItems(res?.data?.data);
//     setCompanyNames([...new Set(res?.data?.data?.map(item => item.companyName))]);
//     setHsnCodes([...new Set(res?.data?.data?.map(item => item.hsnCode))]);
//   };

//   const handleItemCodeChange = (e) => {
//     const itemCode = e.target.value;
//     const matched = items.find(i => i.itemCode === itemCode);
//     if (matched) {
//       setFormData(prev => ({
//         ...prev,
//         itemCode: matched.itemCode,
//         itemName: matched.itemName,
//         companyName: matched.companyName,
//         quantity: matched.quantity,
//         hsnCode: matched.hsnCode,
//         gst: matched.gst
//       }));
//     } else {
//       setFormData(prev => ({ ...prev, itemCode }));
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const calculateFields = (data) => {
//     const quantity = parseFloat(data.quantity) || 0;
//     const price = parseFloat(data.price) || 0;
//     const discount = parseFloat(data.discount) || 0;
//     const total = quantity * price;
//     const afterDiscount = total - (total * discount) / 100;
//     const gst = parseFloat(data.gst) || 0;
//     const gstAmount = (afterDiscount * gst) / 100;
//     const cgst = gstAmount / 2;
//     const sgst = gstAmount / 2;
//     const finalAmount = afterDiscount + gstAmount;

//     return {
//       ...data,
//       total: total.toFixed(2),
//       cgst: cgst.toFixed(2),
//       sgst: sgst.toFixed(2),
//       finalAmount: finalAmount.toFixed(2)
//     };
//   };

//   const handleAddPreview = (e) => {
//     e.preventDefault();
//     const filled = Object.values(formData).every(val => val !== "");
//     if (!filled) return alert("Please fill all fields");

//     const calculated = calculateFields(formData);
//     setPreviewItems([...previewItems, calculated]);

//     // reset only editable fields
//     setFormData(prev => ({
//       ...prev,
//       itemCode: "",
//       invoiceDate: "",
//       price: "",
//       discount: "",
//       total: "",
//       cgst: "",
//       sgst: "",
//       finalAmount: ""
//     }));
//   };

//   const handlePreviewChange = (index, field, value) => {
//     const updated = [...previewItems];
//     updated[index] = calculateFields({ ...updated[index], [field]: value });
//     setPreviewItems(updated);
//   };

//   const handleSubmit = async () => {
//     if (previewItems.length === 0) return alert("No items to submit");
//     await axios.post("/api/invoices", previewItems); // Adjust API
//     alert("All Items Submitted!");
//     setPreviewItems([]);
//   };

//   return (
//     <div className="p-4 max-w-6xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-center">Invoice Form</h2>

//       <form
//         onSubmit={handleAddPreview}
//         className="grid md:grid-cols-3 gap-4 sm:grid-cols-1 mb-6"
//       >
//         <input type="text" name="itemCode" value={formData.itemCode} onChange={handleItemCodeChange} placeholder="Item Code" className="border p-2 rounded" />
//         <input type="text" value={formData.itemName} readOnly placeholder="Item Name" className="border p-2 rounded bg-gray-100" />
        
//         <select name="companyName" value={formData.companyName} onChange={handleChange} className="border p-2 rounded">
//           <option value="">Select Company</option>
//           {companyNames.map(name => <option key={name} value={name}>{name}</option>)}
//         </select>

//         <select name="hsnCode" value={formData.hsnCode} onChange={handleChange} className="border p-2 rounded">
//           <option value="">Select HSN</option>
//           {hsnCodes.map(hsn => <option key={hsn} value={hsn}>{hsn}</option>)}
//         </select>

//         <input type="number" value={formData.quantity} name="quantity" readOnly placeholder="Quantity" className="border p-2 rounded bg-gray-100" />
//         <input type="number" value={formData.gst} name="gst" readOnly placeholder="GST" className="border p-2 rounded bg-gray-100" />

//         <input type="date" value={formData.invoiceDate} name="invoiceDate" onChange={handleChange} className="border p-2 rounded" />
//         <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="border p-2 rounded" />
//         <input type="number" name="discount" value={formData.discount} onChange={handleChange} placeholder="Discount (%)" className="border p-2 rounded" />

//         <button type="submit" className="md:col-span-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add to Preview</button>
//       </form>

//       {previewItems.length > 0 && (
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm text-left border">
//             <thead className="bg-gray-100 font-semibold">
//               <tr>
//                 <th>Item Code</th>
//                 <th>Item Name</th>
//                 <th>Company</th>
//                 <th>HSN</th>
//                 <th>Qty</th>
//                 <th>GST</th>
//                 <th>Date</th>
//                 <th>Price</th>
//                 <th>Discount</th>
//                 <th>Total</th>
//                 <th>CGST</th>
//                 <th>SGST</th>
//                 <th>Final</th>
//               </tr>
//             </thead>
//             <tbody>
//               {previewItems.map((item, i) => (
//                 <tr key={i} className="border-t">
//                   <td>{item.itemCode}</td>
//                   <td>{item.itemName}</td>
//                   <td>{item.companyName}</td>
//                   <td>{item.hsnCode}</td>
//                   <td>{item.quantity}</td>
//                   <td>{item.gst}%</td>

//                   <td>
//                     <input type="date" value={item.invoiceDate} onChange={(e) => handlePreviewChange(i, "invoiceDate", e.target.value)} className="border p-1 rounded w-28" />
//                   </td>
//                   <td>
//                     <input type="number" value={item.price} onChange={(e) => handlePreviewChange(i, "price", e.target.value)} className="border p-1 rounded w-20" />
//                   </td>
//                   <td>
//                     <input type="number" value={item.discount} onChange={(e) => handlePreviewChange(i, "discount", e.target.value)} className="border p-1 rounded w-16" />
//                   </td>
//                   <td>{item.total}</td>
//                   <td>{item.cgst}</td>
//                   <td>{item.sgst}</td>
//                   <td className="font-semibold">{item.finalAmount}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="mt-4 text-center">
//             <button onClick={handleSubmit} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
//               Submit All
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddPurchase;



