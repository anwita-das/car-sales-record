import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { deleteCar } from '../api';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteCar(id);
      alert("Car deleted successfully");
      navigate("/search");
    } catch (err) {
      alert("Failed to delete car: " + err.message);
    }
  };

  useEffect(() => {
    async function fetchCar() {
      try {
        const response = await axios.get(`http://localhost:3000/api/cars/${id}`);
        setCar(response.data);
      } catch (err) {
        setError("Car not found");
      } finally {
        setLoading(false);
      }
    }
    fetchCar();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!car) return <div>Car not found</div>;

  return (
    <div className="p-4 max-w-sm md:max-w-lg lg:max-w-2xl mx-auto mt-10 space-y-4 leading-8 bg-white shadow-xl rounded-xl">
      <div className="car-details">
        <h2 className="text-xl font-bold text-center mb-4">{car.make}: {car.model}</h2>
        <div className="flex flex-row justify-between">
          <div className="ml-3.5 text-lg">
            <p><strong>Year:</strong> {car.year}</p>
            <p><strong>Price:</strong> Rs. {car.price.toLocaleString()}</p>
            <p><strong>Fuel Type:</strong> {car.fuel}</p>
            <p><strong>Transmission:</strong> {car.transmission}</p>
            <p><strong>Mileage:</strong> {car.mileage.toLocaleString()} miles</p>
            <p><strong>Color:</strong> {car.color}</p>
            <p><strong>Features:</strong> {car.features}</p>
            <p><strong>Condition:</strong> {car.car_condition}</p>
            <p><strong>Accident:</strong> {car.accident}</p>
          </div>
          <div>
            {car.receipt_image && (
            <div className="  flex flex-col items-center">
              <img
                src={`http://localhost:3000${car.receipt_image}`}
                alt="Receipt"
                className="w-full max-w-md rounded shadow-lg mt-2"
              />
              <p className="font-semibold">Receipt Image</p>
            </div>
          )}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div>
          <button type="button" className="bg-yellow-300 hover:bg-yellow-400 border-none w-[150px] h-[40px] rounded-[20px] text-lg cursor-pointer" onClick={() => navigate(`/edit/${car.id}`)}>Edit Car Info</button>
        </div>
        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button type="button" className="bg-yellow-300 hover:bg-yellow-400 border-none w-[150px] h-[40px] rounded-[20px] text-lg cursor-pointer">Delete Sale</button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete this sale?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the car record.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}

export default CarDetails;
