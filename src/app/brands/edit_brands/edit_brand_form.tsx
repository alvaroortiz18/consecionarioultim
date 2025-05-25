"use client";

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useForm } from "react-hook-form";
import { BrandData } from '../../../interface/brand.interface'; 
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getBrandById, updateBrand } from '../brands.api';

interface EditBrandFormProps {
  brandId: string;
}

export function EditBrandForm({ brandId }: EditBrandFormProps) {
  const { register, handleSubmit, setValue } = useForm<BrandData>();
  const router = useRouter();

  useEffect(() => {
    async function fetchBrand() {
      const brand = await getBrandById(brandId);
      setValue("name", brand.name);
      setValue("description", brand.description);
    }
    fetchBrand();
  }, [brandId, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    await updateBrand(brandId, data);
    router.push("/");
  });

  return (
    <form onSubmit={onSubmit}>
      <Label>Marca</Label>
      <Input {...register("name")} />
      <Label>Descripcion</Label>
      <Input {...register("description")} />
      <Button type="submit">Editar Marca</Button>
    </form>
  );
}