import axios from "axios";
import { useState, useEffect } from "react";
import {debounce} from "lodash";

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");  //for debouceee
  const [searchInputTerm, setSearchInputTerm] = useState("");   //instant value

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/get");
        const resdata = res?.data?.data;
        setItems(resdata);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const debounced = debounce(() => {
      setSearchTerm(searchInputTerm);
    }, 500); 
  
    debounced();
  
    return () => {
      debounced.cancel();
    };
  }, [searchInputTerm]);

  const handleChange = (id, field, value) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id
          ? {
              ...item,
              [field]: value,
              totalAmount: calculateTotal(item, field, value),
            }
          : item
      )
    );
  };
  

  const calculateTotal = (item, field, value) => {
    const updatedItem = { ...item, [field]: value };
    const { rate, quantity, discount, gst, cgst, sgst } = updatedItem;

    const numericRate = parseFloat(rate) || 0;
    const numericQuantity = parseFloat(quantity) || 0;
    const numericDiscount = parseFloat(discount) || 0;
    const numericGST = parseFloat(gst) || 0;
    const numericCGST = parseFloat(cgst) || 0;
    const numericSGST = parseFloat(sgst) || 0;

    let total = numericRate * numericQuantity;
    total -= (total * numericDiscount) / 100;
    total += (total * numericGST) / 100;
    total += (total * numericCGST) / 100;
    total += (total * numericSGST) / 100;

    return total.toFixed(2);
  };

  const handleUpdate = async (item) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/update/${item._id}`,
        {
          quantity: item.quantity,
          unit: item.unit,
          rate: item.rate,
          totalAmount: item.totalAmount,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        // console.log("updated");
        
        alert("Item updated successfully!");
      }
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item.");
    }
  };

  const filteredItems = items.filter((item) =>
    `${item.invoiceNumber} ${item.companyName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-purple-700 p-6 rounded-lg shadow-md">

      {/* 🔍 Search Box */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by Invoice No. or Company Name..."
          value={searchInputTerm}
          onChange={(e) => setSearchInputTerm(e.target.value)}
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredItems.length === 0 ? (
        <p className="text-white font-bold">No items found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
            <thead>
              <tr className="bg-gray-200">
                {[
                  "Sr No.",
                  "Invoice No.",
                  "Invoice Date",
                  "Item Code",
                  "Item Name",
                  "Company Name",
                  "HSN Code",
                  "Rate/Price",
                  "Unit_item",
                  "Quantity",
                  "Discount",
                  "GST",
                  "CGST",
                  "SGST",
                  "Total Amount",
                  "Actions",
                ].map((header) => (
                  <th key={header} className="border border-gray-300 p-2">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{item.invoiceNumber}</td>
                  <td className="border border-gray-300 p-2">{item.invoiceDate}</td>
                  <td className="border border-gray-300 p-2">{item.itemCode}</td>
                  <td className="border border-gray-300 p-2">{item.name}</td>
                  <td className="border border-gray-300 p-2">{item.companyName}</td>
                  <td className="border border-gray-300 p-2">{item.hsnCode}</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => handleChange(item?._id, "rate", e.target.value)}
                      className="w-full p-1 border border-gray-400 rounded text-red-600"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      value={item.unit}
                      onChange={(e) => handleChange(item?._id, "unit", e.target.value)}
                      className="w-full p-1 border border-gray-400 rounded text-red-600"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleChange(item?._id, "quantity", e.target.value)}
                      className="w-full p-1 border border-gray-400 rounded text-red-600"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">{item.discount}%</td>
                  <td className="border border-gray-300 p-2">{item.gst}%</td>
                  <td className="border border-gray-300 p-2">{item.cgst}%</td>
                  <td className="border border-gray-300 p-2">{item.sgst}%</td>
                  <td className="border border-gray-300 p-2 font-bold">
                    {item.totalAmount}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleUpdate(item)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-red-400"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ItemsList;
