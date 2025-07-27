'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

const HomePage = () => {
  const handleGetStarted = () => {
    window.location.href = '/sign-in'
  }

  const features = [
    {
      title: "Smart AI Assistance",
      description: "Get intelligent help for your daily tasks"
    },
    {
      title: "Easy to Use",
      description: "Simple interface designed for everyone"
    },
    {
      title: "Always Available",
      description: "Access your AI assistant anytime, anywhere"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="px-8 py-6 border-b border-gray-200">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image src={'/logo.svg'} alt='logo' width={36} height={36} />
            <h1 className="text-2xl font-bold text-gray-900">Spark AI</h1>
          </div>
          <Button 
            onClick={handleGetStarted}
            className="bg-black hover:bg-gray-800 text-white px-6 py-2"
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 py-20 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Personal AI Assistant
          </h2>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience the future of productivity with intelligent AI that helps you achieve more every day.
          </p>
          
          <Button 
            onClick={handleGetStarted}
            size="lg"
            className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg"
          >
            Get Started
          </Button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Spark AI?
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Get Started?
            </h3>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of users who are already using Spark AI.
            </p>
            <Button 
              onClick={handleGetStarted}
              size="lg"
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg"
            >
              Get Started
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-600">© 2025 Spark AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage