import { BrandData, BrandResponse } from '../../interface/brand.interface';

export async function getAllBrands(offset: number = 0, limit: number = 5): Promise<BrandResponse> {
    const response = await fetch(
        `http://localhost:4000/api/v1/brands?offset=${offset}&limit=${limit}`,
        { cache: 'no-store' }
    );
    return await response.json();
}

export async function addBrands(brandData: BrandData) {
    const res = await fetch('http://localhost:4000/api/v1/brands', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(brandData),
    });

    return await res.json();
}

// Agrega la función para actualizar una marca
export async function updateBrand(id: string, brandData: BrandData) {
    const res = await fetch(`http://localhost:4000/api/v1/brands/${id}`, {
        method: 'PATCH', // <-- Cambia aquí
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(brandData),
    });
    return await res.json();
}

export async function getBrandById(id: string) {
    const res = await fetch(`http://localhost:4000/api/v1/brands/${id}`, {
        cache: 'no-store'
    });
    return await res.json();
}

export async function deleteBrand(id: string) {
    const res = await fetch(`http://localhost:4000/api/v1/brands/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await res.json();
}