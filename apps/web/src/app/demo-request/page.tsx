'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Building2, Mail, Phone, CheckCircle } from 'lucide-react'

export default function DemoRequestPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    organizationName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    organizationType: '',
    estimatedVolume: '',
    notes: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Here you would make an actual API call to save the lead
    console.log('Lead submitted:', formData)

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" aria-hidden="true" />
            <CardTitle className="text-2xl">Thank You!</CardTitle>
            <CardDescription>
              Your demo request has been submitted successfully. Our team will contact you within 24-48 hours.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button className="w-full">Return to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" role="navigation" aria-label="Main navigation">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-primary" aria-hidden="true" />
              <span className="text-xl font-bold">NEMT Platform</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Schedule a Partnership Demo</h1>
            <p className="text-xl text-muted-foreground">
              See how our NEMT platform can streamline your medical transportation operations
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Demo Request Form</CardTitle>
              <CardDescription>
                Fill out the form below and our team will contact you to schedule a personalized demo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6" aria-label="Demo request form">
                {/* Organization Information */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Organization Information</h2>
                  
                  <div className="space-y-2">
                    <Label htmlFor="organizationName">Organization Name *</Label>
                    <Input
                      id="organizationName"
                      name="organizationName"
                      required
                      value={formData.organizationName}
                      onChange={handleChange}
                      placeholder="Your healthcare organization"
                      aria-required="true"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organizationType">Organization Type *</Label>
                    <select
                      id="organizationType"
                      name="organizationType"
                      required
                      value={formData.organizationType}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      aria-required="true"
                    >
                      <option value="">Select organization type</option>
                      <option value="medicaid_plan">Medicaid Plan</option>
                      <option value="medicare_advantage">Medicare Advantage Plan</option>
                      <option value="hospital">Hospital System</option>
                      <option value="clinic">Clinic Network</option>
                      <option value="federally_qualified_health_center">Federally Qualified Health Center</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estimatedVolume">Estimated Monthly Rides</Label>
                    <Input
                      id="estimatedVolume"
                      name="estimatedVolume"
                      type="number"
                      value={formData.estimatedVolume}
                      onChange={handleChange}
                      placeholder="e.g., 500"
                      min="0"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Contact Information</h2>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Contact Name *</Label>
                    <Input
                      id="contactName"
                      name="contactName"
                      required
                      value={formData.contactName}
                      onChange={handleChange}
                      placeholder="John Smith"
                      aria-required="true"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <Input
                        id="contactEmail"
                        name="contactEmail"
                        type="email"
                        required
                        value={formData.contactEmail}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="pl-10"
                        aria-required="true"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <Input
                        id="contactPhone"
                        name="contactPhone"
                        type="tel"
                        required
                        value={formData.contactPhone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                        className="pl-10"
                        aria-required="true"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Tell us about your specific needs or questions..."
                    rows={4}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                  aria-live="polite"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Demo Request'}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  By submitting this form, you agree to our{' '}
                  <Link href="/privacy" className="underline hover:text-primary">
                    Privacy Policy
                  </Link>{' '}
                  and{' '}
                  <Link href="/terms" className="underline hover:text-primary">
                    Terms of Service
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
