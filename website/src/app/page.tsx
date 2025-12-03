'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Compass, Users, Zap, Moon } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const types = [
  {
    name: 'Generator',
    percentage: '37%',
    color: '#C9A227',
    strategy: 'To Respond',
    description: 'The life force of the planet. Generators have sustainable energy when engaged in work they love.',
    icon: Zap
  },
  {
    name: 'Manifesting Generator',
    percentage: '33%',
    color: '#FF7F6B',
    strategy: 'To Respond, then Inform',
    description: 'Multi-passionate beings who move quickly and efficiently when responding to life.',
    icon: Sparkles
  },
  {
    name: 'Projector',
    percentage: '21%',
    color: '#9CAF88',
    strategy: 'Wait for the Invitation',
    description: 'Natural guides who see deeply into others and systems.',
    icon: Compass
  },
  {
    name: 'Manifestor',
    percentage: '8%',
    color: '#8B4557',
    strategy: 'To Inform',
    description: 'Initiators who are here to impact and start new things.',
    icon: Heart
  },
  {
    name: 'Reflector',
    percentage: '1%',
    color: '#6B4423',
    strategy: 'Wait a Lunar Cycle',
    description: 'Mirrors of the community who sample and reflect the health of their environment.',
    icon: Moon
  }
];

const benefits = [
  {
    title: 'Understand Your Energy',
    description: 'Learn how you naturally generate and use energy in the world.',
    icon: Zap
  },
  {
    title: 'Make Better Decisions',
    description: 'Discover your unique decision-making authority and trust your inner wisdom.',
    icon: Compass
  },
  {
    title: 'Embrace Your Purpose',
    description: 'Understand your life purpose through your Incarnation Cross.',
    icon: Heart
  }
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFE4E1] via-[#FFF8F5] to-[#F5EDE4]">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#FF7F6B]/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#C9A227]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-[#F4A5A5]/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }} />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              className="font-accent text-3xl md:text-4xl text-[#C9A227] mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Embrace Your Authentic Self
            </motion.p>

            <motion.h1
              className="text-5xl md:text-7xl font-bold text-[#8B4557] mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Discover Your
              <br />
              <span className="bg-gradient-to-r from-[#C9A227] to-[#D4A574] bg-clip-text text-transparent">
                Cosmic Blueprint
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-[#6B4423] mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Human Design reveals who you truly are - your unique energy, decision-making style, and life purpose.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link href="/calculate" className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center gap-2 animate-pulse-glow">
                <Sparkles className="w-5 h-5" />
                Get Your Free Chart
              </Link>
              <a href="#what-is-hd" className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center gap-2">
                Learn More
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="w-6 h-10 border-2 border-[#D4A574] rounded-full flex justify-center pt-2">
              <motion.div
                className="w-1.5 h-1.5 bg-[#C9A227] rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is Human Design Section */}
      <section id="what-is-hd" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="font-accent text-2xl text-[#C9A227] mb-2">Ancient Wisdom Meets Modern Science</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#8B4557] mb-6">
              What is Human Design?
            </h2>
            <p className="text-lg text-[#6B4423] max-w-3xl mx-auto">
              Human Design is a revolutionary system that synthesizes ancient wisdom traditions with modern science.
              It combines the I Ching, Astrology, Kabbalah, the Hindu-Brahmin Chakra System, and Quantum Physics
              to create your unique Bodygraph - a map of your energetic blueprint.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.title}
                className="card text-center group"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#FFE4E1] to-[#F5EDE4] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-8 h-8 text-[#C9A227]" />
                </div>
                <h3 className="text-xl font-semibold text-[#8B4557] mb-3">{benefit.title}</h3>
                <p className="text-[#6B4423]">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5 Types Section */}
      <section className="py-24 bg-gradient-to-b from-[#FFF8F5] to-[#F5EDE4]">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="font-accent text-2xl text-[#C9A227] mb-2">Which One Are You?</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#8B4557] mb-6">
              The 5 Human Design Types
            </h2>
            <p className="text-lg text-[#6B4423] max-w-2xl mx-auto">
              Every person belongs to one of five energy types. Your type determines your aura,
              strategy for making decisions, and how you best interact with the world.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {types.map((type) => (
              <motion.div
                key={type.name}
                className="card group cursor-pointer"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${type.color}20` }}
                  >
                    <type.icon className="w-6 h-6" style={{ color: type.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-[#8B4557]">{type.name}</h3>
                      <span className="text-sm font-medium px-2 py-1 rounded-full bg-[#F5EDE4] text-[#6B4423]">
                        {type.percentage}
                      </span>
                    </div>
                    <p className="text-sm text-[#C9A227] font-medium mb-2">
                      Strategy: {type.strategy}
                    </p>
                    <p className="text-[#6B4423] text-sm">{type.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#8B4557] via-[#C4785B] to-[#C9A227]">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="font-accent text-3xl text-white/80 mb-4">Ready to Begin?</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Start Your Journey of Self-Discovery
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Get your personalized Human Design chart in seconds.
              All you need is your birth date, time, and location.
            </p>

            <Link
              href="/calculate"
              className="inline-flex items-center gap-2 bg-white text-[#8B4557] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#FFF8F5] transition-colors shadow-lg hover:shadow-xl"
            >
              <Sparkles className="w-5 h-5" />
              Calculate Your Chart Now
            </Link>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>10,000+ Charts Generated</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <span>100% Free</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span>Instant Results</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#2D2D2D]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="font-accent text-2xl text-[#C9A227] mb-2">Project Ajna</p>
            <p className="text-white/60 text-sm">
              The Third Eye Center of Inner Vision
            </p>
            <p className="text-white/40 text-xs mt-4">
              &copy; {new Date().getFullYear()} Project Ajna. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
