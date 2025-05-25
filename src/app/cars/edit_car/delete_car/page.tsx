"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { deleteBrand } from '../brands.api';

export default function DeleteBrandPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const brandId = searchParams.get('id');

  const handleDelete = async () => {
    if (!brandId) return;
    await deleteBrand(brandId);
    router.push('/');
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Eliminar Marca</CardTitle>
        </CardHeader>
        <CardContent>
          <p>¿Estás seguro de que deseas eliminar esta marca?</p>
          <div className="flex gap-4 mt-4">
            <Button variant="destructive" onClick={handleDelete}>
              Sí, eliminar
            </Button>
            <Button variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
