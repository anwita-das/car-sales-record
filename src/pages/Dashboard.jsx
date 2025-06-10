import GraphCard from '../components/GraphCard';
import SummaryCard from '../components/SummaryCard';
import CompanyCard from '../components/CompanyCard';
import FuelCard from '../components/FuelCard';
import TransmissionCard from '../components/TransmissionCard';

function Dashboard() {
    return (
        <div className='flex flex-col justify-center gap-[2px]'>
            <div className='flex flex-col md:flex-row justify-center p-5'>
                <SummaryCard />
                <GraphCard />
            </div>
            <div className="flex flex-col lg:flex-row justify-center mt-[5px] p-[10px]">
                <CompanyCard />
                <FuelCard />
                <TransmissionCard />
            </div>
        </div>
    );
}

export default Dashboard;