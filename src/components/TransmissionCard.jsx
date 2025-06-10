import { useEffect, useState } from 'react';
import TransmissionTable from './TransmissionTable';
import TransmissionPie from './TransmissionPie';
import { Button } from '@/components/ui/button';
import axios from 'axios';

function CompanyCard() {
    const [viewAsPie, setViewAsPie] = useState(false);
    const [TransmissionSales, setTransmissionSales] = useState([]);

    const toggleView = () => {
        setViewAsPie(prev => !prev);
    }

    useEffect(() => {
    const getTransmissionSales = async() => {
        try {
            const res = await axios.get('http://localhost:3000/api/cars/transmission-sales');
            setTransmissionSales(res.data);
        } catch (error) {
            console.error('Error fetching company sales data:', error);
        }
    };
    getTransmissionSales();
    }, []);

    return (
        <div className="flex justify-center text-center bg-white h-[500px] w-[97%] m-2.5 rounded-[10px]">
            <div className="flex flex-col justify-center items-center mt-5 text-[#333] text-[1.2rem] leading-[2] w-full px-4">
                <h2 className='text-2xl font-medium mb-3'>Transmission</h2>
                {viewAsPie ? (
                    <TransmissionPie data={TransmissionSales} /> 
                ) : (
                    <TransmissionTable data={TransmissionSales} />
                )}
                <Button onClick={toggleView}>
                    {viewAsPie? "View as Table" : "View as Pie Chart"}
                </Button>
            </div>
        </div>
    );
}

export default CompanyCard;