'use client'

import React from 'react'
import { motion } from 'motion/react'
import { ArrowRight, Check, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function QualifyForm() {
  const [submitted, setSubmitted] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    bhk: '',
    budget: '',
    locality: '',
    purpose: 'Self Use',
    propertyType: 'Apartment'
  })

  const [error, setError] = React.useState('')

  const typeOptions = ['Apartment', 'Villa / Bungalow', 'Office Space', 'Shop / Showroom', 'Land / Plot']
  const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK']
  const budgetOptions = [
    '20 - 50 Lakhs', 
    '50 - 90 Lakhs', 
    '1 Cr - 3 Cr', 
    '3 Cr - 7 Cr', 
    '7 Cr - 15 Cr', 
    '15 Cr - 30 Cr', 
    '30 Cr+'
  ]
  const localities = ['South Mumbai', 'Western Suburbs', 'Central Mumbai', 'Navi Mumbai', 'Thane']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // 10 Digit Phone Validation
    const phoneRegex = /^[0-9]{10}$/
    if (!phoneRegex.test(formData.phone)) {
      setError('Please enter a valid 10-digit phone number.')
      return
    }

    // Check if all custom selections are made
    const isResidential = formData.propertyType === 'Apartment' || formData.propertyType === 'Villa / Bungalow'
    if (!formData.propertyType || (isResidential && !formData.bhk) || !formData.budget || !formData.locality) {
      setError('Please select all property requirements to continue.')
      return
    }

    console.log('Lead Captured:', formData)
    
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (e) {
      setError('Connection error. Please try again.')
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 md:p-12 rounded-3xl border border-primary/20 text-center space-y-6 max-w-xl mx-auto shadow-2xl shadow-primary/5"
      >
        <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-serif text-foreground leading-tight">Thank You for Reaching Out</h2>
        <p className="text-muted-foreground leading-relaxed">
          Our property specialists in Mumbai have received your requirements. We are curating a private selection for you and will contact you shortly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-primary font-medium hover:underline pt-4 block w-full"
        >
          Submit Another Requirement
        </button>
      </motion.div>
    )
  }

  return (
    <div className="max-w-xl mx-auto w-full">
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Contact Details */}
        <div className="space-y-4">
          <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-primary">01. Contact Information</h3>
          <div className="grid grid-cols-1 gap-4">
            <input
              required
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-4 bg-white border border-border rounded-xl focus:outline-none focus:border-primary transition-all text-sm"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                required
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-4 bg-white border border-border rounded-xl focus:outline-none focus:border-primary transition-all text-sm"
              />
              <input
                required
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-4 bg-white border border-border rounded-xl focus:outline-none focus:border-primary transition-all text-sm"
              />
            </div>
          </div>
        </div>

        {/* Property Preferences */}
        <div className="space-y-6">
          <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-primary">02. Property Requirements</h3>
          
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground block">Property Type</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {typeOptions.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, propertyType: type })}
                  className={cn(
                    "p-3 rounded-xl border text-[11px] font-medium transition-all text-center",
                    formData.propertyType === type ? "bg-primary border-primary text-white" : "bg-white border-border text-foreground hover:border-primary/40"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {(formData.propertyType === 'Apartment' || formData.propertyType === 'Villa / Bungalow') && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-muted-foreground block">Configuration (BHK)</label>
              <div className="flex flex-wrap gap-2">
                {bhkOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFormData({ ...formData, bhk: opt })}
                    className={cn(
                      "px-4 py-2 rounded-full border text-xs font-medium transition-all",
                      formData.bhk === opt ? "bg-primary border-primary text-white" : "bg-white border-border text-foreground hover:border-primary/40"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground block">Budget Range</label>
            <select
              required
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full p-4 bg-white border border-border rounded-xl focus:outline-none focus:border-primary transition-all text-sm appearance-none"
            >
              <option value="">Select Budget</option>
              {budgetOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground block">Preferred Locality</label>
            <div className="grid grid-cols-2 gap-3">
              {localities.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setFormData({ ...formData, locality: loc })}
                  className={cn(
                    "p-3 rounded-xl border text-xs font-medium transition-all text-center",
                    formData.locality === loc ? "bg-primary/5 border-primary text-primary" : "bg-white border-border text-foreground hover:border-primary/40"
                  )}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground block">Buying Purpose</label>
            <div className="flex gap-4">
              {['Self Use', 'Investment'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setFormData({ ...formData, purpose: p })}
                  className={cn(
                    "flex-1 p-3 rounded-xl border text-xs font-medium transition-all",
                    formData.purpose === p ? "bg-primary/5 border-primary text-primary" : "bg-white border-border text-foreground hover:border-primary/40"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl font-medium"
          >
            {error}
          </motion.div>
        )}

        <button
          type="submit"
          className="w-full bg-primary text-white p-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 group"
        >
          Submit Requirement <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-[10px] text-center text-muted-foreground leading-relaxed">
          By submitting this form, you agree to be contacted by Mumbai Nest Finder specialists regarding your property search.
        </p>
      </form>
    </div>
  )
}
