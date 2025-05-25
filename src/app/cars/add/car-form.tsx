"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { addCar } from "../cars.api";
import { CarData } from "../../../interface/car.interface";
import { useState, useEffect } from "react";
import { getAllBrands } from "../../brands/brands.api";

export function CarForm() {
  const { register, handleSubmit, reset } = useForm<CarData>();
  const router = useRouter();
  const [brands, setBrands] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    async function fetchBrands() {
      const res = await getAllBrands(0, 100);
      const brandsList = res.data || res.brands || [];
      setBrands(brandsList);
    }
    fetchBrands();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    console.log("Datos enviados:", data);
    const res = await addCar(data);
    console.log("Respuesta API:", res);
    reset();
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
        <Input type="number" {...register("year", { required: true, valueAsNumber: true })} />
      </div>
      <div>
        <Label>Stock</Label>
        <Input type="number" {...register("stock", { required: true, valueAsNumber: true })} />
      </div>
      <div>
        <Label>Precio</Label>
        <Input type="number" step="0.01" {...register("price", { required: true, valueAsNumber: true })} />
      </div>
      <div>
        <Label>
          <input type="checkbox" {...register("isAvailable")} className="mr-2" />
          Disponible
        </Label>
      </div>
      <Button type="submit">Agregar Auto</Button>
    </form>
  );
}