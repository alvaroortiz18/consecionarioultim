import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { EditBrandForm } from '../edit_brand_form'

interface Props {
  params: { id: string }
}

export default function EditBrandPage({ params }: Props) {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>EDITAR MARCA</CardTitle>
        </CardHeader>
        <CardContent>
          <EditBrandForm brandId={params.id} />
        </CardContent>
      </Card>
    </div>
  )
}
