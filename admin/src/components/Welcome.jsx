import React from "react";
import { ShoppingCart, Users, PackageCheck, DollarSign } from "lucide-react";

const cards = [
  {
    title: "Total Products",
    value: "1,234",
    icon: <PackageCheck size={28} className="text-indigo-600" />,
  },
  {
    title: "Total Sales",
    value: "$12,456",
    icon: <DollarSign size={28} className="text-green-600" />,
  },
  {
    title: "Active Users",
    value: "245",
    icon: <Users size={28} className="text-orange-600" />,
  },
  {
    title: "New Orders",
    value: "87",
    icon: <ShoppingCart size={28} className="text-purple-600" />,
  },
  {
    title: "Total Sales",
    value: "$12,456",
    icon: <DollarSign size={28} className="text-green-600" />,
  },
  {
    title: "Active Users",
    value: "245",
    icon: <Users size={28} className="text-orange-600" />,
  },
  {
    title: "New Orders",
    value: "87",
    icon: <ShoppingCart size={28} className="text-purple-600" />,
  },
  {
    title: "Total Sales",
    value: "$12,456",
    icon: <DollarSign size={28} className="text-green-600" />,
  },
  {
    title: "Active Users",
    value: "245",
    icon: <Users size={28} className="text-orange-600" />,
  },
  {
    title: "New Orders",
    value: "87",
    icon: <ShoppingCart size={28} className="text-purple-600" />,
  },
  {
    title: "Total Sales",
    value: "$12,456",
    icon: <DollarSign size={28} className="text-green-600" />,
  },
  {
    title: "Active Users",
    value: "245",
    icon: <Users size={28} className="text-orange-600" />,
  },
  {
    title: "New Orders",
    value: "87",
    icon: <ShoppingCart size={28} className="text-purple-600" />,
  },
];

const Welcome = () => {
  const user = "Hemant Kumar";

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, {user} 👋</h1>
        <p className="text-gray-600 mt-1">Overview of your inventory.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-5 flex items-center space-x-4 hover:shadow-lg transition-shadow"
          >
            <div className="p-3 bg-gray-100 rounded-full">{card.icon}</div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">{card.value}</h2>
              <p className="text-sm text-gray-500">{card.title}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Welcome;
