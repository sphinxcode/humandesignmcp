'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Sparkles, Loader2, Calendar, Clock, MapPin, User, Mail } from 'lucide-react';
import { useChartStore } from '@/stores/chartStore';
import { calculateChart } from '@/lib/api';
import PlacesAutocomplete from '@/components/ui/PlacesAutocomplete';

const birthDataSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  birthDate: z.string().min(1, 'Birth date is required'),
  birthTime: z.string().optional(),
  birthCity: z.string().min(2, 'Birth city is required'),
});

type BirthDataForm = z.infer<typeof birthDataSchema>;

export default function CalculatePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setBirthData, setCurrentChart, saveChart } = useChartStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BirthDataForm>({
    resolver: zodResolver(birthDataSchema),
    defaultValues: {
      birthTime: '12:00',
      birthCity: '',
    },
  });

  const onSubmit = async (data: BirthDataForm) => {
    setIsLoading(true);
    setError(null);

    try {
      const birthData = {
        name: data.name,
        email: data.email,
        birthDate: data.birthDate,
        birthTime: data.birthTime || '12:00',
        birthCity: data.birthCity,
      };

      setBirthData(birthData);
      const chart = await calculateChart(birthData);
      setCurrentChart(chart);
      saveChart(chart);
      router.push(`/chart/${chart.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to calculate chart. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFF8F5] via-[#F5EDE4] to-[#FFE4E1]">
      {/* Header */}
      <header className="py-6 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[#8B4557] hover:text-[#C9A227] transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>
          <p className="font-accent text-xl text-[#C9A227]">Project Ajna</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Title */}
          <div className="text-center mb-10">
            <p className="font-accent text-2xl text-[#C9A227] mb-2">Begin Your Journey</p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#8B4557] mb-4">
              Calculate Your Chart
            </h1>
            <p className="text-[#6B4423]">
              Enter your birth details to generate your personalized Human Design bodygraph.
            </p>
          </div>

          {/* Form Card */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-[#8B4557] mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  {...register('name')}
                  className={errors.name ? 'border-red-400' : ''}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-[#8B4557] mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  {...register('email')}
                  className={errors.email ? 'border-red-400' : ''}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Birth Date Field */}
              <div>
                <label className="block text-sm font-medium text-[#8B4557] mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Birth Date
                </label>
                <input
                  type="date"
                  {...register('birthDate')}
                  className={errors.birthDate ? 'border-red-400' : ''}
                />
                {errors.birthDate && (
                  <p className="mt-1 text-sm text-red-500">{errors.birthDate.message}</p>
                )}
              </div>

              {/* Birth Time Field */}
              <div>
                <label className="block text-sm font-medium text-[#8B4557] mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Birth Time
                  <span className="text-[#6B4423] font-normal ml-2">(if known)</span>
                </label>
                <input
                  type="time"
                  {...register('birthTime')}
                />
                <p className="mt-1 text-xs text-[#6B4423]">
                  If unknown, we&apos;ll use 12:00 noon. For more accurate results, check your birth certificate.
                </p>
              </div>

              {/* Birth City Field */}
              <div>
                <label className="block text-sm font-medium text-[#8B4557] mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Birth City
                </label>
                <Controller
                  name="birthCity"
                  control={control}
                  render={({ field }) => (
                    <PlacesAutocomplete
                      value={field.value || ''}
                      onChange={field.onChange}
                      placeholder="Start typing your city..."
                      error={!!errors.birthCity}
                      disabled={isLoading}
                    />
                  )}
                />
                {errors.birthCity && (
                  <p className="mt-1 text-sm text-red-500">{errors.birthCity.message}</p>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating Your Chart...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate My Chart
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Privacy Note */}
          <motion.p
            className="text-center text-sm text-[#6B4423] mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Your data is used only for chart calculation and is never shared with third parties.
          </motion.p>
        </motion.div>
      </div>
    </main>
  );
}
