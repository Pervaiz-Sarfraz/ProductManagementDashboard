import { useState } from 'react';
import { toast } from 'react-toastify';

// eslint-disable-next-line react/prop-types
const DashboardCard = ({ id, name, price, image, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedPrice, setEditedPrice] = useState(price);

  const handleUpdate = async () => {
    if (!editedName || !editedPrice) {
      toast.error('Please fill all fields');
      return;
    }
    await onUpdate(id, { name: editedName, price: editedPrice });
    setIsEditing(false);
    toast.success('Product updated successfully');
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await onDelete(id);
      toast.success('Product deleted successfully');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200">
      <div className="h-48 bg-gray-50 flex items-center justify-center">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="h-full w-full" 
          />
        ) : (
          <div className="text-gray-400 flex flex-col items-center">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>No Image</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        {isEditing ? (
          <div className="space-y-3">
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Product name"
            />
            <input
              type="number"
              value={editedPrice}
              onChange={(e) => setEditedPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Price"
            />
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{name}</h3>
            <p className="text-gray-600 font-medium">${price}</p>
          </div>
        )}
        
        <div className="flex justify-between mt-4">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdate}
                className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 text-sm font-medium"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200 text-sm font-medium"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 text-sm font-medium"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;