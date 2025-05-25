import Link from 'next/link'
import React from 'react'
import { Button, buttonVariants } from '../components/ui/button'
import { getAllBrands } from './brands/brands.api'

export default async function HomePage() {
  const brandsResponse = await getAllBrands();
  const brands = brandsResponse.brands || brandsResponse.data || brandsResponse;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-4xl font-bold text-gray-800'>Consecionario de Autos</h1>
        <Link href="/brands/add" className={buttonVariants({ className: "px-6 py-2 text-lg" })}>
          Crear Marca
        </Link>

        <Link href="/cars/" className={buttonVariants({ className: "px-5 py-1 text-lg" })}>
          AUTOS
        </Link>

      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b text-left text-gray-700 font-semibold">Nombre</th>
              <th className="px-6 py-3 border-b text-left text-gray-700 font-semibold">Descripción</th>
              <th className="px-6 py-3 border-b text-left text-gray-700 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(brands) && brands.length > 0 ? (
              brands.map((brand: any) => (
                <tr key={brand.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 border-b">{brand.name}</td>
                  <td className="px-6 py-4 border-b">{brand.description}</td>
                  <td className="px-6 py-4 border-b flex gap-2">
                    <Link href={`/brands/edit_brands/${brand.id}`}>
                      <Button variant="outline" size="sm">Editar</Button>
                    </Link>
                    <Link href={`/brands/delete_brands?id=${brand.id}`}>
                      <Button variant="destructive" size="sm">Eliminar</Button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                  No hay marcas registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
