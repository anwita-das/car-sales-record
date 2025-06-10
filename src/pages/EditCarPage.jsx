import { useState,useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { updateCar } from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { carFormSchema } from '@/schemas/CarValidation';
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function EditCarPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(carFormSchema),
    defaultValues: {
      make: '',
      model: '',
      year: '',
      mileage: '',
      price: '',
      fuel: '',
      color: '',
      transmission: '',
      features: '',
      condition: '',
      accident: '',
    },
  });

  useEffect(() => {
    async function fetchCar() {
      try {
        const res = await axios.get(`http://localhost:3000/api/cars/${id}`);
        const data = {
        ...res.data,
        condition: res.data.car_condition || '',
      };
        reset(data);
      } catch (err) {
        alert('Failed to fetch car details');
      }
    }

    fetchCar();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      await updateCar(id, data);
      alert('Car info updated successfully!');
      navigate('/search');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-4 max-w-md md:max-w-xl lg:max-w-3xl mx-auto mt-10 space-y-4 bg-white shadow-xl rounded-xl">
      <h2 className="text-xl font-bold text-center">Edit Car Info</h2>

      <div>Make:</div>
      <Controller
        name = 'make'
        control = {control}
        render = {({field}) => (

        <Select onValueChange={field.onChange} value={field.value}>
          <SelectTrigger className="w-[737px]">
            <SelectValue placeholder="Select Make" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Hyundai">Hyundai</SelectItem>
            <SelectItem value="Land Rover">Land Rover</SelectItem>
            <SelectItem value="Honda">Honda</SelectItem>
            <SelectItem value="Kia">Kia</SelectItem>
            <SelectItem value="Volkswagen">Volkswagen</SelectItem>
            <SelectItem value="Mazda">Mazda</SelectItem>
            <SelectItem value="Audi">Audi</SelectItem>
            <SelectItem value="Chevrolet">Chevrolet</SelectItem>
            <SelectItem value="Jaguar">Jaguar</SelectItem>
            <SelectItem value="BMW">BMW</SelectItem>
            <SelectItem value="Fiat">Fiat</SelectItem>
          </SelectContent>
        </Select>
        )}
      />
      {errors.make && <p className="text-red-500">{errors.make.message}</p>}

      <div>Model:</div>
      <Input {...register("model")} placeholder="Enter model" />
      {errors.model && <p className="text-red-500">{errors.model.message}</p>}

      <div>Year:</div>
      <Input {...register("year")} placeholder="Enter year" type="number" />
      {errors.year && <p className="text-red-500">{errors.year.message}</p>}

      <div>Mileage:</div>
      <Input {...register("mileage")} placeholder="Enter mileage" type="number" />
      {errors.mileage && <p className="text-red-500">{errors.mileage.message}</p>}

      <div>Price:</div>
      <Input {...register("price")} placeholder="Enter price" type="number" />
      {errors.price && <p className="text-red-500">{errors.price.message}</p>}

      <div>Fuel Type:</div>
      <Input {...register("fuel")} placeholder="Enter fuel Type" />
      {errors.fuel && <p className="text-red-500">{errors.fuel.message}</p>}

      <div>Color:</div>
      <Input {...register("color")} placeholder="Enter color" />
      {errors.color && <p className="text-red-500">{errors.color.message}</p>}

      <div>Transmission:</div>
      <Input {...register("transmission")} placeholder="Enter transmission" />
      {errors.transmission && <p className="text-red-500">{errors.transmission.message}</p>}

      <div>Features:</div>
      <Input {...register("features")} placeholder="Enter features" />
      {errors.features && <p className="text-red-500">{errors.features.message}</p>}

      <div>Condition:</div>
      <Input {...register("condition")} placeholder="Enter condition" />
      {errors.condition && <p className="text-red-500">{errors.condition.message}</p>}

      <div>Accident:</div>
      <Input {...register("accident")} placeholder="Enter accident (Yes/No)" />
      {errors.accident && <p className="text-red-500">{errors.accident.message}</p>}

      <Button onClick={handleSubmit(onSubmit)}>Save Changes</Button>
    </div>
  );
}

export default EditCarPage;
