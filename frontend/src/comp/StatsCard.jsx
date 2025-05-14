// eslint-disable-next-line react/prop-types
const StatsCard = ({ title, value, icon, color }) => {
    return (
      <div className={`p-6 rounded-lg shadow ${color}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          </div>
          <span className="text-3xl">{icon}</span>
        </div>
      </div>
    );
  };
  
  export default StatsCard;