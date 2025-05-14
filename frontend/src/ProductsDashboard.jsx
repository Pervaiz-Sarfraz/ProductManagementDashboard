import { useEffect } from 'react';
import { useProductStore } from './store/product';
import DashboardCard from './comp/DashboardCard';
import Sidebar from './comp/Sidebar';
import StatsCard from './comp/StatsCard';

const ProductsDashboard = () => {
  const { products, fetchProducts, deleteProduct, updateProduct } = useProductStore();
  
  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts();
    };
    fetchData();
  }, [fetchProducts]);

  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + parseFloat(product.price), 0);
  const averagePrice = totalProducts > 0 ? (totalValue / totalProducts).toFixed(2) : 0;

  return (
    <>
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard 
            title="Total Products" 
            value={totalProducts} 
            icon="📦" 
            color="bg-blue-100 text-blue-600"
          />
          <StatsCard 
            title="Total Inventory Value" 
            value={`$${totalValue.toFixed(2)}`} 
            icon="💰" 
            color="bg-green-100 text-green-600"
          />
          <StatsCard 
            title="Average Price" 
            value={`$${averagePrice}`} 
            icon="📊" 
            color="bg-purple-100 text-purple-600"
          />
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Your Products</h2>
            <a 
              href="/create" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 flex items-center"
            >
              <span className="mr-2">+</span> Add Product
            </a>
          </div>
          
          {products.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-4">You haven not added any products yet.</p>
              <a 
                href="/create" 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 inline-block"
              >
                Add Your First Product
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <DashboardCard
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  onDelete={deleteProduct}
                  onUpdate={updateProduct}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsDashboard;