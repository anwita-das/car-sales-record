import { useEffect, useState } from 'react';
import FuelTypeTable from './FuelTypeTable';
import FuelPie from './FuelPie';
import { Button } from '@/components/ui/button';
import axios from 'axios';

function FuelCard() {
    const [viewAsPie, setViewAsPie] = useState(false);
    const [FuelSales, setFuelSales] = useState([]);

    const toggleView = () => {
        setViewAsPie(prev => !prev);
    }

    useEffect(() => {
    const getFuelSales = async() => {
        try {
            const res = await axios.get('http://localhost:3000/api/cars/fuel-sales');
            setFuelSales(res.data);
        } catch (error) {
            console.error('Error fetching company sales data:', error);
        }
    };
    getFuelSales();
    }, []);

    return (
        <div className="flex justify-center text-center bg-white h-[500px] w-[97%] m-2.5 rounded-[10px]">
            <div className="flex flex-col justify-center items-center mt-5 text-[#333] text-[1.2rem] leading-[2] w-full px-4">
                <h2 className='text-2xl font-medium mb-3'>Fuel Type</h2>
                {viewAsPie ? (
                    <FuelPie data={FuelSales} /> 
                ) : (
                    <FuelTypeTable data={FuelSales}/>
                )}
                <Button onClick={toggleView}>
                    {viewAsPie? "View as Table" : "View as Pie Chart"}
                </Button>
            </div>
        </div>
    );
}

export default FuelCard;