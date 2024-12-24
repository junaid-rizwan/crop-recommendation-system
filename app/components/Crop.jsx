'use client'

import { useState, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Sphere, Text } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import photo from '../crop_recommendation_system.jpg'
import RealisticPaddyField from './RealisticPaddyField'


function RotatingGlobe() {
  const meshRef = useRef()
  const texture = useLoader(TextureLoader, '/assets/3d/texture_earth.jpg')

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.10
    }
  })

  return (
    <Sphere args={[1.5, 64, 64]} ref={meshRef}>
      <meshStandardMaterial map={texture} />
    </Sphere>
  )
}

function FloatingText({ text, position, rotation }) {
  return (
    <Text
      position={position}
      rotation={rotation}
      fontSize={0.15}
      color="#ffffff"
      anchorX="center"
      anchorY="middle"
    >
      {text}
    </Text>
  )
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
    { name: 'Dashboard', href: "/dash" },
  ]

  return (
    <nav className="bg-green-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">CropSmart</Link>
        <div className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="hover:text-green-200 transition-colors">
              {item.name}
            </Link>
          ))}
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6 text-black" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Navigate through our crop recommendation services.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col space-y-4 mt-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg hover:text-green-600 transition-colors"
                  onClick={() => setIsOpen(false)
                  }
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

export default function EnhancedCropRecommendation() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <motion.section 
          className="mb-12 relative"
          style={{ opacity, scale }}
        >
          <div className="h-[400px] mb-8">
            <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <RotatingGlobe />
              <FloatingText text="Sustainable" position={[2, 0.75, 0]} rotation={[0, -Math.PI / 2, 0]} />
              <FloatingText text="Efficient" position={[-2, -0.75, 0]} rotation={[0, Math.PI / 2, 0]} />
              <FloatingText text="Smart" position={[0, 2, 0]} rotation={[Math.PI / 2, 0, 0]} />
              <OrbitControls enableZoom={false} />
            </Canvas>
          </div>
          <Card className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
            <CardContent>
              <motion.h1 
                className="text-5xl font-bold mb-4 text-green-800 text-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                CropSmart Recommendation System
              </motion.h1>
              <motion.p 
                className="text-xl mb-8 text-green-700 text-center"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Revolutionizing agriculture with AI-powered insights
              </motion.p>
              <div className="relative w-full h-64 mb-6">
              <Image
                src={photo}
                alt="Crop Recommendation"
                fill
                className="rounded-lg object-cover"
                
                />

              </div>

            </CardContent>
          </Card>
        </motion.section>

        <RealisticPaddyField/>

        <section id="about" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-green-800">About CropSmart</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-green-700">Our Mission</h3>
              <p className="text-gray-700">
                At CropSmart, we're dedicated to empowering farmers with cutting-edge technology and data-driven insights. 
                Our mission is to optimize crop yields, promote sustainable farming practices, and ensure food security for future generations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-green-700">How It Works</h3>
              <ol className="list-decimal list-inside text-gray-700">
                <li className="mb-2">Input your land's characteristics</li>
                <li className="mb-2">Our AI analyzes soil, climate, and water data</li>
                <li className="mb-2">Receive personalized crop recommendations</li>
                <li>Implement suggestions for optimal results</li>
              </ol>
            </div>
          </div>
        </section>

        <section id="services" className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-green-800">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Crop Recommendation", description: "Get tailored advice to maximize your crop yield based on your specific conditions." },
              { title: "Soil Analysis", description: "In-depth analysis of your soil composition to determine optimal fertilization strategies." },
              { title: "Water Management", description: "Efficient irrigation plans to conserve water while ensuring optimal crop growth." },
              { title: "Pest Control", description: "Integrated pest management solutions to protect your crops sustainably." },
              { title: "Yield Forecasting", description: "Predictive analytics to estimate your harvest and plan accordingly." },
              { title: "Sustainable Practices", description: "Guidance on implementing eco-friendly farming techniques for long-term success." },
            ].map((service, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-xl font-semibold mb-2 text-green-700">{service.title}</h3>
                <p className="text-gray-700">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="mb-12">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-green-800">Contact Us</h2>
              <p className="mb-6 text-gray-700">Have questions? Reach out to our expert team.</p>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input id="name" name="name" type="text" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input id="email" name="email" type="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  ></textarea>
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="bg-green-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">CropSmart</h3>
              <p className="text-sm">Empowering farmers with smart technology for a sustainable future.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['Home', 'About', 'Services', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link href={`#${item.toLowerCase()}`} className="text-sm hover:text-green-200 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map((social) => (
                  <a key={social} href="#" className="text-sm hover:text-green-200 transition-colors">
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-green-700 text-center">
            <p className="text-sm">&copy; 2024 CropSmart Recommendation System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}