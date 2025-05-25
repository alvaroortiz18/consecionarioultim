"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { deleteCar } from '../cars.api';

export default function DeleteCarPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const carId = searchParams.get('id');

  const handleDelete = async () => {
    if (!carId) return;
    await deleteCar(carId);
    router.push('/cars');
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Eliminar Auto</CardTitle>
        </CardHeader>
        <CardContent>
          <p>¿Estás seguro de que deseas eliminar este auto?</p>
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