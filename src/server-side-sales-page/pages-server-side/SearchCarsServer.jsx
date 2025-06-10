import React, { useState, useEffect } from 'react';
import CarListServer from '../components-server-side/CarListServer';
import AddCar from '../../components/AddCar';
import SearchBar from '../../components/SearchBar';
import { fetchCarsServer } from '../../api';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

function SearchCarsServer() {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function loadCars() {
      try {
        const data = await fetchCarsServer(currentPage, 12, searchTerm, sortOption);
        setCars(data.cars || []);
        setTotal(data.total || 0);
      } catch (error) {
        console.error('Failed to fetch cars:', error);
      }
    }

    loadCars();
  }, [currentPage, searchTerm, sortOption]);

  const handleSearch = () => {
    setCurrentPage(1);
    setSearchTerm(searchInput);
  };

  const handleSortChange = (value) => {
    setSortOption(value === 'reset' ? '' : value);
    setCurrentPage(1); // reset page when sorting changes
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-evenly items-center mt-5 gap-4">
        <SearchBar
          searchTerm={searchInput}
          setSearchTerm={setSearchInput}
          onSearch={handleSearch}
        />

        {/* Sort Select */}
        <Select onValueChange={handleSortChange} value={sortOption || undefined}>
          <SelectTrigger className="w-[200px] bg-white rounded-3xl">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="reset">Reset Sorting</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="year-asc">Year: Old to New</SelectItem>
            <SelectItem value="year-desc">Year: New to Old</SelectItem>
            <SelectItem value="make-asc">Make: A to Z</SelectItem>
            <SelectItem value="make-desc">Make: Z to A</SelectItem>
          </SelectContent>
        </Select>

        <AddCar />
      </div>

      <CarListServer cars={cars} total={total} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default SearchCarsServer;