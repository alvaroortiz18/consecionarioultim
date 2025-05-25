
"use client";

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input} from '@/components/ui/input'
import { useForm } from "react-hook-form";
import { addBrands } from '../brands.api';
import { BrandData } from '../../../interface/brand.interface'; 
import { useRouter } from 'next/navigation';

export function BrandForm() {
    const { register, handleSubmit } = useForm<BrandData>();
    const router = useRouter();

    const onSubmit = handleSubmit(async(data) => {
        console.log(data);
        await addBrands(data);
        router.push("/");
    });
    
    return (
        <form onSubmit={onSubmit}>

            <Label>Marca</Label>
            <Input {...register("name")} />
            <Label>Descripcion</Label>
            <Input {...register("description")} />
            <Button type="submit">Agregar Marca</Button>
        </form>
    );
}
        