import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiShield, FiAlertTriangle, FiMapPin, FiActivity, FiCpu, FiLogOut } from 'react-icons/fi'
import Login from './components/Login'
import Signup from './components/Signup'

const FEATURES = [
  {
    icon: <FiCpu className="tw:text-cyan-300" size={24} />,
    title: "Edge AI Intelligence",
    desc: "Processes biometric telemetry locally on the wearable for zero-latency danger detection."
  },
  {
    icon: <FiActivity className="tw:text-emerald-400" size={24} />,
    title: "Behaviour Learning",
    desc: "Continuously learns your child's daily routines to instantly spot behavioral anomalies."
  },
  {
    icon: <FiAlertTriangle className="tw:text-amber-400" size={24} />,
    title: "Emergency Auto-Trigger",
    desc: "Automatically initiates SOS procedures even when the child is unable to call for help."
  },
  {
    icon: <FiMapPin className="tw:text-red-400" size={24} />,
    title: "Precision GPS & Geofencing",
    desc: "Know exactly where they are with ultra-precise location telemetry and instant boundary alerts."
  }
]

export default function App() {
  const [view, setView] = useState('login') // 'login' | 'signup' | 'dashboard'
  const [user, setUser] = useState(null)
  const [featureIndex, setFeatureIndex] = useState(0)

  // Rotate features on the left panel every 4 seconds
  useEffect(() => {
    if (view === 'dashboard') return
    const interval = setInterval(() => {
      setFeatureIndex((prev) => (prev + 1) % FEATURES.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [view])

  const handleLoginSuccess = (userData) => {
    setUser(userData)
    setView('dashboard')
  }

  const handleSignupSuccess = (userData) => {
    setUser(userData)
    setView('dashboard')
  }

  const handleSignOut = () => {
    setUser(null)
    setView('login')
  }

  return (
    <main className="min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden tw:py-8">
      {/* Dynamic Background Elements */}
      <div className="grid-bg position-absolute inset-0 z-0 pointer-events-none" />
      
      {/* Background Glowing Orbs */}
      <div className="orb hero-orb-1 anim-orb-drift" style={{ width: '500px', height: '500px', top: '-10%', left: '-10%' }} />
      <div className="orb hero-orb-2 anim-orb-drift" style={{ width: '400px', height: '400px', bottom: '-5%', right: '-5%' }} />
      <div className="orb hero-orb-3 anim-orb-drift" style={{ width: '300px', height: '300px', top: '30%', left: '40%' }} />

      <div className="container position-relative z-1">
        {view === 'dashboard' ? (
          /* High-Fidelity Mock Dashboard view on successful login */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card tw:max-w-4xl tw:mx-auto tw:p-8 tw:p-md-10"
          >
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-5 pb-3 tw:border-b tw:border-white/10">
              <div className="d-flex align-items-center gap-3 mb-3 mb-md-0">
                <div className="brand-mark">
                  <FiShield size={22} className="tw:text-slate-900" />
                </div>
                <div>
                  <h1 className="gradient-text font-display tw:text-2xl tw:font-bold mb-0">
                    SILAMBU Console
                  </h1>
                  <p className="tw:text-xs tw:text-slate-400 mb-0">Guardian Security Hub</p>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3">
                <span className="chip chip-green">
                  <span className="chip-dot" /> System Active
                </span>
                <button onClick={handleSignOut} className="btn-silambu btn-silambu-ghost tw:py-2 tw:px-4 tw:text-sm">
                  <FiLogOut size={14} className="me-2" /> Sign Out
                </button>
              </div>
            </div>

            <div className="row g-4">
              <div className="col-12 col-md-4">
                <div className="glass-card tw:p-5 tw:border-white/5 tw:bg-white/[0.02] h-100">
                  <h3 className="tw:text-sm tw:text-slate-400 tw:font-medium mb-3">Guardian Profile</h3>
                  <div className="mb-2 tw:text-white tw:font-semibold">{user?.name}</div>
                  <div className="tw:text-xs tw:text-slate-400">{user?.email}</div>
                  <div className="mt-4">
                    <span className="tw:text-[10px] tw:text-cyan-300 tw:uppercase tw:tracking-widest tw:font-bold">Role</span>
                    <p className="tw:text-sm tw:text-slate-300">Primary Administrator</p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-8">
                <div className="glass-card tw:p-5 tw:border-white/5 tw:bg-white/[0.02]">
                  <h3 className="tw:text-sm tw:text-slate-400 tw:font-medium mb-3">Wearable Status Monitor</h3>
                  <div className="row g-3">
                    <div className="col-6 col-sm-3 text-center">
                      <div className="tw:p-3 tw:rounded-lg tw:bg-white/5">
                        <div className="tw:text-xs tw:text-slate-400 mb-1">Battery</div>
                        <div className="tw:text-lg tw:text-white tw:font-bold">94%</div>
                      </div>
                    </div>
                    <div className="col-6 col-sm-3 text-center">
                      <div className="tw:p-3 tw:rounded-lg tw:bg-white/5">
                        <div className="tw:text-xs tw:text-slate-400 mb-1">Signal</div>
                        <div className="tw:text-lg tw:text-emerald-400 tw:font-bold">Strong</div>
                      </div>
                    </div>
                    <div className="col-6 col-sm-3 text-center">
                      <div className="tw:p-3 tw:rounded-lg tw:bg-white/5">
                        <div className="tw:text-xs tw:text-slate-400 mb-1">Heart Rate</div>
                        <div className="tw:text-lg tw:text-pink-400 tw:font-bold">78 BPM</div>
                      </div>
                    </div>
                    <div className="col-6 col-sm-3 text-center">
                      <div className="tw:p-3 tw:rounded-lg tw:bg-white/5">
                        <div className="tw:text-xs tw:text-slate-400 mb-1">Alerts</div>
                        <div className="tw:text-lg tw:text-slate-400 tw:font-bold">0 Active</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 tw:p-4 tw:rounded-xl tw:bg-emerald-500/10 tw:border tw:border-emerald-500/20 d-flex align-items-center gap-3">
                    <div className="tw:p-2 tw:rounded-lg tw:bg-emerald-500/20 tw:text-emerald-400">
                      <FiShield size={20} />
                    </div>
                    <div>
                      <div className="tw:text-xs tw:text-emerald-300 tw:font-bold">Status Secure</div>
                      <div className="tw:text-xs tw:text-slate-400">Edge AI is active and monitoring environmental telemetry.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Split Authentication view (Desktop layout) */
          <div className="row justify-content-center align-items-center g-5">
            {/* Left Column: Visual Brand Panel (Visible on lg and up) */}
            <div className="col-12 col-lg-6 d-none d-lg-block">
              <div className="tw:pe-8">
                {/* Brand logo */}
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="brand-mark">
                    <FiShield size={22} className="tw:text-slate-900" />
                  </div>
                  <h1 className="brand-name mb-0">SILAMBU</h1>
                </div>

                <h2 className="font-display tw:text-4xl tw:font-extrabold tw:leading-tight mb-4">
                  The Intelligent Guard For Your <span className="gradient-text">Child's Safety</span>
                </h2>

                <p className="tw:text-slate-400 mb-5">
                  SILAMBU combines Edge AI telemetry, behaviour analytics, and environmental sensor fusion to guarantee security, even when they cannot request help.
                </p>

                {/* Pulsing Visual Wearable Mockup */}
                <div className="position-relative tw:w-full tw:h-64 d-flex align-items-center justify-content-center mb-5">
                  <div className="wearable">
                    <div className="wearable-scan" />
                    <div className="wearable-scan-2" />
                    <div className="wearable-pulse" />
                    <div className="wearable-pulse-2" />
                    <div className="wearable-ring">
                      <div className="wearable-inner">
                        <FiShield size={48} className="animate__animated animate__pulse animate__infinite" />
                      </div>
                      <div className="wearable-node n1" />
                      <div className="wearable-node n2" />
                      <div className="wearable-node n3" />
                      <div className="wearable-node n4" />
                    </div>
                  </div>
                </div>

                {/* Rotating features indicator */}
                <div className="glass-card tw:p-4 tw:border-white/5 tw:bg-white/[0.01]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.4 }}
                      className="d-flex gap-3 align-items-start"
                    >
                      <div className="tw:p-3 tw:rounded-xl tw:bg-white/5 tw:flex-shrink-0">
                        {FEATURES[featureIndex].icon}
                      </div>
                      <div>
                        <h4 className="tw:text-base tw:font-semibold tw:text-white mb-1">
                          {FEATURES[featureIndex].title}
                        </h4>
                        <p className="tw:text-xs tw:text-slate-400 mb-0">
                          {FEATURES[featureIndex].desc}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Right Column: Forms panel */}
            <div className="col-12 col-lg-6 d-flex justify-content-center">
              <AnimatePresence mode="wait">
                {view === 'login' ? (
                  <Login
                    key="login"
                    onToggleView={() => setView('signup')}
                    onLoginSuccess={handleLoginSuccess}
                  />
                ) : (
                  <Signup
                    key="signup"
                    onToggleView={() => setView('login')}
                    onSignupSuccess={handleSignupSuccess}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
