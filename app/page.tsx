'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { NeonGradientCard } from '@/components/magicui/neon-gradient-card';
import { RainbowButton } from '@/components/magicui/rainbow-button';
import { AuroraText } from '@/components/magicui/aurora-text';
import { Particles } from '@/components/magicui/particles';

const HomePage = () => {
  const handleGetStarted = () => {
    window.location.href = '/sign-in';
  };

  const features = [
    {
      title: 'Smart AI Assistance',
      description: 'Get intelligent help for your daily tasks with advanced machine learning algorithms',
    },
    {
      title: 'Easy to Use',
      description: 'Simple and intuitive interface designed for users of all technical levels',
    },
    {
      title: 'Always Available',
      description: 'Access your AI assistant 24/7 from any device, anywhere in the world',
    },
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Particles */}
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color="#8b5cf6"
        refresh
      />
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="px-8 py-6 border-b border-gray-200 bg-white/90 backdrop-blur-sm sticky top-0 z-50"
      >
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image src="/logo.svg" alt="logo" width={36} height={36} />
            <h1 className="text-2xl font-bold text-gray-900">Spark AI</h1>
          </div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <RainbowButton onClick={handleGetStarted} className="px-6 py-2">
              Get Started
            </RainbowButton>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="px-4 py-20 max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.div
            className="mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <AuroraText className="text-5xl md:text-6xl font-bold">
              Your Personal AI Assistant
            </AuroraText>
          </motion.div>

          <motion.p
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Experience the future of productivity with intelligent AI that helps you achieve more every day.
          </motion.p>

          <motion.div whileHover={{ scale: 1.05 }}>
            <RainbowButton onClick={handleGetStarted} className="px-8 py-4 text-lg">
              Get Started
            </RainbowButton>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 bg-gray-50/80 backdrop-blur-sm relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <AuroraText className="text-3xl font-bold mb-4">
              Why Choose Spark AI?
            </AuroraText>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <div className="group relative h-full min-h-[280px] bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100/50 backdrop-blur-sm">
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                    {/* Icon placeholder - you can replace with actual icons */}
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6 flex items-center justify-center shadow-lg">
                      <div className="w-8 h-8 bg-white rounded-lg opacity-90"></div>
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-purple-700 transition-colors duration-300">
                      {feature.title}
                    </h4>
                    
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {feature.description}
                    </p>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full opacity-60"></div>
                    <div className="absolute bottom-4 left-4 w-1 h-1 bg-pink-400 rounded-full opacity-40"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <AuroraText className="text-3xl md:text-4xl font-bold">
                Ready to Get Started?
              </AuroraText>
            </div>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of users who are already using Spark AI.
            </p>
            <motion.div whileHover={{ scale: 1.05 }}>
              <RainbowButton onClick={handleGetStarted} className="px-8 py-4 text-lg">
                Get Started
              </RainbowButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className="py-8 border-t border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-600">© 2025 Spark AI. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default HomePage;