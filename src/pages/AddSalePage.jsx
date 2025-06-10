import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { postCar } from '../api';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { carFormSchema } from '@/schemas/CarValidation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function AddSalePage() {
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
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

  async function uploadReceipt(file) {
    if (!file) return null;

    const formData = new FormData();
    formData.append('receipt', file);

    const res = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error('Failed to upload receipt');
    }

    const data = await res.json();
    return data.filePath; // path like /uploads/uniquefilename.jpg
  }

  const onSubmit = async (data) => {
    try {
      let receiptPath = null;
      if (imageFile) {
        receiptPath = await uploadReceipt(imageFile);
      }

      const carDataWithReceipt = {
        ...data,
        receiptImage: receiptPath, // Add receipt image path or null
      };
      await postCar(carDataWithReceipt);
      alert('Sale added successfully!');
      navigate('/search');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
      <div className="p-4 max-w-md md:max-w-xl lg:max-w-3xl mx-auto mt-10 space-y-4 bg-white shadow-xl rounded-xl">
      <h2 className="text-xl font-bold text-center">Add New Car Sale</h2>

      <div>Make:</div>
      <Controller
        name="make"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Make" />
            </SelectTrigger>
            <SelectContent>
              {["Hyundai", "Land Rover", "Honda", "Kia", "Volkswagen", "Mazda", "Audi", "Chevrolet", "Jaguar", "BMW", "Fiat"]
                .map(make => <SelectItem key={make} value={make}>{make}</SelectItem>)}
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
      <Input {...register("fuel")} placeholder="Enter fuel type" />
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

      <div>
        <label htmlFor="car-image" className="block text-sm font-medium mb-2">
          Upload Receipt Image (optional):
        </label>

        <label
          htmlFor="car-image"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition"
        >
          Choose Image
        </label>

        <Input
          id="car-image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        {imageFile && (
          <p className="mt-1 text-sm text-gray-600">Selected: {imageFile.name}</p>
        )}
      </div>

      <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
    </div>
  );
}

export default AddSalePage;