'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Lock, Table as TableIcon, RefreshCcw, ArrowLeft, Phone, Mail, Calendar, MapPin } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function LeadsDashboard() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')
  const [leads, setLeads] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(false)

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
        {leads.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-border">
            <p className="text-muted-foreground italic">No inquiries found yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-border shadow-xl shadow-black/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/30 border-b border-border">
                    <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Inquiry Details</th>
                    <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground hidden md:table-cell">Requirements</th>
                    <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground hidden lg:table-cell">Contact</th>
                    <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-muted/10 transition-colors group">
                      <td className="p-4">
                        <div className="font-bold text-foreground">{lead.name}</div>
                        <div className="text-xs text-primary mt-1 md:hidden">{lead.phone}</div>
                        <div className="text-[10px] text-muted-foreground mt-1 flex flex-wrap gap-2 md:hidden">
                          <span className="bg-muted px-2 py-0.5 rounded">{lead.propertyType}</span>
                          <span className="bg-muted px-2 py-0.5 rounded">{lead.budget}</span>
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <div className="space-y-1">
                          <div className="text-sm font-medium flex items-center gap-2">
                             <span className="text-xs px-2 py-0.5 bg-primary/5 text-primary rounded-md">{lead.propertyType}</span>
                             {lead.bhk && <span className="text-xs px-2 py-0.5 bg-primary/5 text-primary rounded-md">{lead.bhk}</span>}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-2">
                             <MapPin className="w-3 h-3" /> {lead.locality} · {lead.budget}
                          </div>
                          <div className="text-[10px] text-muted-foreground italic">Purpose: {lead.purpose}</div>
                        </div>
                      </td>
                      <td className="p-4 hidden lg:table-cell">
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                            <Phone className="w-3 h-3" /> {lead.phone}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="w-3 h-3" /> {lead.email}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="text-sm font-medium">{new Date(lead.timestamp).toLocaleDateString()}</div>
                        <div className="text-[10px] text-muted-foreground flex items-center justify-end gap-1">
                          <Calendar className="w-3 h-3" /> {new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
            Data refreshes automatically on server restart
          </p>
        </div>
      </main>
    </div>
  )
}
