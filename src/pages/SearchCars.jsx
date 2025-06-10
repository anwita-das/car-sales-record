import React, { useState, useEffect } from 'react';
import CarList from '../components/CarList';
import AddCar from '../components/AddCar';
import SearchBar from '../components/SearchBar';
import { fetchCars } from '../api';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import _ from 'lodash';

function SearchCars() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchCars().then(data => {
      setCars(data);
      applyFilters(data, searchTerm, sortOption);
    });
  }, []);

  const applyFilters = (carsData, search, sort) => {
    let filtered = [...carsData];

    if (search.trim()) {
      filtered = filtered.filter(car =>
        car.make.toLowerCase().includes(search.trim().toLowerCase()) ||
        car.model.toLowerCase().includes(search.trim().toLowerCase())
      );
    }

    if (sort && sort !== 'reset') {
      const [field, direction] = sort.split('-');
      if (field === 'price') {
        filtered = _.orderBy(filtered, [car => Number(car.price)], [direction]);
      } else {
        filtered = _.orderBy(filtered, [field], [direction]);
      }
    }

    setFilteredCars(filtered);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    applyFilters(cars, searchTerm, sortOption);
  };

  const handleSortChange = (value) => {
    setCurrentPage(1);
    if (value === 'reset') {
      setSortOption('');
      applyFilters(cars, searchTerm, '');
    } else {
      setSortOption(value);
      applyFilters(cars, searchTerm, value);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-evenly items-center mt-5 gap-4">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />

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

      <CarList
        cars={filteredCars}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default SearchCars;