"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCarById, updateCar } from "../cars.api";
import { getAllBrands } from "../../brands/brands.api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CarData } from "../../../interface/car.interface";

export default function EditCarForm({ carId }: { carId: string }) {
  const { register, handleSubmit, reset } = useForm<CarData>();
  const router = useRouter();
  const [brands, setBrands] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    async function fetchData() {
      const carRes = await getCarById(carId);
      reset(carRes.data || carRes); // Ajusta según tu API
      const brandsRes = await getAllBrands(0, 100);
      setBrands(brandsRes.data || brandsRes.brands || []);
    }
    fetchData();
  }, [carId, reset]);

  const onSubmit = handleSubmit(async (data) => {
    // Filtra solo los campos válidos
    const { model, description, year, stock, price, isAvailable, brand_id } =
      data;

    const cleanData = {
      model,
      description,
      year,
      stock,
      price,
      isAvailable,
      brand_id,
    };

    const res = await updateCar(carId, cleanData);
    console.log("Respuesta API:", res);
    router.push("/cars");
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label>Marca</Label>
        <select
          {...register("brand_id", { required: true, valueAsNumber: true })}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Seleccione una marca</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label>Modelo</Label>
        <Input {...register("model", { required: true })} />
      </div>
      <div>
        <Label>Descripción</Label>
        <Input {...register("description", { required: true })} />
      </div>
      <div>
        <Label>Año</Label>
        <Input
          type="number"
          {...register("year", { required: true, valueAsNumber: true })}
        />
      </div>
      <div>
        <Label>Stock</Label>
        <Input
          type="number"
          {...register("stock", { required: true, valueAsNumber: true })}
        />
      </div>
      <div>
        <Label>Precio</Label>
        <Input
          type="number"
          step="0.01"
          {...register("price", { required: true, valueAsNumber: true })}
        />
      </div>
      <div>
        <Label>
          <input
            type="checkbox"
            {...register("isAvailable")}
            className="mr-2"
          />
          Disponible
        </Label>
      </div>
      <Button type="submit">Actualizar Auto</Button>
    </form>
  );
}