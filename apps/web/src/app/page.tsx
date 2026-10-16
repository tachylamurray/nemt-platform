import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ShieldCheck,
  Clock,
  Users,
  Navigation,
  FileText,
  Phone,
  Accessibility,
  Truck,
  Building2,
  Star,
  CheckCircle,
  Stethoscope,
  Car
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Contact Bar */}
      <div className="bg-red-600 text-white py-2" role="banner">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <a href="tel:4167166167" className="flex items-center hover:text-red-200 transition-colors">
                <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
                <span>404.804.1914</span>
              </a>
              <a href="mailto:info@topmedicaltransportation.com" className="flex items-center hover:text-red-200 transition-colors">
                <span>info@meditechtransportation.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50" role="navigation" aria-label="Main navigation">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* <div className="bg-green-600 p-2 rounded-full"> */}
                {/* <Star className="h-6 w-6 text-red-600 fill-red-600" aria-hidden="true" /> */}
              {/* </div> */}
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900">Meditech Transportation LLC</span>
                <span className="text-xs text-gray-600">Medical Transfer Service</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium text-red-600 transition-colors">
                Home
              </Link>
              <Link href="#about" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
                About Us
              </Link>
              <Link href="#home-care" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
                Home Care
              </Link>
              <Link href="#services" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
                Our Services
              </Link>
              <Link href="#how-it-works" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
                How It Works
              </Link>
              <Link href="#testimonials" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
                Testimonials
              </Link>
              <Link href="/booking" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
                Book an Appointment
              </Link>
              <Link href="#contact" className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden" aria-labelledby="hero-heading">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/30 to-red-700/30"></div>
          <img
            src="/header-background.jpg"
            alt="Medical transportation professionals assisting patient"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="text-white">
              <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Non-Emergency Patient Transportation
              </h1>
              <p className="text-xl md:text-2xl text-red-100 mb-8">
                Safe, reliable, and compassionate medical transportation services for patients of all mobility needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/booking">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6 font-semibold">
                    Book An Appointment
                  </Button>
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-12 flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
                  <span className="text-sm text-red-100">Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                  <span className="text-sm text-red-100">4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-red-200" aria-hidden="true" />
                  <span className="text-sm text-red-100">10,000+ Rides</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Differentiators */}
      <section id="features" className="py-20 bg-white" aria-labelledby="features-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 id="features-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine cutting-edge technology with compassionate care to deliver the best NEMT experience
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-red-100 hover:border-red-300 transition-colors">
              <CardHeader>
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck className="h-8 w-8 text-red-600" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">Automated Billing Compliance</CardTitle>
                <CardDescription className="text-base">
                  HCPCS code generation with HCFA-1500 export for seamless Medicaid/Medicare claims processing
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 border-green-100 hover:border-green-300 transition-colors">
              <CardHeader>
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-green-600" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">Reduced No-Show Rates</CardTitle>
                <CardDescription className="text-base">
                  Smart scheduling and automated reminders decrease missed appointments by up to 40%
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 border-purple-100 hover:border-purple-300 transition-colors">
              <CardHeader>
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Accessibility className="h-8 w-8 text-purple-600" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">3-Tier Mobility Options</CardTitle>
                <CardDescription className="text-base">
                  Starting with wheelchair-accessible vehicles, with autonomous options coming soon
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50" aria-labelledby="services-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 id="services-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Transportation Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive non-emergency medical transportation solutions for every need
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                <Truck className="h-16 w-16 text-white" aria-hidden="true" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Ground Transport</CardTitle>
                <CardDescription className="text-base">
                  Safe and reliable transport by road, ensuring timely arrivals to all destinations
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <Accessibility className="h-16 w-16 text-white" aria-hidden="true" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Wheelchair Accessible</CardTitle>
                <CardDescription className="text-base">
                  Specialized services for wheelchair users, offering ease and accessibility in every journey
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <Car className="h-16 w-16 text-white" aria-hidden="true" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Stretcher Transport</CardTitle>
                <CardDescription className="text-base">
                  Professional medical attendants for patients requiring stretcher transportation
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Tiers */}
      <section className="py-20 bg-white" aria-labelledby="tiers-heading">
        <div className="container mx-auto px-4">
          <h2 id="tiers-heading" className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            Service Tiers for Every Need
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Choose the right level of assistance for your specific requirements
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-red-600 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Available Now
              </div>
              <CardHeader>
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Accessibility className="h-6 w-6 text-purple-600" aria-hidden="true" />
                </div>
                <CardTitle className="text-2xl">Tier 1: WAV</CardTitle>
                <CardDescription className="text-base">Wheelchair accessible vehicle</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Accessibility className="h-5 w-5 mr-2 mt-0.5 text-purple-600" aria-hidden="true" />
                    <span>Full wheelchair accessibility</span>
                  </li>
                  <li className="flex items-start">
                    <Users className="h-5 w-5 mr-2 mt-0.5 text-purple-600" aria-hidden="true" />
                    <span>Professional driver</span>
                  </li>
                  <li className="flex items-start">
                    <FileText className="h-5 w-5 mr-2 mt-0.5 text-purple-600" aria-hidden="true" />
                    <span>HCPCS Code: A0130</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-red-300 transition-colors opacity-75 relative overflow-hidden">
              <div className="blur-sm">
                <CardHeader>
                  <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Truck className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-2xl">Tier 2: Autonomous</CardTitle>
                  <CardDescription className="text-base">Standard curb-to-curb service</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 mt-0.5 text-red-600" aria-hidden="true" />
                      <span>Self-driving vehicles</span>
                    </li>
                    <li className="flex items-start">
                      <Clock className="h-5 w-5 mr-2 mt-0.5 text-red-600" aria-hidden="true" />
                      <span>24/7 availability</span>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 mr-2 mt-0.5 text-red-600" aria-hidden="true" />
                      <span>HCPCS Code: A0100</span>
                    </li>
                  </ul>
                </CardContent>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm">
                <span className="text-4xl font-bold text-gray-800">Coming Soon</span>
              </div>
            </Card>
            <Card className="border-2 hover:border-red-300 transition-colors opacity-75 relative overflow-hidden">
              <div className="blur-sm">
                <CardHeader>
                  <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-2xl">Tier 3: Companion</CardTitle>
                  <CardDescription className="text-base">AV with trained companion</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Users className="h-5 w-5 mr-2 mt-0.5 text-red-600" aria-hidden="true" />
                      <span>Trained medical companion</span>
                    </li>
                    <li className="flex items-start">
                      <Accessibility className="h-5 w-5 mr-2 mt-0.5 text-red-600" aria-hidden="true" />
                      <span>Assistance with boarding</span>
                    </li>
                    <li className="flex items-start">
                      <Phone className="h-5 w-5 mr-2 mt-0.5 text-red-600" aria-hidden="true" />
                      <span>Real-time support</span>
                    </li>
                  </ul>
                </CardContent>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm">
                <span className="text-4xl font-bold text-gray-800">Coming Soon</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-red-50" aria-labelledby="how-it-works-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 id="how-it-works-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple three-step process to get your ride
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="h-10 w-10 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">1. Book</h3>
              <p className="text-gray-600 text-lg">
                Schedule your transport easily through our online booking system or by calling our 24/7 dispatch center
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Navigation className="h-10 w-10 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">2. Transport</h3>
              <p className="text-gray-600 text-lg">
                Our professional team will arrive at your location, assist with any necessary preparations, and transport you safely
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">3. Arrive</h3>
              <p className="text-gray-600 text-lg">
                We ensure you reach your destination securely, whether it's a medical facility, special event, or your home
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link href="/booking">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8 py-6">
                Book Your Ride Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white" aria-labelledby="testimonials-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trusted by families and healthcare providers across the nation
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                </div>
                <CardDescription className="text-base text-gray-700">
                  "Fantastic service! The team was professional and caring with my elderly mother. They made her feel comfortable and safe throughout the entire journey."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-red-600 font-bold">MS</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Maria Sanchez</p>
                    <p className="text-sm text-gray-600">Family Caregiver</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                </div>
                <CardDescription className="text-base text-gray-700">
                  "As a clinic administrator, I appreciate the automated billing and compliance features. Our no-show rates have dropped significantly since partnering with NEMT Platform."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 font-bold">DK</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Dr. Karen Williams</p>
                    <p className="text-sm text-gray-600">Clinic Administrator</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                </div>
                <CardDescription className="text-base text-gray-700">
                  "The wheelchair accessible vehicle was perfect for my father. The driver was patient and helpful, making the entire experience stress-free for our family."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-purple-600 font-bold">JT</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">James Thompson</p>
                    <p className="text-sm text-gray-600">Patient Family Member</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Target Partners */}
      <section className="py-20 bg-gray-50" aria-labelledby="partners-heading">
        <div className="container mx-auto px-4">
          <h2 id="partners-heading" className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Trusted by Healthcare Leaders
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Building2 className="h-8 w-8 text-red-600" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">Medicaid/Medicare Plans</CardTitle>
                <CardDescription className="text-base">
                  Streamline beneficiary transportation with automated compliance and reduced costs
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Stethoscope className="h-8 w-8 text-green-600" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">Hospital Systems</CardTitle>
                <CardDescription className="text-base">
                  Ensure patients arrive for appointments with integrated scheduling and real-time tracking
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Building2 className="h-8 w-8 text-purple-600" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">Clinic Networks</CardTitle>
                <CardDescription className="text-base">
                  Bulk booking and patient management tools for care coordinators and receptionists
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-800 text-white" aria-labelledby="cta-heading">
        <div className="container mx-auto px-4 text-center">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Medical Transportation?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-red-100">
            Join leading healthcare organizations in providing reliable, compliant, and accessible NEMT services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-request">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 bg-white text-red-600 hover:bg-red-50">
                Schedule Partnership Demo
              </Button>
            </Link>
            <Link href="/coverage-request">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white/10">
                Request Coverage Integration
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-gray-900 text-white" role="contentinfo">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-red-600 p-2 rounded-lg">
                  <Navigation className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <span className="text-xl font-bold">NEMT Platform</span>
              </div>
              <p className="text-sm text-gray-400">
                Enterprise-grade medical transportation logistics and operations platform.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/booking" className="text-gray-400 hover:text-white transition-colors">Book a Ride</Link></li>
                <li><Link href="/clinic-portal" className="text-gray-400 hover:text-white transition-colors">Clinic Portal</Link></li>
                <li><Link href="#tiers" className="text-gray-400 hover:text-white transition-colors">Service Tiers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Partners</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/demo-request" className="text-gray-400 hover:text-white transition-colors">Schedule Demo</Link></li>
                <li><Link href="/coverage-request" className="text-gray-400 hover:text-white transition-colors">Coverage Integration</Link></li>
                <li><Link href="#partners" className="text-gray-400 hover:text-white transition-colors">Partner Benefits</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="tel:+18005551234" className="text-gray-400 hover:text-white transition-colors">1-800-555-1234</a></li>
                <li><a href="mailto:partners@nemtplatform.com" className="text-gray-400 hover:text-white transition-colors">partners@nemtplatform.com</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 NEMT Platform. All rights reserved.</p>
            <p className="mt-2">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              {' • '}
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
              {' • '}
              <Link href="/accessibility" className="text-gray-400 hover:text-white transition-colors">Accessibility Statement</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
