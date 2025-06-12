import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import SearchCars from './pages/SearchCars';
import CarDetails from './pages/CarDetails';
import AddSalePage from './pages/AddSalePage';
import EditCarPage from './pages/EditCarPage';
import BulkUpload from './pages/BulkUpload';
import SearchCarsServer from './server-side-sales-page/pages-server-side/SearchCarsServer';

function App() {
  return (
    <div>
      <header>
        <h1 className="text-[#333] text-5xl font-extrabold text-center mt-2">Car Sales Record</h1>
      </header>
      <nav className="flex justify-center items-center mt-1.5 gap-[50px] bg-[#333] h-[40px] p-5 mb-5">
        <Link to = "/" className="text-white no-underline font-bold hover:text-[#ffb300]">Dashboard</Link>
        <Link to = "/search" className="text-white no-underline font-bold hover:text-[#ffb300]">Sales</Link>
        <Link to="/search-server" className="text-white no-underline font-bold hover:text-[#ffb300] ">Sales (Server)</Link>
        <Link to="/upload" className="text-white no-underline font-bold hover:text-[#ffb300]">Bulk Upload</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/search" element={<SearchCars />} />
        <Route path="/car/:id" element={<CarDetails />} />
        <Route path="/add" element={<AddSalePage />} />
        <Route path="/edit/:id" element={<EditCarPage/>} />
        <Route path="/search-server" element={<SearchCarsServer />} />
        <Route path="/upload" element={<BulkUpload />} />
      </Routes>
    </div>
  );
}

export default App;