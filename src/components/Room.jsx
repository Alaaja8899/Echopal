import React, { useState } from 'react'
import { Home, Users, Radio } from 'lucide-react'
import { useAuthContext } from '../Context/Context'
import { JoinUserToRoom } from '../database'

function Room({ data: room }) {
  const { setRooming, user } = useAuthContext()
  const [isHovered, setIsHovered] = useState(false)
  const [ripples, setRipples] = useState([])

  const joiningRoom = (e) => {
    // Ripple animation
    const rect = e.currentTarget.getBoundingClientRect()
    const size = 100
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2
    const newRipple = { x, y, id: Date.now() }
    setRipples((prev) => [...prev, newRipple])
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
    }, 600)

    // Actual room join logic
    JoinUserToRoom(user.photoURL, user.uid, user.displayName, room.key, 'user')
    setRooming(true)
    localStorage.setItem('RoomID', room.key)
  }

  const userCount = room.users ? Object.values(room.users).length : 0
  const displayUsers = room.users ? Object.values(room.users).slice(0, 3) : []

  return (
    <div
      onClick={joiningRoom}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden cursor-pointer w-full md:max-w-md mx-auto"
      style={{
        // background:
        //   'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '24px',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Background hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          // background:
          //   'linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(220,38,38,0.08) 50%, rgba(185,28,28,0.08) 100%)',
          borderRadius: '24px',
        }}
      />

      {/* Ripple Effects */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '100px',
            height: '100px',
            // background:
            //   'radial-gradient(circle, rgba(239,68,68,0.3) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'ripple 0.6s ease-out forwards',
          }}
        />
      ))}

      {/* Floating Home Icon */}
      {/* <div
        className="absolute  -top-3 -left-3 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
        style={{
          background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
          boxShadow: '0 8px 32px rgba(220,38,38,0.3)',
        }}
      >
        <Home size={20} className="text-white" />
      </div> */}

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Title */}
        <h2 className="text-xl font-bold text-white truncate pr-8 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-rose-400 transition-all duration-300">
          {room.title}
        </h2>

        {/* Live Indicator */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Radio size={18} className="text-red-500 animate-pulse" />
            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20" />
          </div>
          <div className="flex items-center gap-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-red-400 to-rose-300 rounded-full"
                style={{
                  height: `${8 + Math.random() * 16}px`,
                  animation: `wave 1.5s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-red-300">Live Now</span>
        </div>

        {/* Users Preview */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex -space-x-3">
              {displayUsers.map((u, i) => (
                <div
                  key={i}
                  className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 transition-transform duration-300 hover:scale-110 hover:z-10"
                  style={{
                    transform: `translateX(${i * -4}px)`,
                    zIndex: displayUsers.length - i,
                  }}
                >
                  <img
                    src={u.photo}
                    alt={`User ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
                </div>
              ))}
              {userCount > 3 && (
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white/20"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    backdropFilter: 'blur(10px)',
                    transform: `translateX(${displayUsers.length * -4}px)`,
                  }}
                >
                  +{userCount - 3}
                </div>
              )}
            </div>
            <div className="ml-4 flex items-center gap-2 text-white/60">
              <Users size={16} />
              <span className="text-sm font-medium">{userCount} active</span>
            </div>
          </div>

          {/* Join Button */}
          <div
            className="px-4 py-2 rounded-full text-sm font-semibold text-white transition-all duration-300 group-hover:scale-105"
            style={{
              background: isHovered
                ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                : 'linear-gradient(135deg, rgba(239,68,68,0.6) 0%, rgba(220,38,38,0.6) 100%)',
              boxShadow: isHovered
                ? '0 8px 32px rgba(239,68,68,0.4)'
                : '0 4px 16px rgba(239,68,68,0.2)',
            }}
          >
            Join Room
          </div>
        </div>

        {/* Creator Info */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden">
              <img
                src={room.userPhoto}
                alt="Room creator"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm text-white/70">
              <span className="font-medium text-white/90">
                {room.creator?.split(' ')[0]}
              </span>
              's Room
            </span>
          </div>
          <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
        </div>
      </div>

      {/* Hover Glow */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, transparent 0%, rgba(239,68,68,0.05) 50%, transparent 100%)',
          boxShadow: '0 0 60px rgba(239,68,68,0.3)',
        }}
      />

      <style jsx>{`
        @keyframes wave {
          0%,
          100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(1.8);
          }
        }
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default Room
