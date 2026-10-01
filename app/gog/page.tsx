'use client'

import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
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
      if (!res.ok) throw new Error('Fetch failed')
      const data = await res.json()
      setLeads(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to fetch leads', err)
      setLeads([])
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

  const stats = React.useMemo(() => {
    const total = leads.length
    const residential = leads.filter(l => ['Apartment', 'Villa / Bungalow'].includes(l.propertyType)).length
    const investment = leads.filter(l => l.purpose === 'Investment').length
    const topLocality = leads.length > 0 
      ? Object.entries(leads.reduce((acc: any, l) => { acc[l.locality] = (acc[l.locality] || 0) + 1; return acc; }, {}))
          .sort((a: any, b: any) => b[1] - a[1])[0][0]
      : 'N/A'

    return { total, residential, investment, topLocality }
  }, [leads])

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
            <p className="text-sm text-muted-foreground">Secure gateway for Mumbai Nest Finder</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground px-1">Access Password</label>
              <input
                type="password"
                placeholder="••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="w-full p-4 border border-border rounded-xl focus:outline-none focus:border-primary transition-all text-center text-2xl tracking-[0.5em]"
              />
            </div>
            {error && (
              <motion.p 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-red-500 text-xs text-center font-medium bg-red-50 py-2 rounded-lg"
              >
                {error}
              </motion.p>
            )}
            <button
              type="submit"
              className="w-full bg-primary text-white p-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/10 active:scale-95"
            >
              Verify Credentials
            </button>
          </form>

          <Link href="/" className="flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back to Public Site
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
              <h1 className="text-xl font-serif">Inquiry Management</h1>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Admin Console · Mumbai</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={fetchLeads}
              disabled={loading}
              title="Refresh Data"
              className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
            >
              <RefreshCcw className={cn("w-5 h-5", loading && "animate-spin")} />
            </button>
            <div className="h-8 w-[1px] bg-border mx-2" />
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 text-xs font-bold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-all shadow-lg shadow-red-500/20"
            >
              LOGOUT
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { label: 'Total Leads', value: stats.total, color: 'primary' },
            { label: 'Residential', value: stats.residential, color: 'blue' },
            { label: 'Investors', value: stats.investment, color: 'green' },
            { label: 'Top Locality', value: stats.topLocality, color: 'amber', small: true }
          ].map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-5 rounded-2xl border border-border shadow-sm"
            >
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-1">{s.label}</p>
              <p className={cn(
                "font-serif",
                s.small ? "text-lg md:text-xl truncate" : "text-2xl md:text-3xl"
              )}>
                {s.value}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm uppercase tracking-widest font-bold text-muted-foreground px-1">Recent Inquiries</h2>
            <div className="text-[10px] text-muted-foreground italic">
              Showing {leads.length} entries
            </div>
          </div>

          {leads.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-border">
              <p className="text-muted-foreground italic">No property inquiries have been captured yet.</p>
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
                    className="bg-white rounded-[1.5rem] border border-border p-5 md:p-6 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
                  >
                    {/* Purpose Ribbon */}
                    <div className={cn(
                      "absolute top-0 right-0 px-3 py-1 text-[8px] font-black uppercase tracking-tighter rounded-bl-lg",
                      lead.purpose === 'Investment' ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                    )}>
                      {lead.purpose}
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      {/* Left: Lead Identity */}
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                           <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shadow-inner">
                             {lead.name?.charAt(0) || '?'}
                           </div>
                           <div>
                             <h3 className="font-bold text-lg text-foreground leading-none mb-1">{lead.name || 'Anonymous'}</h3>
                             <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                               <Calendar className="w-3.5 h-3.5 text-primary/60" />
                               {lead.timestamp ? new Date(lead.timestamp).toLocaleDateString() : 'Unknown Date'}
                               <span className="opacity-30">•</span>
                               {lead.timestamp && new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                             </div>
                           </div>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                          <span className="text-[9px] uppercase tracking-widest font-black px-2.5 py-1 bg-muted rounded-full border border-border">{lead.propertyType}</span>
                          <span className="text-[9px] uppercase tracking-widest font-black px-2.5 py-1 bg-primary/5 text-primary rounded-full border border-primary/20">{lead.budget}</span>
                          {lead.bhk && <span className="text-[9px] uppercase tracking-widest font-black px-2.5 py-1 bg-muted rounded-full border border-border">{lead.bhk}</span>}
                        </div>
                      </div>

                      {/* Middle: Details List */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-[1.5] bg-muted/20 p-4 rounded-xl border border-border/50">
                        <div className="space-y-3">
                           <div className="flex items-center gap-3 text-sm group/contact cursor-pointer">
                             <div className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center group-hover/contact:bg-primary transition-colors">
                               <Phone className="w-3.5 h-3.5 text-primary group-hover/contact:text-white" />
                             </div>
                             <span className="font-bold text-foreground tabular-nums">{lead.phone}</span>
                           </div>
                           <div className="flex items-center gap-3 text-sm group/email cursor-pointer">
                             <div className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center group-hover/email:bg-primary transition-colors">
                               <Mail className="w-3.5 h-3.5 text-primary group-hover/email:text-white" />
                             </div>
                             <span className="text-muted-foreground truncate max-w-[150px]">{lead.email}</span>
                           </div>
                        </div>
                        <div className="space-y-3">
                           <div className="flex items-center gap-3 text-sm">
                             <div className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center">
                               <MapPin className="w-3.5 h-3.5 text-primary" />
                             </div>
                             <span className="font-bold text-foreground">{lead.locality}</span>
                           </div>
                           <div className="flex items-center gap-3 text-[10px] text-muted-foreground uppercase tracking-widest font-bold ml-10">
                             ID: #{lead.id?.slice(-4)}
                           </div>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center justify-end">
                        {deleteConfirmId === lead.id ? (
                          <div className="flex items-center gap-2 bg-red-50 p-2 rounded-xl animate-in fade-in slide-in-from-right-2 border border-red-100">
                            <span className="text-[10px] font-black text-red-600 px-2 uppercase tracking-tighter">Confirm?</span>
                            <button 
                              onClick={() => handleDelete(lead.id)}
                              className="bg-red-600 text-white p-2.5 rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => setDeleteConfirmId(null)}
                              className="bg-white border border-border p-2.5 rounded-lg hover:bg-muted transition-colors shadow-sm"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => setDeleteConfirmId(lead.id)}
                            className="p-4 text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-all rounded-2xl opacity-0 group-hover:opacity-100 focus:opacity-100 border border-transparent hover:border-red-100"
                          >
                            <Trash2 className="w-6 h-6" />
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
            Database connected · Secure session active
          </p>
        </div>
      </main>
    </div>
  )
}
