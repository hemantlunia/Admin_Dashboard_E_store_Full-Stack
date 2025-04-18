import { useEffect, useState } from "react";
import axios from "axios";

const AddItem = () => {
  let BACKEND_URL = import.meta.env.MODE ==="development" ? "http://localhost:8080/api":"/api"
  const [formData, setFormData] = useState({
    itemCode: "",
    itemName: "",
    brandName: "",
    hsnCode: "",
    gst: "",
    unit: "",
    cnf: "",
    cnfMargin: "",
    retailer: "",
    retailerMargin: "",
    distributor: "",
    distributorMargin: "",
    wholesale: "",
    mrp: "",
  });
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await axios.get(`${BACKEND_URL}/itemdetails/get`);
    // console.log(res?.data?.data);

    setItems(res?.data?.data || []);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allFilled = Object.values(formData).every((v) => v !== "");

    if (!allFilled) return alert("Please fill in all fields.");
    // console.log("formdata",formData);
    // console.log(formData);

    if (editItemId) {
      await axios.put(
        `${BACKEND_URL}/itemdetails/update/${editItemId}`,
        formData,
        { withCredentials: true }
      );
      setEditItemId(null);
    } else {
      await axios.post(`${BACKEND_URL}/itemdetails/add`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    }

    setFormData({
      itemCode: "",
      itemName: "",
      brandName: "",
      hsnCode: "",
      gst: "",
      unit: "",
      cnf: "",
      cnfMargin: "",
      retailer: "",
      retailerMargin: "",
      distributor: "",
      distributorMargin: "",
      wholesale: "",
      mrp: "",
    });
    fetchItems();
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditItemId(item._id);
  };

  const filteredItems =
    items &&
    items?.filter(
      (item) =>
        item.hsnCode.toLowerCase().includes(search.toLowerCase()) ||
        item.brandName.toLowerCase().includes(search.toLowerCase())
    );

  const handleChangeselectunit = (e) => {
    setFormData({ ...formData, unit: e.target.value });
  };

  return (
    <div className="p-1 max-w-7xl mx-auto">
      {/* <h1 className="text-2xl font-bold mb-4 text-center uppercase underline">
        Add Details
      </h1> */}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 mb-6 bg-gray-200 p-5 rounded shadow-lg shadow-white"
      >
        {/* First row with 2 items only */}
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              label: "Item Code",
              name: "itemCode",
              placeholder: "item code...",
              type: "text",
            },
            {
              label: "Item Name",
              name: "itemName",
              placeholder: "item name...",
              type: "text",
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-sky-400"
              />
            </div>
          ))}
        </div>

        {/* Remaining items in responsive grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            {
              label: "Brand Name",
              name: "brandName",
              placeholder: "brand name...",
              type: "text",
            },
            {
              label: "Unit",
              name: "unit",
              placeholder: "unit...",
              type: "text",
            },
            {
              label: "HSN Code",
              name: "hsnCode",
              placeholder: "HSN code...",
              type: "text",
            },
            {
              label: "GST(%)",
              name: "gst",
              placeholder: "gst(%)...",
              type: "Number",
            },
            {
              label: "CNF",
              name: "cnf",
              placeholder: "cnf...",
              type: "Number",
            },
            {
              label: "CNF Margin",
              name: "cnfMargin",
              placeholder: "cnf Margin...",
              type: "Number",
            },
            {
              label: "Distributor",
              name: "distributor",
              placeholder: "distributor...",
              type: "Number",
            },
            {
              label: "Distributor Margin",
              name: "distributorMargin",
              placeholder: "distributorMargin...",
              type: "Number",
            },
            {
              label: "Retailer Margin",
              name: "retailerMargin",
              placeholder: "retailerMargin...",
              type: "Number",
            },
            {
              label: "Retailer",
              name: "retailer",
              placeholder: "retailer...",
              type: "Number",
            },
            {
              label: "WholeSale",
              name: "wholesale",
              placeholder: "wholesale...",
              type: "Number",
            },
            {
              label: "MRP",
              name: "mrp",
              placeholder: "mrp...",
              type: "Number",
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium mb-1">
                {field.label}
              </label>
              {field.name === "unit" ? (
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChangeselectunit}
                  className="border p-2 rounded w-full"
                >
                  <option value="">Select Unit</option>
                  <option value="Jar">Jar</option>
                  <option value="Piece">Piece</option>
                  <option value="CS">CS</option>
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-sky-400"
                />
              )}
            </div>
          ))}
        </div>

        {/* Submit button */}
        <div className="text-end pt-4">
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 font-semibold rounded-md hover:bg-green-500 transition"
          >
            {editItemId ? "Update" : "Add"}
          </button>
        </div>
      </form>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by HSN or Brand"
          className="w-full px-3 py-2 rounded-md focus:ring focus:ring-sky-400 focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-auto rounded-md bg-gray-300">
        <table className="w-full text-left border-collapse border border-gray-300 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border border-gray-300">Sr. No</th>
              <th className="p-2 border border-gray-300">Item Code</th>
              <th className="p-2 border border-gray-300">Item Name</th>
              <th className="p-2 border border-gray-300">Brand</th>
              <th className="p-2 border border-gray-300">Unit</th>
              <th className="p-2 border border-gray-300">HSN Code</th>
              <th className="p-2 border border-gray-300">GST</th>
              <th className="p-2 border border-gray-300">CNF</th>
              <th className="p-2 border border-gray-300">CNF Margin</th>
              <th className="p-2 border border-gray-300">Distributor</th>
              <th className="p-2 border border-gray-300">Distributor Margin</th>
              <th className="p-2 border border-gray-300">Retailer</th>
              <th className="p-2 border border-gray-300">Retailer Margin</th>
              <th className="p-2 border border-gray-300">WholeSale</th>
              <th className="p-2 border border-gray-300">MRP</th>
              <th className="p-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems?.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No items found.
                </td>
              </tr>
            ) : (
              filteredItems?.map((item, index) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-400 hover:font-semibold"
                >
                  <td className="p-2 border ">{index + 1}</td>
                  <td className="p-2 border">{item.itemCode}</td>
                  <td className="p-2 border">{item.itemName}</td>
                  <td className="p-2 border">{item.brandName}</td>
                  <td className="p-2 border">{item.unit}</td>
                  <td className="p-2 border">{item.hsnCode}</td>
                  <td className="p-2 border">{item.gst}</td>
                  <td className="p-2 border">{item.cnf}</td>
                  <td className="p-2 border">{item.cnfMargin}</td>
                  <td className="p-2 border">{item.distributor}</td>
                  <td className="p-2 border">{item.distributorMargin}</td>
                  <td className="p-2 border">{item.retailer}</td>
                  <td className="p-2 border">{item.retailerMargin}</td>
                  <td className="p-2 border">{item.wholesale}</td>
                  <td className="p-2 border">{item.mrp}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-white bg-green-500 px-3 rounded hover:bg-red-500"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddItem;
