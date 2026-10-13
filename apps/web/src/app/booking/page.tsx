'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Calendar, MapPin, Clock, Accessibility, User, Phone, CheckCircle, AlertCircle } from 'lucide-react'

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const [formData, setFormData] = useState({
    // Patient Information
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    
    // Insurance Information
    medicaidId: '',
    medicareId: '',
    insurancePlan: '',
    
    // Trip Details
    pickupAddress: '',
    pickupCity: '',
    pickupState: '',
    pickupZip: '',
    dropoffAddress: '',
    dropoffCity: '',
    dropoffState: '',
    dropoffZip: '',
    
    // Appointment Details
    appointmentDate: '',
    appointmentTime: '',
    appointmentType: '',
    
    // Mobility Requirements
    mobilityTier: 'TIER_1',
    requiresWheelchair: false,
    requiresCompanion: false,
    specialNeeds: '',
    
    // Emergency Contact
    emergencyContactName: '',
    emergencyContactPhone: '',
  })

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.pickupAddress.trim()) newErrors.pickupAddress = 'Pickup address is required'
    if (!formData.pickupCity.trim()) newErrors.pickupCity = 'City is required'
    if (!formData.pickupState.trim()) newErrors.pickupState = 'State is required'
    if (!formData.pickupZip.trim()) newErrors.pickupZip = 'ZIP code is required'
    if (!formData.dropoffAddress.trim()) newErrors.dropoffAddress = 'Destination address is required'
    if (!formData.dropoffCity.trim()) newErrors.dropoffCity = 'City is required'
    if (!formData.dropoffState.trim()) newErrors.dropoffState = 'State is required'
    if (!formData.dropoffZip.trim()) newErrors.dropoffZip = 'ZIP code is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.appointmentDate) newErrors.appointmentDate = 'Appointment date is required'
    if (!formData.appointmentTime) newErrors.appointmentTime = 'Appointment time is required'
    if (!formData.appointmentType.trim()) newErrors.appointmentType = 'Appointment type is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep4 = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.emergencyContactName.trim()) newErrors.emergencyContactName = 'Emergency contact name is required'
    if (!formData.emergencyContactPhone.trim()) newErrors.emergencyContactPhone = 'Emergency contact phone is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    let isValid = false
    
    switch (step) {
      case 1:
        isValid = validateStep1()
        break
      case 2:
        isValid = validateStep2()
        break
      case 3:
        isValid = validateStep3()
        break
      case 4:
        isValid = validateStep4()
        break
    }
    
    if (isValid && step < 4) {
      setStep(step + 1)
      setErrors({})
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      setErrors({})
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateStep4()) return
    
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Here you would make an actual API call to create the booking
    console.log('Booking submitted:', formData)

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background flex items-center justify-center p-4">
        <Card className="max-w-lg w-full">
          <CardHeader className="text-center">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" aria-hidden="true" />
            <CardTitle className="text-3xl">Booking Confirmed!</CardTitle>
            <CardDescription className="text-lg">
              Your ride has been scheduled. You will receive a confirmation call shortly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold">Booking Details:</p>
              <p className="text-lg">Date: {formData.appointmentDate}</p>
              <p className="text-lg">Time: {formData.appointmentTime}</p>
              <p className="text-lg">From: {formData.pickupAddress}</p>
              <p className="text-lg">To: {formData.dropoffAddress}</p>
            </div>
            <Link href="/">
              <Button size="lg" className="w-full text-lg py-6">
                Return to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background">
      {/* Demo Mode Badge */}
      <div className="bg-amber-100 border-b border-amber-200 text-amber-800 text-center py-2 text-sm font-medium">
        ⚠️ Demo Mode - This is a prototype demonstrating the booking system. Full functionality coming soon.
      </div>

      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" role="navigation" aria-label="Main navigation">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Button variant="ghost" size="lg" className="text-lg">
                <ArrowLeft className="h-5 w-5 mr-2" aria-hidden="true" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Accessibility className="h-8 w-8 text-primary" aria-hidden="true" />
              <span className="text-2xl font-bold">Book a Ride</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Progress Indicator */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-2" role="progressbar" aria-valuenow={step} aria-valuemin="1" aria-valuemax="4" aria-label="Booking progress">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                    stepNumber <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}
                  aria-current={stepNumber === step ? 'step' : undefined}
                >
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={`w-16 h-1 mx-2 ${stepNumber < step ? 'bg-primary' : 'bg-muted'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-lg font-medium">
            {step === 1 && 'Step 1: Patient Information'}
            {step === 2 && 'Step 2: Trip Details'}
            {step === 3 && 'Step 3: Appointment & Mobility'}
            {step === 4 && 'Step 4: Emergency Contact'}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">
                {step === 1 && 'Patient Information'}
                {step === 2 && 'Trip Details'}
                {step === 3 && 'Appointment & Mobility Requirements'}
                {step === 4 && 'Emergency Contact'}
              </CardTitle>
              <CardDescription className="text-lg">
                Please fill in the required information marked with *
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6" aria-label="Booking form">
                {/* Step 1: Patient Information */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold flex items-center">
                        <User className="h-6 w-6 mr-2" aria-hidden="true" />
                        Personal Information
                      </h2>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-lg">First Name *</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="John"
                            className="text-lg h-12"
                            aria-required="true"
                            aria-invalid={!!errors.firstName}
                            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                          />
                          {errors.firstName && (
                            <p id="firstName-error" className="text-red-500 text-sm flex items-center" role="alert">
                              <AlertCircle className="h-4 w-4 mr-1" aria-hidden="true" />
                              {errors.firstName}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-lg">Last Name *</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Smith"
                            className="text-lg h-12"
                            aria-required="true"
                            aria-invalid={!!errors.lastName}
                            aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                          />
                          {errors.lastName && (
                            <p id="lastName-error" className="text-red-500 text-sm flex items-center" role="alert">
                              <AlertCircle className="h-4 w-4 mr-1" aria-hidden="true" />
                              {errors.lastName}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber" className="text-lg">Phone Number *</Label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
                          <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            required
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="(555) 123-4567"
                            className="text-lg h-12 pl-12"
                            aria-required="true"
                            aria-invalid={!!errors.phoneNumber}
                            aria-describedby={errors.phoneNumber ? 'phoneNumber-error' : undefined}
                          />
                        </div>
                        {errors.phoneNumber && (
                          <p id="phoneNumber-error" className="text-red-500 text-sm flex items-center" role="alert">
                            <AlertCircle className="h-4 w-4 mr-1" aria-hidden="true" />
                            {errors.phoneNumber}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-lg">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="text-lg h-12"
                          aria-required="true"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                        />
                        {errors.email && (
                          <p id="email-error" className="text-red-500 text-sm flex items-center" role="alert">
                            <AlertCircle className="h-4 w-4 mr-1" aria-hidden="true" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold">Insurance Information</h2>
                      
                      <div className="space-y-2">
                        <Label htmlFor="medicaidId" className="text-lg">Medicaid ID (if applicable)</Label>
                        <Input
                          id="medicaidId"
                          name="medicaidId"
                          value={formData.medicaidId}
                          onChange={handleChange}
                          placeholder="Your Medicaid ID"
                          className="text-lg h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="medicareId" className="text-lg">Medicare ID (if applicable)</Label>
                        <Input
                          id="medicareId"
                          name="medicareId"
                          value={formData.medicareId}
                          onChange={handleChange}
                          placeholder="Your Medicare ID"
                          className="text-lg h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="insurancePlan" className="text-lg">Insurance Plan Name</Label>
                        <Input
                          id="insurancePlan"
                          name="insurancePlan"
                          value={formData.insurancePlan}
                          onChange={handleChange}
                          placeholder="Your insurance plan"
                          className="text-lg h-12"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Trip Details */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold flex items-center">
                        <MapPin className="h-6 w-6 mr-2" aria-hidden="true" />
                        Pickup Location
                      </h2>
                      
                      <div className="space-y-2">
                        <Label htmlFor="pickupAddress" className="text-lg">Street Address *</Label>
                        <Input
                          id="pickupAddress"
                          name="pickupAddress"
                          required
                          value={formData.pickupAddress}
                          onChange={handleChange}
                          placeholder="123 Main Street"
                          className="text-lg h-12"
                          aria-required="true"
                          aria-invalid={!!errors.pickupAddress}
                          aria-describedby={errors.pickupAddress ? 'pickupAddress-error' : undefined}
                        />
                        {errors.pickupAddress && (
                          <p id="pickupAddress-error" className="text-red-500 text-sm flex items-center" role="alert">
                            <AlertCircle className="h-4 w-4 mr-1" aria-hidden="true" />
                            {errors.pickupAddress}
                          </p>
                        )}
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="pickupCity" className="text-lg">City *</Label>
                          <Input
                            id="pickupCity"
                            name="pickupCity"
                            required
                            value={formData.pickupCity}
                            onChange={handleChange}
                            placeholder="Springfield"
                            className="text-lg h-12"
                            aria-required="true"
                            aria-invalid={!!errors.pickupCity}
                            aria-describedby={errors.pickupCity ? 'pickupCity-error' : undefined}
                          />
                          {errors.pickupCity && (
                            <p id="pickupCity-error" className="text-red-500 text-sm flex items-center" role="alert">
                              <AlertCircle className="h-4 w-4 mr-1" aria-hidden="true" />
                              {errors.pickupCity}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="pickupState" className="text-lg">State *</Label>
                          <Input
                            id="pickupState"
                            name="pickupState"
                            required
                            value={formData.pickupState}
                            onChange={handleChange}
                            placeholder="IL"
                            maxLength={2}
                            className="text-lg h-12"
                            aria-required="true"
                            aria-invalid={!!errors.pickupState}
                            aria-describedby={errors.pickupState ? 'pickupState-error' : undefined}
                          />
                          {errors.pickupState && (
                            <p id="pickupState-error" className="text-red-500 text-sm flex items-center" role="alert">
                              <AlertCircle className="h-4 w-4 mr-1" aria-hidden="true" />
                              {errors.pickupState}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="pickupZip" className="text-lg">ZIP Code *</Label>
                          <Input
                            id="pickupZip"
                            name="pickupZip"
                            required
                            value={formData.pickupZip}
                            onChange={handleChange}
                            placeholder="62701"
                            maxLength={5}
                            className="text-lg h-12"
                            aria-required="true"
                            aria-invalid={!!errors.pickupZip}
                            aria-describedby={errors.pickupZip ? 'pickupZip-error' : undefined}
                          />
                          {errors.pickupZip && (
                            <p id="pickupZip-error" className="text-red-500 text-sm flex items-center" role="alert">
                              <AlertCircle className="h-4 w-4 mr-1" aria-hidden="true" />
                              {errors.pickupZip}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold">Destination</h2>
                      
                      <div className="space-y-2">
                        <Label htmlFor="dropoffAddress" className="text-lg">Street Address *</Label>
                        <Input
                          id="dropoffAddress"
                          name="dropoffAddress"
                          required
                          value={formData.dropoffAddress}
                          onChange={handleChange}
                          placeholder="456 Medical Center Dr"
                          className="text-lg h-12"
                          aria-required="true"
                          aria-invalid={!!errors.dropoffAddress}
                          aria-describedby={errors.dropoffAddress ? 'dropoffAddress-error' : undefined}
                        />
                        {errors.dropoffAddress && (
                          <p id="dropoffAddress-error" className="text-red-500 text-sm flex items-center" role="alert">
                            <AlertCircle className="h-4 w-4 mr-1" aria-hidden="true" />
                            {errors.dropoffAddress}
                          </p>
                        )}
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="dropoffCity" className="text-lg">City *</Label>
                          <Input
                            id="dropoffCity"
                            name="dropoffCity"
                            required
                            value={formData.dropoffCity}
                            onChange={handleChange}
                            placeholder="Springfield"
                            className="text-lg h-12"
                            aria-required="true"
                            aria-invalid={!!errors.dropoffCity}
                            aria-describedby={errors.dropoffCity ? 'dropoffCity-error' : undefined}
                          />
                          {errors.dropoffCity && (
                            <p id="dropoffCity-error" className="text-red-500 text-sm flex items-center" role="alert">
                              <AlertCircle className="h-4 w-4 mr-1" aria-hidden="true" />
                              {errors.dropoffCity}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="dropoffState" className="text-lg">State *</Label>
                          <Input
                            id="dropoffState"
                            name="dropoffState"
                            required
                            value={formData.dropoffState}
                            onChange={handleChange}
                            placeholder="IL"
                            maxLength={2}
                            className="text-lg h-12"
                            aria-required="true"
                            aria-invalid={!!errors.dropoffState}
                            aria-describedby={errors.dropoffState ? 'dropoffState-error' : undefined}
                          />
                          {errors.dropoffState && (
                            <p id="dropoffState-error" className="text-red-500 text-sm flex items-center" role="alert">
                              <AlertCircle className="h-4 w-4 mr-1" aria-hidden="true" />
                              {errors.dropoffState}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="dropoffZip" className="text-lg">ZIP Code *</Label>
                          <Input
                            id="dropoffZip"
                            name="dropoffZip"
                            required
                            value={formData.dropoffZip}
                            onChange={handleChange}
                            placeholder="62702"
                            maxLength={5}
                            className="text-lg h-12"
                            aria-required="true"
                            aria-invalid={!!errors.dropoffZip}
                            aria-describedby={errors.dropoffZip ? 'dropoffZip-error' : undefined}
                          />
                          {errors.dropoffZip && (
                            <p id="dropoffZip-error" className="text-red-500 text-sm flex items-center" role="alert">
                              <AlertCircle className="h-4 w-4 mr-1" aria-hidden="true" />
                              {errors.dropoffZip}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Appointment & Mobility */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold flex items-center">
                        <Calendar className="h-6 w-6 mr-2" aria-hidden="true" />
                        Appointment Details
                      </h2>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="appointmentDate" className="text-lg">Appointment Date *</Label>
                          <Input
                            id="appointmentDate"
                            name="appointmentDate"
                            type="date"
                            required
                            value={formData.appointmentDate}
                            onChange={handleChange}
                            className="text-lg h-12"
                            aria-required="true"
                            aria-invalid={!!errors.appointmentDate}
                            aria-describedby={errors.appointmentDate ? 'appointmentDate-error' : undefined}
                          />
                          {errors.appointmentDate && (
                            <p id="appointmentDate-error" className="text-red-500 text-sm flex items-center" role="alert">
                              <AlertCircle className="h-4 w-4 mr-1" aria-hidden="true" />
                              {errors.appointmentDate}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="appointmentTime" className="text-lg">Appointment Time *</Label>
                          <Input
                            id="appointmentTime"
                            name="appointmentTime"
                            type="time"
                            required
                            value={formData.appointmentTime}
                            onChange={handleChange}
                            className="text-lg h-12"
                            aria-required="true"
                            aria-invalid={!!errors.appointmentTime}
                            aria-describedby={errors.appointmentTime ? 'appointmentTime-error' : undefined}
                          />
                          {errors.appointmentTime && (
                            <p id="appointmentTime-error" className="text-red-500 text-sm flex items-center" role="alert">
                              <AlertCircle className="h-4 w-4 mr-1" aria-hidden="true" />
                              {errors.appointmentTime}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="appointmentType" className="text-lg">Appointment Type *</Label>
                        <select
                          id="appointmentType"
                          name="appointmentType"
                          required
                          value={formData.appointmentType}
                          onChange={handleChange}
                          className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          aria-required="true"
                          aria-invalid={!!errors.appointmentType}
                          aria-describedby={errors.appointmentType ? 'appointmentType-error' : undefined}
                        >
                          <option value="">Select appointment type</option>
                          <option value="primary_care">Primary Care Visit</option>
                          <option value="specialist">Specialist Visit</option>
                          <option value="dialysis">Dialysis Treatment</option>
                          <option value="physical_therapy">Physical Therapy</option>
                          <option value="diagnostic_imaging">Diagnostic Imaging (X-ray, MRI, CT)</option>
                          <option value="lab_work">Lab Work</option>
                          <option value="pharmacy">Pharmacy Pickup</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.appointmentType && (
                          <p id="appointmentType-error" className="text-red-500 text-sm flex items-center" role="alert">
                            <AlertCircle className="h-4 w-4 mr-1" aria-hidden="true" />
                            {errors.appointmentType}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold flex items-center">
                        <Accessibility className="h-6 w-6 mr-2" aria-hidden="true" />
                        Mobility Requirements
                      </h2>
                      
                      <div className="space-y-2">
                        <Label htmlFor="mobilityTier" className="text-lg">Service Tier</Label>
                        <select
                          id="mobilityTier"
                          name="mobilityTier"
                          value={formData.mobilityTier}
                          onChange={handleChange}
                          className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          <option value="TIER_1">Tier 1: Autonomous Vehicle (Standard)</option>
                          <option value="TIER_2">Tier 2: Autonomous + Companion</option>
                          <option value="TIER_3">Tier 3: Wheelchair Accessible Vehicle</option>
                        </select>
                        <p className="text-sm text-muted-foreground">
                          {formData.mobilityTier === 'TIER_1' && 'Self-driving vehicle for ambulatory patients'}
                          {formData.mobilityTier === 'TIER_2' && 'Autonomous vehicle with trained medical companion'}
                          {formData.mobilityTier === 'TIER_3' && 'Wheelchair accessible vehicle with professional driver'}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            id="requiresWheelchair"
                            name="requiresWheelchair"
                            checked={formData.requiresWheelchair}
                            onChange={handleChange}
                            className="h-6 w-6 rounded border-input"
                          />
                          <Label htmlFor="requiresWheelchair" className="text-lg cursor-pointer">
                            I require a wheelchair
                          </Label>
                        </div>

                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            id="requiresCompanion"
                            name="requiresCompanion"
                            checked={formData.requiresCompanion}
                            onChange={handleChange}
                            className="h-6 w-6 rounded border-input"
                          />
                          <Label htmlFor="requiresCompanion" className="text-lg cursor-pointer">
                            I need assistance boarding/exiting vehicle
                          </Label>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="specialNeeds" className="text-lg">Special Needs (Optional)</Label>
                        <textarea
                          id="specialNeeds"
                          name="specialNeeds"
                          value={formData.specialNeeds}
                          onChange={handleChange}
                          placeholder="Any additional assistance or accommodations needed..."
                          rows={3}
                          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Emergency Contact */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold flex items-center">
                        <Phone className="h-6 w-6 mr-2" aria-hidden="true" />
                        Emergency Contact
                      </h2>
                      <p className="text-muted-foreground text-lg">
                        Please provide someone we can contact in case of emergency during your trip.
                      </p>
                      
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContactName" className="text-lg">Emergency Contact Name *</Label>
                        <Input
                          id="emergencyContactName"
                          name="emergencyContactName"
                          required
                          value={formData.emergencyContactName}
                          onChange={handleChange}
                          placeholder="Jane Smith"
                          className="text-lg h-12"
                          aria-required="true"
                          aria-invalid={!!errors.emergencyContactName}
                          aria-describedby={errors.emergencyContactName ? 'emergencyContactName-error' : undefined}
                        />
                        {errors.emergencyContactName && (
                          <p id="emergencyContactName-error" className="text-red-500 text-sm flex items-center" role="alert">
                            <AlertCircle className="h-4 w-4 mr-1" aria-hidden="true" />
                            {errors.emergencyContactName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="emergencyContactPhone" className="text-lg">Emergency Contact Phone *</Label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
                          <Input
                            id="emergencyContactPhone"
                            name="emergencyContactPhone"
                            type="tel"
                            required
                            value={formData.emergencyContactPhone}
                            onChange={handleChange}
                            placeholder="(555) 987-6543"
                            className="text-lg h-12 pl-12"
                            aria-required="true"
                            aria-invalid={!!errors.emergencyContactPhone}
                            aria-describedby={errors.emergencyContactPhone ? 'emergencyContactPhone-error' : undefined}
                          />
                        </div>
                        {errors.emergencyContactPhone && (
                          <p id="emergencyContactPhone-error" className="text-red-500 text-sm flex items-center" role="alert">
                            <AlertCircle className="h-4 w-4 mr-1" aria-hidden="true" />
                            {errors.emergencyContactPhone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-muted p-6 rounded-lg space-y-4">
                      <h3 className="text-xl font-semibold">Booking Summary</h3>
                      <div className="space-y-2 text-lg">
                        <p><strong>Patient:</strong> {formData.firstName} {formData.lastName}</p>
                        <p><strong>Appointment:</strong> {formData.appointmentDate} at {formData.appointmentTime}</p>
                        <p><strong>From:</strong> {formData.pickupAddress}, {formData.pickupCity}, {formData.pickupState}</p>
                        <p><strong>To:</strong> {formData.dropoffAddress}, {formData.dropoffCity}, {formData.dropoffState}</p>
                        <p><strong>Service:</strong> {formData.mobilityTier === 'TIER_1' ? 'Autonomous Vehicle' : formData.mobilityTier === 'TIER_2' ? 'Autonomous + Companion' : 'Wheelchair Accessible'}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4 pt-4">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={handleBack}
                      className="flex-1 text-lg py-6"
                    >
                      Back
                    </Button>
                  )}
                  
                  {step < 4 ? (
                    <Button
                      type="button"
                      size="lg"
                      onClick={handleNext}
                      className="flex-1 text-lg py-6"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="flex-1 text-lg py-6"
                      aria-live="polite"
                    >
                      {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
                    </Button>
                  )}
                </div>

                <p className="text-center text-lg text-muted-foreground">
                  Need help? Call us at <a href="tel:1-800-555-1234" className="underline hover:text-primary">1-800-555-1234</a>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
