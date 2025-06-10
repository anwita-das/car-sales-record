import React, { useEffect, useState } from 'react';
import { fetchSummaryStats } from '../api';

function SummaryCard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSummaryStats()
      .then(data => setStats(data))
      .catch(err => setError(err.message));
  }, []);

  if (error) return <div className="text-center bg-white h-[400px] w-[40%] m-2.5 rounded-[10px]">Error: {error}</div>;
  if (!stats) return <div className="text-center bg-white h-[400px] w-[40%] m-2.5 rounded-[10px]">Loading car stats...</div>;

  return (
    <div className="text-center bg-white h-[200px] w-[100%] sm:h[400px] sm:w-[100%] md:h-[400px] m-2.5 rounded-[10px]">
      <div className="mt-5 text-[#333] text-md md:text-lg lg:text-xl leading-[2]">
        <h2 className="text-3xl font-medium mb-3 lg:mt-8">Sales Stats</h2>
        <div className="stats">
          <strong>Total Cars Listed: </strong> {stats.totalCars}
        </div>
        <div className="stats">
          <strong>Average Price: </strong> Rs. {stats.avgPrice}
        </div>
        <div className="stats">
          <strong>Most Common Make: </strong> {stats.commonMake}
        </div>
        <div className="stats">
          <strong>Most Popular Year: </strong> {stats.popularYear}
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;
