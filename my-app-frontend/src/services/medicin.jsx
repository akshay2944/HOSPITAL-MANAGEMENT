import { useEffect, useState } from "react";
import axios from "axios";
import { data } from "react-router-dom";

function MedicineList() {
  const [medicines, setMedicines] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/users/allmedicin"
        );

        setMedicines(response.data.medicines);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMedicines();
  }, []);


  const addMedicine = (medicine) => {
  setCart((prev) => {
    const existing = prev.find(
      item => item.medicineId === medicine._id
    );

    if (existing) {
      return prev.map(item =>
        item.medicineId === medicine._id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      );
    }

    return [
      ...prev,
      {
        medicineId: medicine._id,
        quantity: 1
      }
    ];
  });
};



  return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
  {medicines.map((medicine) => (
    <div
      key={medicine._id}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 hover:shadow-xl transition-all duration-300"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {medicine.name}
          </h2>
          <span className="inline-block mt-1 px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
            {medicine.category}
          </span>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-green-600">
            ₹{medicine.price}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 text-gray-600">
        <p>
          <span className="font-semibold">
            Stock:
          </span>{" "}
          {medicine.stock}
        </p>

        <p>
          <span className="font-semibold">
            Expiry:
          </span>{" "}
          {new Date(
            medicine.expiryDate
          ).toLocaleDateString()}
        </p>

        <p className="text-sm text-gray-500">
          {medicine.description}
        </p>
      </div>

      {/* Stock Status */}
      <div className="mt-4">
        {medicine.stock > 0 ? (
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            In Stock
          </span>
        ) : medicine.stock > 0 ? (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
            Low Stock
          </span>
        ) : (
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
            Out of Stock
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="mt-5 flex gap-3">
        <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Buy Now
        </button>

        <button className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
        onClick={() => addmedicin(medicine._id)}>
          Add Cart
        </button>
      </div>
    </div>
  ))}
</div>
);
}

export default MedicineList;