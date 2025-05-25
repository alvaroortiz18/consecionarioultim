import Link from 'next/link'
import React from 'react'
import { Button, buttonVariants } from '../../components/ui/button'
import { getAllCars } from './cars.api'
import LoginLogoutButton from "./LoginLogoutButton";

export default async function CarsPage() {
  const carsResponse = await getAllCars();
  const cars = carsResponse.data || carsResponse.cars || carsResponse;

  return (
    <div className="max-w-4xl mx-auto py-8 px-2">
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-semibold text-gray-700'>Listado de Autos</h1>

        <div className="flex gap-2">
          <Link href="/" className="bg-gray-200 text-gray-700 px-4 py-1 rounded hover:bg-gray-300 text-sm">
            HOME
          </Link>
          <Link href="/cars/add" className="bg-gray-200 text-gray-700 px-4 py-1 rounded hover:bg-gray-300 text-sm">
            Agregar Auto
          </Link>
          <LoginLogoutButton />
        </div>
      </div>

      <div className="overflow-x-auto bg-gray-50 rounded">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-3 py-2 text-left text-gray-600 font-medium">Modelo</th>
              <th className="px-3 py-2 text-left text-gray-600 font-medium">Descripción</th>
              <th className="px-3 py-2 text-left text-gray-600 font-medium">Año</th>
              <th className="px-3 py-2 text-left text-gray-600 font-medium">Precio</th>
              <th className="px-3 py-2 text-left text-gray-600 font-medium">Stock</th>
              <th className="px-3 py-2 text-left text-gray-600 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(cars) && cars.length > 0 ? (
              cars.map((car: any) => (
                <tr key={car.id} className="hover:bg-gray-100">
                  <td className="px-3 py-2">{car.model}</td>
                  <td className="px-3 py-2">{car.description}</td>
                  <td className="px-3 py-2">{car.year}</td>
                  <td className="px-3 py-2">${car.price}</td>
                  <td className="px-3 py-2">{car.stock}</td>
                  <td className="px-3 py-2 flex gap-1">
                    <Link href={`/cars/edit_car/${car.id}`}>
                      <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs hover:bg-gray-300">Editar</button>
                    </Link>
                    <Link href={`/cars/delete?id=${car.id}`}>
                      <button className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs hover:bg-red-200">Eliminar</button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-gray-400">
                  No hay autos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
