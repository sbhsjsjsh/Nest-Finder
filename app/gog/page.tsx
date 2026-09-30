'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Table as TableIcon, RefreshCcw, ArrowLeft, Phone, Mail, Calendar, MapPin, Trash2, AlertCircle, X, Check } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function LeadsDashboard() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')
  const [leads, setLeads] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = React.useState<string | null>(null)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === '9931') {
      setIsAuthenticated(true)
      fetchLeads()
    } else {
      setError('Incorrect password. Access denied.')
    }
  }

  const fetchLeads = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/leads')
      const data = await res.json()
      setLeads(data)
    } catch (err) {
      console.error('Failed to fetch leads')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      if (res.ok) {
        setLeads(leads.filter(l => l.id !== id))
        setDeleteConfirmId(null)
      }
    } catch (err) {
      console.error('Failed to delete lead')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white p-8 rounded-[2rem] border border-primary/20 shadow-2xl shadow-primary/5 space-y-8"
        >
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-serif">Admin Access</h1>
            <p className="text-sm text-muted-foreground">Enter password to view inquiries</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className="w-full p-4 border border-border rounded-xl focus:outline-none focus:border-primary transition-all text-center text-lg tracking-[0.5em]"
            />
            {error && <p className="text-red-500 text-xs text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-primary text-white p-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/10"
            >
              Verify Access
            </button>
          </form>

          <Link href="/" className="flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back to Website
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
              <TableIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-serif">Leads Inquiry</h1>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Admin Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={fetchLeads}
              disabled={loading}
              className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
            >
              <RefreshCcw className={cn("w-5 h-5", loading && "animate-spin")} />
            </button>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="text-xs font-bold text-muted-foreground hover:text-red-500 transition-colors"
            >
              LOGOUT
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="space-y-6">
          {leads.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-border">
              <p className="text-muted-foreground italic">No inquiries found yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <AnimatePresence mode="popLayout">
                {leads.map((lead) => (
                  <motion.div
                    key={lead.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white rounded-[1.5rem] border border-border p-5 md:p-6 shadow-sm hover:shadow-md transition-all group relative"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      {/* Left: Lead Identity */}
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold">
                             {lead.name.charAt(0)}
                           </div>
                           <div>
                             <h3 className="font-bold text-lg text-foreground">{lead.name}</h3>
                             <div className="text-xs text-muted-foreground flex items-center gap-1">
                               <Calendar className="w-3 h-3" />
                               {new Date(lead.timestamp).toLocaleDateString()} at {new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                             </div>
                           </div>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                          <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-muted rounded-md">{lead.propertyType}</span>
                          <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-primary/10 text-primary rounded-md">{lead.budget}</span>
                          {lead.bhk && <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-muted rounded-md">{lead.bhk}</span>}
                        </div>
                      </div>

                      {/* Middle: Details List */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-[1.5]">
                        <div className="space-y-2">
                           <div className="flex items-center gap-2 text-sm">
                             <Phone className="w-4 h-4 text-primary" />
                             <span className="font-medium">{lead.phone}</span>
                           </div>
                           <div className="flex items-center gap-2 text-sm text-muted-foreground">
                             <Mail className="w-4 h-4 text-primary" />
                             <span>{lead.email}</span>
                           </div>
                        </div>
                        <div className="space-y-2">
                           <div className="flex items-center gap-2 text-sm">
                             <MapPin className="w-4 h-4 text-primary" />
                             <span className="font-medium">{lead.locality}</span>
                           </div>
                           <div className="text-xs text-muted-foreground italic">
                             Purpose: {lead.purpose}
                           </div>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center justify-end">
                        {deleteConfirmId === lead.id ? (
                          <div className="flex items-center gap-2 bg-red-50 p-2 rounded-xl animate-in fade-in slide-in-from-right-2">
                            <span className="text-[10px] font-bold text-red-600 px-2">Delete Inquiry?</span>
                            <button 
                              onClick={() => handleDelete(lead.id)}
                              className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => setDeleteConfirmId(null)}
                              className="bg-white border border-border p-2 rounded-lg hover:bg-muted transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => setDeleteConfirmId(lead.id)}
                            className="p-3 text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-all rounded-xl opacity-0 group-hover:opacity-100 focus:opacity-100"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold flex items-center justify-center gap-2">
            <AlertCircle className="w-3 h-3" /> 
            Data refreshes automatically on server restart
          </p>
        </div>
      </main>
    </div>
  )
}
