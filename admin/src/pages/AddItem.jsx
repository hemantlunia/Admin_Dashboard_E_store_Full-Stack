import { useEffect, useState } from "react";
import axios from "axios";

const AddItem = () => {
  const [formData, setFormData] = useState({
    itemCode: "",
    itemName: "",
    companyName: "",
    quantity: "",
    hsnCode: "",
    gst: "",
  });
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await axios.get("http://localhost:8080/api/itemdetails/get");
    console.log(res?.data?.data);

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

    if (editItemId) {
      await axios.put(
        `http://localhost:8080/api/itemdetails/update/${editItemId}`,
        formData,
        { withCredentials: true }
      );
      setEditItemId(null);
    } else {
      await axios.post("http://localhost:8080/api/itemdetails/add", formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    }

    setFormData({
      itemCode: "",
      itemName: "",
      companyName: "",
      quantity: "",
      hsnCode: "",
      gst: "",
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
        item.companyName.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="p-2 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center uppercase underline">
        Add Details
      </h1>
      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 mb-6 bg-gray-400 p-5 rounded shadow-lg shadow-white"
      >
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
          {
            label: "Company Name",
            name: "companyName",
            placeholder: "company name...",
            type: "text",
          },
          {
            label: "Quantity",
            name: "quantity",
            placeholder: "quantity...",
            type: "Number",
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
        <div className="col-span-full text-end">
          <button
            type="submit"
            className="col-span-full bg-green-500 text-white px-4 py-2 font-semibold rounded-md hover:bg-cyan-500 transition"
          >
            {editItemId ? "Update" : "Add"}
          </button>
        </div>
      </form>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by HSN or Company"
          className="w-full px-3 py-2 rounded-md focus:ring focus:ring-sky-400 focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-auto rounded-md bg-purple-700">
        <table className="w-full text-left border-collapse border border-gray-300 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border border-gray-300">Sr. No</th>
              <th className="p-2 border border-gray-300">Item Code</th>
              <th className="p-2 border border-gray-300">Item Name</th>
              <th className="p-2 border border-gray-300">Company</th>
              <th className="p-2 border border-gray-300">Quantity</th>
              <th className="p-2 border border-gray-300">HSN Code</th>
              <th className="p-2 border border-gray-300">GST</th>
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
              filteredItems?.map((item,index) => (
                <tr key={item._id} className="hover:bg-gray-100">
                  <td className="p-2 border ">{index+1}</td>
                  <td className="p-2 border">{item.itemCode}</td>
                  <td className="p-2 border">{item.itemName}</td>
                  <td className="p-2 border">{item.companyName}</td>
                  <td className="p-2 border">{item.quantity}</td>
                  <td className="p-2 border">{item.hsnCode}</td>
                  <td className="p-2 border">{item.gst}</td>
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
