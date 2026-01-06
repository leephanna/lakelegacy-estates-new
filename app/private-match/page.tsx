'use client';

import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  situation: string;
  timeline: string;
  budget: string;
  lakePriorities: string[];
  notes: string;
  website: string; // honeypot field
}

const SITUATION_OPTIONS = [
  { value: 'actively_buying', label: 'Actively buying a lake property' },
  { value: 'researching', label: 'Researching / exploring options' },
  { value: 'upgrading', label: 'Upgrading / relocating' },
  { value: 'investor', label: 'Investor / second-home strategy' }
];

const TIMELINE_OPTIONS = [
  { value: '0-3', label: '0-3 months' },
  { value: '3-6', label: '3-6 months' },
  { value: '6-12', label: '6-12 months' },
  { value: '12+', label: '12+ months' }
];

const BUDGET_OPTIONS = [
  { value: 'under_750k', label: 'Under $750k' },
  { value: '750k-1m', label: '$750k - $1M' },
  { value: '1m-1.5m', label: '$1M - $1.5M' },
  { value: '1.5m-2.5m', label: '$1.5M - $2.5M' },
  { value: '2.5m+', label: '$2.5M+' }
];

const LAKE_PRIORITIES = [
  { id: 'large_recreational', label: 'Large, recreational lake' },
  { id: 'quiet_private', label: 'Quiet / private water' },
  { id: 'privacy_seclusion', label: 'Privacy / seclusion' },
  { id: 'fishing_hunting', label: 'Fishing / hunting access' },
  { id: 'waterfront_footage', label: 'Maximum waterfront footage' },
  { id: 'dock_boating', label: 'Dock / boating infrastructure' },
  { id: 'proximity_cities', label: 'Proximity to cities' },
  { id: 'year_round', label: 'Year-round accessibility' }
];

export default function PrivateMatchPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    situation: '',
    timeline: '',
    budget: '',
    lakePriorities: [],
    notes: '',
    website: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (priorityId: string) => {
    setFormData(prev => ({
      ...prev,
      lakePriorities: prev.lakePriorities.includes(priorityId)
        ? prev.lakePriorities.filter(id => id !== priorityId)
        : [...prev.lakePriorities, priorityId]
    }));
  };

  const buildQualificationMessage = () => {
    const situationText = SITUATION_OPTIONS.find(opt => opt.value === formData.situation)?.label || formData.situation;
    const timelineText = TIMELINE_OPTIONS.find(opt => opt.value === formData.timeline)?.label || formData.timeline;
    const budgetText = BUDGET_OPTIONS.find(opt => opt.value === formData.budget)?.label || formData.budget;
    
    const prioritiesText = formData.lakePriorities.length > 0 
      ? formData.lakePriorities.map(id => 
          LAKE_PRIORITIES.find(p => p.id === id)?.label || id
        ).join(', ')
      : 'None specified';

    return `PRIVATE LAKE PROPERTY QUALIFICATION:

Situation: ${situationText}
Timeline: ${timelineText}
Budget Range: ${budgetText}

Lake Priorities: ${prioritiesText}

${formData.notes ? `Additional Notes: ${formData.notes}` : ''}

This lead is requesting private/off-market lake property matches.`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check
    if (formData.website) {
      console.log('Spam detected');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: buildQualificationMessage(),
        leadType: 'private-match',
        situation: formData.situation,
        timeline: formData.timeline,
        budget: formData.budget,
        lakePriorities: formData.lakePriorities,
        additionalNotes: formData.notes
      };

      const response = await fetch('https://ai4u-concierge-mail.leehanna8.workers.dev/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          situation: '',
          timeline: '',
          budget: '',
          lakePriorities: [],
          notes: '',
          website: ''
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name && formData.email && formData.phone && 
                     formData.situation && formData.timeline && formData.budget;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="/" className="text-xl font-bold text-gray-900">
                Lake & Legacy
              </a>
            </div>
            <nav className="hidden md:flex space-x-10">
              <a href="/buyers" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Buyers
              </a>
              <a href="/sellers" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Sellers
              </a>
              <a href="/off-market" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Off-Market
              </a>
              <a href="/partners" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Partners
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Private Lake Property Match
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Access our exclusive database of off-market lake properties. 
            Tell us your criteria and we'll find properties that aren't publicly listed.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot field (hidden) */}
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="(555) 123-4567"
              />
            </div>

            {/* Qualification Questions */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Property Qualification</h3>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="situation" className="block text-sm font-medium text-gray-700 mb-2">
                    Where are you in the process? *
                  </label>
                  <select
                    id="situation"
                    name="situation"
                    required
                    value={formData.situation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select your situation...</option>
                    {SITUATION_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                    Timeline *
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    required
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select timeline...</option>
                    {TIMELINE_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range *
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    required
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select budget range...</option>
                    {BUDGET_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Lake Priorities (select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {LAKE_PRIORITIES.map(priority => (
                      <div key={priority.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={priority.id}
                          checked={formData.lakePriorities.includes(priority.id)}
                          onChange={() => handleCheckboxChange(priority.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={priority.id} className="ml-2 text-sm text-gray-700">
                          {priority.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Any specific requirements, preferred locations, or additional details..."
                  />
                </div>
              </div>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="rounded-md bg-green-50 p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-green-800">
                    Request received — we'll reach out shortly with matching properties.
                  </p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-red-800">
                    Something went wrong. Please try again or call us directly.
                  </p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`inline-flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white ${
                  isFormValid && !isSubmitting
                    ? 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Request Private Match'
                )}
              </button>
            </div>
          </form>

          {/* What Happens Next */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h4 className="text-lg font-medium text-gray-900 mb-4">What happens next:</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• We review your requirements within 24 hours</p>
              <p>• We search our private database for matching properties</p>
              <p>• We send you a curated list of off-market opportunities</p>
              <p>• We coordinate private showings for properties of interest</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
