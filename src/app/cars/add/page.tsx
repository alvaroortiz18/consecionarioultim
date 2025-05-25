import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { CarForm } from './car-form'

function CarsAddPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Agregar Auto</CardTitle>
        </CardHeader>
        <CardContent>
          <CarForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default CarsAddPage
