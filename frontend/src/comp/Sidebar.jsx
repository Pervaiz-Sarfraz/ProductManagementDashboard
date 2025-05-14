import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="hidden md:block fixed h-full z-10">
      <div className="flex flex-col w-64 h-full bg-white border-r border-gray-200">
        <div className="flex flex-col flex-grow p-4 overflow-y-auto">
          <div className="h-16 flex items-center px-4 mb-4">
            <h1 className="text-xl font-bold text-gray-800">Product Manager</h1>
          </div>
          <nav className="flex-1 space-y-2">
            <Link 
              to="/" 
              className="flex items-center px-4 py-3 text-sm font-medium text-gray-900 rounded-lg hover:bg-gray-100 group transition-colors"
            >
              <svg className="w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </Link>
            <Link 
              to="/create" 
              className="flex items-center px-4 py-3 text-sm font-medium text-gray-900 rounded-lg hover:bg-gray-100 group transition-colors"
            >
              <svg className="w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Product
            </Link>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Admin User</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;