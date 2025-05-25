import { CarData } from '../../interface/car.interface';

// Obtener todos los autos
export async function getAllCars(offset?: number, limit?: number) {
  let url = 'http://localhost:4000/api/v1/cars';
  const params = [];
  if (typeof offset === 'number' && offset >= 0) params.push(`offset=${offset}`);
  if (typeof limit === 'number' && limit > 0) params.push(`limit=${limit}`);
  if (params.length) url += '?' + params.join('&');

  const response = await fetch(url, { cache: 'no-store' });
  return await response.json();
}

// Obtener un auto por ID
export async function getCarById(id: string) {
    const response = await fetch(`http://localhost:4000/api/v1/cars/${id}`, {
        cache: 'no-store'
    });
    return await response.json();
}

// Agregar un auto
export async function addCar(carData: CarData) {
  const token = localStorage.getItem("token");
  const response = await fetch('http://localhost:4000/api/v1/cars', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(carData),
  });
  return await response.json();
}

// Actualizar un auto
export async function updateCar(id: string, carData: CarData) {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:4000/api/v1/cars/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(carData),
  });
  const result = await response.json();
  console.log("Respuesta backend update:", result);
  return result;
}

// Eliminar un auto
export async function deleteCar(id: string) {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:4000/api/v1/cars/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return await response.json();
}

