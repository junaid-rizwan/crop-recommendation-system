"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

// Mock data - replace with actual data from your API or database
const lastCrop = {
  name: "Wheat",
  recommendedDate: "2023-05-15",
  expectedYield: "5.2 tons/hectare"
}

const soilData = [
  { name: 'Nitrogen', value: 80 },
  { name: 'Phosphorus', value: 45 },
  { name: 'Potassium', value: 60 },
]

const environmentData = [
  { name: 'Temperature', value: 25 },
  { name: 'Humidity', value: 65 },
  { name: 'pH', value: 6.5 },
  { name: 'Rainfall', value: 1200 },
]

const financialData = [
  { name: 'Revenue', value: 10000 },
  { name: 'Expenses', value: 6000 },
  { name: 'Profit', value: 4000 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#A4DE6C']

const pastRecommendations = [
  { id: 1, date: '2023-01-15', crop: 'Corn', yield: '7.5 tons/hectare', profit: 3500, expenditure: 4000 },
  { id: 2, date: '2023-03-20', crop: 'Soybeans', yield: '3.2 tons/hectare', profit: 2800, expenditure: 3200 },
  { id: 3, date: '2023-05-15', crop: 'Wheat', yield: '5.2 tons/hectare', profit: 3200, expenditure: 3800 },
  { id: 4, date: '2023-07-10', crop: 'Rice', yield: '6.8 tons/hectare', profit: 4000, expenditure: 4500 },
  { id: 5, date: '2023-09-05', crop: 'Potatoes', yield: '25 tons/hectare', profit: 5500, expenditure: 6000 },
]

const farmPerformanceTrends = [
  { year: 2019, yield: 4.8, profit: 3000, expenditure: 5000 },
  { year: 2020, yield: 5.1, profit: 3500, expenditure: 5200 },
  { year: 2021, yield: 5.5, profit: 4000, expenditure: 5500 },
  { year: 2022, yield: 5.3, profit: 3800, expenditure: 5800 },
  { year: 2023, yield: 5.7, profit: 4200, expenditure: 6000 },
]

export default function Dashboard() {
  const [selectedCrop, setSelectedCrop] = useState('all')

  const filteredRecommendations = selectedCrop === 'all'
    ? pastRecommendations
    : pastRecommendations.filter(rec => rec.crop.toLowerCase() === selectedCrop)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Crop Recommendation Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Last Recommended Crop</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">Crop:</span>
                <Badge>{lastCrop.name}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Recommended Date:</span>
                <span>{lastCrop.recommendedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Expected Yield:</span>
                <span>{lastCrop.expectedYield}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Soil Analysis</CardTitle>
            <CardDescription>Nitrogen, Phosphorus, Potassium levels (mg/kg)</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={soilData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Environmental Factors</CardTitle>
            <CardDescription>Temperature (°C), Humidity (%), pH, Rainfall (mm)</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={environmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Financial Analysis</CardTitle>
            <CardDescription>Revenue, Expenses, and Profit</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={financialData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {financialData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Past Recommendations</CardTitle>
            <CardDescription>Historical crop recommendations, yields, profits, and expenditures</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Crops</SelectItem>
                  <SelectItem value="corn">Corn</SelectItem>
                  <SelectItem value="soybeans">Soybeans</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="potatoes">Potatoes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Crop</TableHead>
                  <TableHead>Yield</TableHead>
                  <TableHead>Expenditure</TableHead>
                  <TableHead>Profit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecommendations.map((rec) => (
                  <TableRow key={rec.id}>
                    <TableCell>{rec.date}</TableCell>
                    <TableCell>{rec.crop}</TableCell>
                    <TableCell>{rec.yield}</TableCell>
                    <TableCell>${rec.expenditure}</TableCell>
                    <TableCell>${rec.profit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Farm Performance Trends</CardTitle>
            <CardDescription>Yield, Profit, and Expenditure Trends Over Time</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={farmPerformanceTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="yield" stroke="#8884d8" name="Yield (tons/hectare)" />
                <Line yAxisId="right" type="monotone" dataKey="profit" stroke="#82ca9d" name="Profit ($)" />
                <Line yAxisId="right" type="monotone" dataKey="expenditure" stroke="#ffc658" name="Expenditure ($)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}