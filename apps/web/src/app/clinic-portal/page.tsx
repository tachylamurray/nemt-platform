'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  ArrowLeft, 
  Building2, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Plus,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  Navigation
} from 'lucide-react'

export default function ClinicPortalPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'patients'>('dashboard')
  const [showBulkBooking, setShowBulkBooking] = useState(false)

  // Mock data for demonstration
  const upcomingTrips = [
    {
      id: '1',
      patientName: 'John Smith',
      pickupTime: '2024-01-15T09:00:00',
      pickupAddress: '123 Main St, Springfield, IL',
      destination: 'General Medical Center',
      status: 'confirmed',
      vehicleType: 'AUTONOMOUS',
    },
    {
      id: '2',
      patientName: 'Jane Doe',
      pickupTime: '2024-01-15T10:30:00',
      pickupAddress: '456 Oak Ave, Springfield, IL',
      destination: 'Specialty Clinic',
      status: 'in_progress',
      vehicleType: 'WAV',
    },
    {
      id: '3',
      patientName: 'Robert Johnson',
      pickupTime: '2024-01-15T14:00:00',
      pickupAddress: '789 Pine Rd, Springfield, IL',
      destination: 'Dialysis Center',
      status: 'pending',
      vehicleType: 'COMPANION_VEHICLE',
    },
  ]

  const patients = [
    {
      id: '1',
      name: 'John Smith',
      medicaidId: 'MED123456',
      phone: '(555) 123-4567',
      lastTrip: '2024-01-10',
      totalTrips: 12,
    },
    {
      id: '2',
      name: 'Jane Doe',
      medicaidId: 'MED789012',
      phone: '(555) 987-6543',
      lastTrip: '2024-01-12',
      totalTrips: 8,
    },
    {
      id: '3',
      name: 'Robert Johnson',
      medicaidId: 'MED345678',
      phone: '(555) 456-7890',
      lastTrip: '2024-01-08',
      totalTrips: 24,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getVehicleTypeLabel = (type: string) => {
    switch (type) {
      case 'AUTONOMOUS':
        return 'Autonomous'
      case 'WAV':
        return 'Wheelchair Van'
      case 'COMPANION_VEHICLE':
        return 'Companion Vehicle'
      default:
        return type
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" role="navigation" aria-label="Main navigation">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Button variant="ghost" size="lg">
                <ArrowLeft className="h-5 w-5 mr-2" aria-hidden="true" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-primary" aria-hidden="true" />
              <span className="text-2xl font-bold">Clinic Portal</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">General Medical Center</span>
              <Button variant="outline" size="sm">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="mb-8" role="tablist" aria-label="Clinic portal tabs">
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'dashboard' ? 'default' : 'outline'}
              size="lg"
              onClick={() => setActiveTab('dashboard')}
              role="tab"
              aria-selected={activeTab === 'dashboard'}
              aria-controls="dashboard-panel"
            >
              Dashboard
            </Button>
            <Button
              variant={activeTab === 'bookings' ? 'default' : 'outline'}
              size="lg"
              onClick={() => setActiveTab('bookings')}
              role="tab"
              aria-selected={activeTab === 'bookings'}
              aria-controls="bookings-panel"
            >
              Bookings
            </Button>
            <Button
              variant={activeTab === 'patients' ? 'default' : 'outline'}
              size="lg"
              onClick={() => setActiveTab('patients')}
              role="tab"
              aria-selected={activeTab === 'patients'}
              aria-controls="patients-panel"
            >
              Patients
            </Button>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div id="dashboard-panel" role="tabpanel" aria-labelledby="dashboard-tab">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Today's Trips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground mt-1">3 completed, 9 pending</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">87</div>
                  <p className="text-xs text-muted-foreground mt-1">+12% from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Patients</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground mt-1">8 new this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">On-Time Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">94.2%</div>
                  <p className="text-xs text-muted-foreground mt-1">Above target (90%)</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Button size="lg" className="h-20 text-lg" onClick={() => setShowBulkBooking(true)}>
                  <Plus className="h-6 w-6 mr-2" aria-hidden="true" />
                  Bulk Book Rides
                </Button>
                <Button size="lg" variant="outline" className="h-20 text-lg">
                  <Users className="h-6 w-6 mr-2" aria-hidden="true" />
                  Add New Patient
                </Button>
                <Button size="lg" variant="outline" className="h-20 text-lg">
                  <Filter className="h-6 w-6 mr-2" aria-hidden="true" />
                  View Reports
                </Button>
              </div>
            </div>

            {/* Upcoming Trips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Upcoming Trips Today</CardTitle>
                <CardDescription>Track your patients' scheduled transportation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTrips.map((trip) => (
                    <div key={trip.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{trip.patientName}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(trip.status)}`}>
                              {trip.status.charAt(0).toUpperCase() + trip.status.slice(1).replace('_', ' ')}
                            </span>
                          </div>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="h-4 w-4 mr-2" aria-hidden="true" />
                              {new Date(trip.pickupTime).toLocaleTimeString('en-US', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <MapPin className="h-4 w-4 mr-2" aria-hidden="true" />
                              {trip.pickupAddress}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Navigation className="h-4 w-4 mr-2" aria-hidden="true" />
                              {trip.destination}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <CheckCircle className="h-4 w-4 mr-2" aria-hidden="true" />
                              {getVehicleTypeLabel(trip.vehicleType)}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4" aria-hidden="true" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div id="bookings-panel" role="tabpanel" aria-labelledby="bookings-tab">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">All Bookings</CardTitle>
                    <CardDescription>Manage and track all transportation bookings</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <Input
                        placeholder="Search bookings..."
                        className="pl-10 w-64"
                        aria-label="Search bookings"
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" aria-hidden="true" />
                      Filter
                    </Button>
                    <Button onClick={() => setShowBulkBooking(true)}>
                      <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
                      New Booking
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full" role="grid">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Patient</th>
                        <th className="text-left p-3 font-semibold">Date & Time</th>
                        <th className="text-left p-3 font-semibold">Pickup</th>
                        <th className="text-left p-3 font-semibold">Destination</th>
                        <th className="text-left p-3 font-semibold">Status</th>
                        <th className="text-left p-3 font-semibold">Vehicle</th>
                        <th className="text-left p-3 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcomingTrips.map((trip) => (
                        <tr key={trip.id} className="border-b hover:bg-muted/50">
                          <td className="p-3 font-medium">{trip.patientName}</td>
                          <td className="p-3">
                            {new Date(trip.pickupTime).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                            <br />
                            <span className="text-sm text-muted-foreground">
                              {new Date(trip.pickupTime).toLocaleTimeString('en-US', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                          </td>
                          <td className="p-3 text-sm">{trip.pickupAddress}</td>
                          <td className="p-3 text-sm">{trip.destination}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(trip.status)}`}>
                              {trip.status.charAt(0).toUpperCase() + trip.status.slice(1).replace('_', ' ')}
                            </span>
                          </td>
                          <td className="p-3 text-sm">{getVehicleTypeLabel(trip.vehicleType)}</td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">View</Button>
                              <Button variant="ghost" size="sm">Edit</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Patients Tab */}
        {activeTab === 'patients' && (
          <div id="patients-panel" role="tabpanel" aria-labelledby="patients-tab">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Patient Directory</CardTitle>
                    <CardDescription>Manage your clinic's patient roster</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <Input
                        placeholder="Search patients..."
                        className="pl-10 w-64"
                        aria-label="Search patients"
                      />
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
                      Add Patient
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {patients.map((patient) => (
                    <Card key={patient.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{patient.name}</CardTitle>
                        <CardDescription>
                          Medicaid ID: {patient.medicaidId}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
                            {patient.phone}
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-2" aria-hidden="true" />
                            Last trip: {patient.lastTrip}
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Navigation className="h-4 w-4 mr-2" aria-hidden="true" />
                            Total trips: {patient.totalTrips}
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm" className="flex-1">
                            Book Ride
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            View Profile
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Bulk Booking Modal */}
        {showBulkBooking && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" role="dialog" aria-modal="true" aria-labelledby="bulk-booking-title">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle id="bulk-booking-title" className="text-2xl">Bulk Book Rides</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowBulkBooking(false)}>
                    Close
                  </Button>
                </div>
                <CardDescription>
                  Schedule multiple rides for patients at once
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6" aria-label="Bulk booking form">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Trip Details</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="destination">Destination (Medical Facility) *</Label>
                      <Input
                        id="destination"
                        placeholder="e.g., General Medical Center"
                        aria-required="true"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date *</Label>
                        <Input
                          id="date"
                          type="date"
                          aria-required="true"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">Time *</Label>
                        <Input
                          id="time"
                          type="time"
                          aria-required="true"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="appointmentType">Appointment Type *</Label>
                      <select
                        id="appointmentType"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        aria-required="true"
                      >
                        <option value="">Select appointment type</option>
                        <option value="primary_care">Primary Care Visit</option>
                        <option value="specialist">Specialist Visit</option>
                        <option value="dialysis">Dialysis Treatment</option>
                        <option value="physical_therapy">Physical Therapy</option>
                        <option value="diagnostic_imaging">Diagnostic Imaging</option>
                        <option value="lab_work">Lab Work</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Add Patients</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="patientSearch">Search Patient</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        <Input
                          id="patientSearch"
                          placeholder="Search by name or Medicaid ID..."
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-2">Selected Patients (0)</p>
                      <div className="text-sm text-muted-foreground">
                        Search and add patients above
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowBulkBooking(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1">
                      Book All Rides
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
