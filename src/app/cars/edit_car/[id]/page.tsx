import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import EditCarForm from '../edit_car_form'

interface Props {
  params: { id: string }
}

export default function EditCarPage({ params }: Props) {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>EDITAR AUTO</CardTitle>
        </CardHeader>
        <CardContent>
          <EditCarForm carId={params.id} />
        </CardContent>
      </Card>
    </div>
  )
}
