import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { HumanDesignChart, BirthData } from '@/types/humandesign';

interface ChartState {
  // Current chart data
  currentChart: HumanDesignChart | null;
  birthData: BirthData | null;

  // Loading states
  isLoading: boolean;
  error: string | null;

  // Saved charts
  savedCharts: Record<string, HumanDesignChart>;

  // Actions
  setBirthData: (data: BirthData) => void;
  setCurrentChart: (chart: HumanDesignChart) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  saveChart: (chart: HumanDesignChart) => void;
  getChart: (id: string) => HumanDesignChart | null;
  clearCurrentChart: () => void;
}

export const useChartStore = create<ChartState>()(
  persist(
    (set, get) => ({
      currentChart: null,
      birthData: null,
      isLoading: false,
      error: null,
      savedCharts: {},

      setBirthData: (data) => set({ birthData: data }),

      setCurrentChart: (chart) => set({ currentChart: chart }),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      saveChart: (chart) => set((state) => ({
        savedCharts: {
          ...state.savedCharts,
          [chart.id]: chart
        }
      })),

      getChart: (id) => {
        const state = get();
        return state.savedCharts[id] || null;
      },

      clearCurrentChart: () => set({ currentChart: null, birthData: null, error: null })
    }),
    {
      name: 'ajna-chart-storage',
      partialize: (state) => ({ savedCharts: state.savedCharts })
    }
  )
);
