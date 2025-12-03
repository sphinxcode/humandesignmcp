'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { MapPin, Loader2, X } from 'lucide-react';

interface PlacesAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
}

interface Prediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

export default function PlacesAutocomplete({
  value,
  onChange,
  placeholder = 'City, Country',
  error = false,
  disabled = false,
}: PlacesAutocompleteProps) {
  const [inputValue, setInputValue] = useState(value);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync external value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch predictions from API route
  const fetchPredictions = useDebouncedCallback(async (query: string) => {
    if (query.length < 2) {
      setPredictions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/places?query=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        setPredictions(data.predictions || []);
        setShowDropdown(true);
      }
    } catch (err) {
      console.error('Failed to fetch predictions:', err);
      setPredictions([]);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
    setSelectedIndex(-1);
    fetchPredictions(newValue);
  };

  const handleSelectPrediction = (prediction: Prediction) => {
    const selectedValue = prediction.description;
    setInputValue(selectedValue);
    onChange(selectedValue);
    setPredictions([]);
    setShowDropdown(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || predictions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < predictions.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelectPrediction(predictions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleClear = () => {
    setInputValue('');
    onChange('');
    setPredictions([]);
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => predictions.length > 0 && setShowDropdown(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={`pr-10 ${error ? 'border-red-400' : ''}`}
          autoComplete="off"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {isLoading && <Loader2 className="w-4 h-4 animate-spin text-[#D4A574]" />}
          {inputValue && !isLoading && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 hover:bg-[#F5EDE4] rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-[#6B4423]" />
            </button>
          )}
        </div>
      </div>

      {/* Predictions dropdown */}
      {showDropdown && predictions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-[#E8DDD4] rounded-xl shadow-lg overflow-hidden"
        >
          {predictions.map((prediction, index) => (
            <button
              key={prediction.place_id}
              type="button"
              onClick={() => handleSelectPrediction(prediction)}
              className={`w-full px-4 py-3 text-left flex items-start gap-3 transition-colors ${
                index === selectedIndex
                  ? 'bg-[#FFF8F5]'
                  : 'hover:bg-[#FFF8F5]'
              }`}
            >
              <MapPin className="w-4 h-4 text-[#C9A227] mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-[#8B4557] truncate">
                  {prediction.structured_formatting?.main_text || prediction.description.split(',')[0]}
                </p>
                <p className="text-sm text-[#6B4423] truncate">
                  {prediction.structured_formatting?.secondary_text || prediction.description}
                </p>
              </div>
            </button>
          ))}
          <div className="px-4 py-2 bg-[#F5EDE4] border-t border-[#E8DDD4]">
            <p className="text-xs text-[#6B4423] text-center">
              Powered by Google Places
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
