import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '../store/product';
import { toast } from 'react-toastify';
import Sidebar from '../comp/Sidebar';

const CreateProduct = () => {
  const { createProduct } = useProductStore();
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      toast.error('Please fill out all fields');
      return;
    }
  
    setIsLoading(true);
  
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('price', newProduct.price);
    formData.append('image', newProduct.image);
  
    try {
      const response = await createProduct(formData);
      setIsLoading(false);
  
      if (response.success) {
        setNewProduct({ name: '', price: '', image: null });
        setPreviewImage(null);
        navigate('/');
        toast.success('Product created successfully!');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to create product');
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setNewProduct({ ...newProduct, image: file });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-6 ml-0 md:ml-64 pt-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
              <p className="text-gray-600 mt-1">Fill in the details below to create a new product</p>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800 mt-4 sm:mt-0"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to products
            </button>
          </div>
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">Product Information</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="e.g. Premium T-Shirt"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                <div className="relative max-w-xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full pl-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Image *</label>
                <div className="mt-1 flex flex-col sm:flex-row sm:items-center gap-4">
                  <label className="cursor-pointer flex-shrink-0">
                    <div className="px-4 py-2.5 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition duration-200 flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">Upload Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="sr-only"
                        required
                      />
                    </div>
                  </label>
                  <div className="text-sm text-gray-500">
                    {newProduct.image ? (
                      <span className="text-gray-700 font-medium">{newProduct.image.name}</span>
                    ) : (
                      <span>JPEG, PNG or WEBP. Max 5MB.</span>
                    )}
                  </div>
                </div>
                
                {previewImage && (
                  <div className="mt-4">
                    <div className="text-sm text-gray-500 mb-2">Image Preview:</div>
                    <div className="border border-gray-200 rounded-lg p-2 inline-block">
                      <img 
                        src={previewImage} 
                        alt="Preview" 
                        className="h-48 object-contain rounded" 
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 mr-3 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                disabled={isLoading}
                className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding Product...
                  </span>
                ) : 'Create Product'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;