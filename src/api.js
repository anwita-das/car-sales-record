import axios from 'axios';

const API_BASE = 'http://localhost:3000/api/cars';
const PAGINATED_API_BASE = 'http://localhost:3000/api/cars-paginated';

export async function fetchCars() {
  try {
    const res = await axios.get(API_BASE);
    return res.data;
  } catch (error) {
    throw new Error('Failed to fetch cars');
  }
}

export async function fetchCarsServer(page = 1, limit = 12, filters = {}, sortBy = 'id', order = 'asc') {
  try {
    const response = await axios.get(PAGINATED_API_BASE, {
      params: {
        page,
        limit,
        sortBy,
        order,
        ...filters, // e.g. make, fuel, transmission
      },
    });

    return response.data;
  } catch (error) {
    console.error('Axios fetchCarsServer error:', error);
    throw new Error('Failed to fetch cars');
  }
}

export async function postCar(newCar) {
  try {
    const res = await axios.post(API_BASE, newCar);
    return res.data;
  } catch (error) {
    throw new Error('Failed to add car');
  }
}

export async function updateCar(id, updatedCar) {
  try {
    const res = await axios.put(`${API_BASE}/${id}`, updatedCar);
    return res.data;
  } catch (error) {
    throw new Error('Failed to update car');
  }
}

export async function deleteCar(id) {
  try {
    const res = await axios.delete(`${API_BASE}/${id}`);
    return res.data;
  } catch (error) {
    throw new Error('Failed to delete sale');
  }
}

export async function fetchSummaryStats() {
  try {
    const res = await axios.get(`${API_BASE}/summary-stats`);
    return res.data;
  } catch (error) {
    throw new Error('Failed to fetch summary stats');
  }
}