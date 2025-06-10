import React, { useState, useEffect } from 'react';
import CarCard from '../../components/CarCard';
import { fetchCarsServer } from '../../api';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

function CarListServer({ cars, total, currentPage, setCurrentPage }) {
  const carsPerPage = 12;
  const totalPages = Math.ceil(total / carsPerPage);

  return (
    <>
      <div className="flex flex-wrap justify-between p-3">
        {cars.length === 0 ? (
          <div>No cars found.</div>
        ) : (
          cars.map(car => <CarCard key={car.id} car={car} />)
        )}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}

export default CarListServer;