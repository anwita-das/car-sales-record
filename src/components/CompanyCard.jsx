import { useEffect, useState } from 'react';
import CompanySalesTable from './CompanySalesTable';
import CompanyPie from './CompanyPie';
import { Button } from '@/components/ui/button';
import axios from 'axios';

function CompanyCard() {
  const [viewAsPie, setViewAsPie] = useState(false);
  const [companySales, setCompanySales] = useState([]);

  const toggleView = () => {
    setViewAsPie(prev => !prev);
  };

  useEffect(() => {
    const getCompanySales = async() => {
        try {
            const res = await axios.get('http://localhost:3000/api/cars/make-sales');
            setCompanySales(res.data);
        } catch (error) {
            console.error('Error fetching company sales data:', error);
        }
    };
    getCompanySales();
  }, []);

  return (
    <div className="flex justify-center text-center bg-white h-[500px] w-[97%] m-2.5 rounded-[10px]">
      <div className="flex flex-col justify-center items-center mt-5 text-[#333] text-[1.2rem] leading-[2] w-full px-4">
        <h2 className="text-2xl font-medium mb-3">Car Make</h2>
        {viewAsPie ? (
          <CompanyPie data={companySales} /> 
        ) : (
          <CompanySalesTable data={companySales}/>
        )}
        <Button onClick={toggleView}>
          {viewAsPie ? 'View as Table' : 'View as Pie Chart'}
        </Button>
      </div>
    </div>
  );
}

export default CompanyCard;
