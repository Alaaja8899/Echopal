import React, { useState, useEffect, useMemo } from 'react'
import { Search, Filter, Users, Globe, Clock, CheckCircle, XCircle, Calendar, UserCheck, Sparkles, Grid, List } from 'lucide-react'

function UsersShowcase() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [sortBy, setSortBy] = useState('recent')
  const [viewMode, setViewMode] = useState('grid')

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:3000/api/users')
        if (!response.ok) throw new Error('Failed to fetch users')
        const data = await response.json()
        setUsers(data)
      } catch (err) {
        setError(err.message)
        // Mock data for demo
        setUsers([
          {
            uid: "0AofJsEgvObVR5BpkXazLeacE0w2",
            email: "adenmohmuud@gmail.com",
            emailVerified: true,
            displayName: "Aden MOHMUUD",
            photoURL: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            disabled: false,
            metadata: {
              lastSignInTime: "Thu, 01 Aug 2024 10:25:04 GMT",
              creationTime: "Thu, 01 Aug 2024 10:25:04 GMT"
            }
          },
          {
            uid: "1BpfKtFhwPcWS6CqlYbaMfbdF1x3",
            email: "sarah.johnson@gmail.com",
            emailVerified: true,
            displayName: "Sarah Johnson",
            photoURL: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            disabled: false,
            metadata: {
              lastSignInTime: "Wed, 31 Jul 2024 15:30:22 GMT",
              creationTime: "Mon, 29 Jul 2024 09:15:33 GMT"
            }
          },
          {
            uid: "2CqgLuGixQdXT7DrmZcbNgceG2y4",
            email: "mike.chen@gmail.com",
            emailVerified: false,
            displayName: "Mike Chen",
            photoURL: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            disabled: false,
            metadata: {
              lastSignInTime: "Tue, 30 Jul 2024 08:45:15 GMT",
              creationTime: "Sun, 28 Jul 2024 14:22:11 GMT"
            }
          },
          {
            uid: "3DrHMvHjyReSY8EstAcOhceH3z5",
            email: "emma.wilson@gmail.com",
            emailVerified: true,
            displayName: "Emma Wilson",
            photoURL: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
            disabled: true,
            metadata: {
              lastSignInTime: "Mon, 29 Jul 2024 12:18:44 GMT",
              creationTime: "Sat, 27 Jul 2024 16:33:55 GMT"
            }
          },
          {
            uid: "4EsInwIkzSfTZ9FtuBdPiceI4A6",
            email: "alex.brown@gmail.com",
            emailVerified: true,
            displayName: "Alex Brown",
            photoURL: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
            disabled: false,
            metadata: {
              lastSignInTime: "Thu, 01 Aug 2024 11:55:33 GMT",
              creationTime: "Fri, 26 Jul 2024 10:44:22 GMT"
            }
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  // Filter and search logic
  const filteredUsers = useMemo(() => {
    let filtered = users.filter(user => {
      const matchesSearch = user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesFilter = selectedFilter === 'all' ||
                           (selectedFilter === 'verified' && user.emailVerified) ||
                           (selectedFilter === 'unverified' && !user.emailVerified) ||
                           (selectedFilter === 'active' && !user.disabled) ||
                           (selectedFilter === 'disabled' && user.disabled)
      
      return matchesSearch && matchesFilter
    })

    // Sort users
    filtered.sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.metadata?.lastSignInTime || 0) - new Date(a.metadata?.lastSignInTime || 0)
      } else if (sortBy === 'oldest') {
        return new Date(a.metadata?.creationTime || 0) - new Date(b.metadata?.creationTime || 0)
      } else if (sortBy === 'name') {
        return (a.displayName || '').localeCompare(b.displayName || '')
      }
      return 0
    })

    return filtered
  }, [users, searchTerm, selectedFilter, sortBy])

  const formatDate = (dateString) => {
    if (!dateString) return 'Never'
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getTimeAgo = (dateString) => {
    if (!dateString) return 'Never'
    const now = new Date()
    const date = new Date(dateString)
    const diff = now - date
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    
    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return 'Just now'
  }

  const UserCard = ({ user }) => (
    <div className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105"
         style={{
           background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
           backdropFilter: 'blur(20px)',
           border: '1px solid rgba(255,255,255,0.1)'
         }}>
      
      {/* Hover Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
           style={{
             background: 'linear-gradient(135deg, rgba(239,68,68,0.05) 0%, rgba(220,38,38,0.05) 100%)',
             borderRadius: '16px'
           }} />

      {/* Status Badge */}
      <div className="absolute top-3 right-3 z-10">
        {user.disabled ? (
          <div className="w-3 h-3 rounded-full bg-gray-500" />
        ) : (
          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
        )}
      </div>

      <div className="p-6 space-y-4">
        {/* Avatar and Basic Info */}
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-white/20">
              <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
            </div>
            {user.emailVerified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle size={14} className="text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white text-lg truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-rose-400 transition-all duration-300">
              {user.displayName}
            </h3>
            <p className="text-white/60 text-sm truncate">{user.email}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Clock size={14} />
            <span>Last seen {getTimeAgo(user.metadata?.lastSignInTime)}</span>
          </div>
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Calendar size={14} />
            <span>Joined {formatDate(user.metadata?.creationTime)}</span>
          </div>
        </div>

        {/* Verification Status */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div className="flex items-center gap-2">
            {user.emailVerified ? (
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <CheckCircle size={14} />
                <span>Verified</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-orange-400 text-sm">
                <XCircle size={14} />
                <span>Unverified</span>
              </div>
            )}
          </div>
          <div className={`text-xs px-2 py-1 rounded-full ${
            user.disabled 
              ? 'bg-gray-500/20 text-gray-300' 
              : 'bg-green-500/20 text-green-300'
          }`}>
            {user.disabled ? 'Disabled' : 'Active'}
          </div>
        </div>
      </div>
    </div>
  )

  const UserListItem = ({ user }) => (
    <div className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02]"
         style={{
           background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
           backdropFilter: 'blur(20px)',
           border: '1px solid rgba(255,255,255,0.1)'
         }}>
      
      <div className="flex items-center gap-4 p-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-white/20">
            <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
          </div>
          {user.emailVerified && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle size={12} className="text-white" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate group-hover:text-red-400 transition-colors">
            {user.displayName}
          </h3>
          <p className="text-white/60 text-sm truncate">{user.email}</p>
        </div>

        <div className="flex items-center gap-4 text-sm text-white/70">
          <div className="text-right">
            <div>Last seen {getTimeAgo(user.metadata?.lastSignInTime)}</div>
            <div className="text-xs">Joined {formatDate(user.metadata?.creationTime)}</div>
          </div>
          
          <div className={`px-3 py-1 rounded-full text-xs ${
            user.disabled 
              ? 'bg-gray-500/20 text-gray-300' 
              : 'bg-green-500/20 text-green-300'
          }`}>
            {user.disabled ? 'Disabled' : 'Active'}
          </div>

          <div className={`w-3 h-3 rounded-full ${
            user.disabled ? 'bg-gray-500' : 'bg-green-400 animate-pulse'
          }`} />
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="flex items-center gap-3 text-white">
          <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-lg">Loading users...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-50"
           style={{
             background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 100%)',
             backdropFilter: 'blur(20px)',
             borderBottom: '1px solid rgba(255,255,255,0.1)'
           }}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-red-500 to-rose-500 flex items-center justify-center">
                <Users size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                  Platform Users
                  <Sparkles size={24} className="text-red-400" />
                </h1>
                <p className="text-white/60">Discover and manage our community</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white">
                <Globe size={16} />
                <span className="font-semibold">{filteredUsers.length}</span>
                <span className="text-white/60">users</span>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 min-w-80">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl text-white placeholder-white/60 border border-white/20 transition-all duration-300 focus:border-red-500 focus:outline-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                  backdropFilter: 'blur(20px)'
                }}
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-white/60" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 rounded-xl text-white border border-white/20 focus:border-red-500 focus:outline-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                <option value="all">All Users</option>
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
                <option value="active">Active</option>
                <option value="disabled">Disabled</option>
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 rounded-xl text-white border border-white/20 focus:border-red-500 focus:outline-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <option value="recent">Recent Activity</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name A-Z</option>
            </select>

            {/* View Mode */}
            <div className="flex items-center gap-2 p-1 rounded-xl bg-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-red-500 text-white' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list' 
                    ? 'bg-red-500 text-white' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Users Grid/List */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <Users size={64} className="text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No users found</h3>
            <p className="text-white/60">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
              : "space-y-4"
          }>
            {filteredUsers.map((user) => 
              viewMode === 'grid' ? (
                <UserCard key={user.uid} user={user} />
              ) : (
                <UserListItem key={user.uid} user={user} />
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default UsersShowcase