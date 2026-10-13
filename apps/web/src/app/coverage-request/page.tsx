'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Building2, Mail, Phone, CheckCircle, FileText } from 'lucide-react'

export default function CoverageRequestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    payerName: '',
    payerId: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    states: '',
    coverageType: '',
    estimatedMembers: '',
    notes: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Submit to Formspree
      const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        console.error('Form submission failed')
        alert('There was an error submitting the form. Please try again.')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('There was an error submitting the form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
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
            <CardTitle className="text-2xl">Request Received</CardTitle>
            <CardDescription>
              Your coverage integration request has been submitted. Our team will review your information and contact you within 2-3 business days.
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
            <FileText className="h-16 w-16 text-primary mx-auto mb-4" aria-hidden="true" />
            <h1 className="text-4xl font-bold mb-4">Request Coverage Integration</h1>
            <p className="text-xl text-muted-foreground">
              Integrate NEMT services with your insurance plan's transportation benefits
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Coverage Integration Request</CardTitle>
              <CardDescription>
                Provide your insurance plan details to begin the integration process.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6" aria-label="Coverage integration request form">
                {/* Payer Information */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Insurance Plan Information</h2>
                  
                  <div className="space-y-2">
                    <Label htmlFor="payerName">Payer/Plan Name *</Label>
                    <Input
                      id="payerName"
                      name="payerName"
                      required
                      value={formData.payerName}
                      onChange={handleChange}
                      placeholder="e.g., State Medicaid Agency"
                      aria-required="true"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="payerId">Payer ID (Optional)</Label>
                    <Input
                      id="payerId"
                      name="payerId"
                      value={formData.payerId}
                      onChange={handleChange}
                      placeholder="e.g., 12345"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coverageType">Coverage Type *</Label>
                    <select
                      id="coverageType"
                      name="coverageType"
                      required
                      value={formData.coverageType}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      aria-required="true"
                    >
                      <option value="">Select coverage type</option>
                      <option value="medicaid">Medicaid</option>
                      <option value="medicare_advantage">Medicare Advantage</option>
                      <option value="dual_eligible">Dual Eligible (Medicare & Medicaid)</option>
                      <option value="commercial">Commercial Insurance</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="states">States Covered *</Label>
                    <Input
                      id="states"
                      name="states"
                      required
                      value={formData.states}
                      onChange={handleChange}
                      placeholder="e.g., IL, IN, WI"
                      aria-required="true"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estimatedMembers">Estimated Eligible Members</Label>
                    <Input
                      id="estimatedMembers"
                      name="estimatedMembers"
                      type="number"
                      value={formData.estimatedMembers}
                      onChange={handleChange}
                      placeholder="e.g., 50000"
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
                    placeholder="Describe your current NEMT arrangements or specific integration requirements..."
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
                  {isSubmitting ? 'Submitting...' : 'Submit Coverage Request'}
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
