import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiShield } from 'react-icons/fi'

export default function Login({ onToggleView, onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage('')
    
    // Simple basic validations
    if (!email || !password) {
      setErrorMessage('Please fill in all fields.')
      return
    }

    setLoading(true)
    // Simulate API delay
    setTimeout(() => {
      setLoading(false)
      if (email === 'admin@silambu.com' && password === 'password123') {
        onLoginSuccess({ email, name: 'Guardian Administrator' })
      } else {
        setErrorMessage('Invalid credentials. Hint: use admin@silambu.com / password123')
      }
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="tw:w-full tw:max-w-md animate__animated animate__fadeIn"
    >
      <div className="glass-card tw:p-8 tw:p-md-10 tw:border-sky-500/20">
        {/* Brand header */}
        <div className="text-center mb-4">
          <div className="brand-mark tw:mx-auto mb-3">
            <FiShield size={22} className="tw:text-slate-900" />
          </div>
          <h2 className="gradient-text font-display tw:text-2xl tw:font-bold mb-1">
            Welcome back
          </h2>
          <p className="tw:text-sm tw:text-slate-400">
            Sign in to access your child's safety dashboard
          </p>
        </div>

        {errorMessage && (
          <div className="alert alert-danger py-2 px-3 tw:text-sm animate__animated animate__headShake" role="alert">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email input */}
          <div className="mb-3">
            <label className="form-label tw:text-xs tw:text-slate-300 tw:font-medium tw:uppercase tw:tracking-wider">
              Email Address
            </label>
            <div className="input-group">
              <span className="input-group-text bg-dark-subtle border-secondary-subtle text-muted tw:bg-white/5 tw:border-white/10 tw:text-slate-400">
                <FiMail size={16} />
              </span>
              <input
                type="email"
                className="form-control bg-dark border-secondary-subtle text-white tw:bg-black/20 tw:border-white/10 focus:tw:border-cyan/50 focus:tw:ring-1 focus:tw:ring-cyan/20 focus:tw:outline-none"
                placeholder="guardian@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password input */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <label className="form-label tw:text-xs tw:text-slate-300 tw:font-medium tw:uppercase tw:tracking-wider mb-0">
                Password
              </label>
              <a
                href="#forgot"
                className="tw:text-xs tw:text-cyan-300 hover:tw:text-cyan tw:text-decoration-none"
                onClick={(e) => { e.preventDefault(); alert("Demo Forgot Password trigger!") }}
              >
                Forgot Password?
              </a>
            </div>
            <div className="input-group">
              <span className="input-group-text bg-dark-subtle border-secondary-subtle text-muted tw:bg-white/5 tw:border-white/10 tw:text-slate-400">
                <FiLock size={16} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control bg-dark border-secondary-subtle text-white tw:bg-black/20 tw:border-white/10 focus:tw:border-cyan/50 focus:tw:ring-1 focus:tw:ring-cyan/20 focus:tw:outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary border-secondary-subtle text-muted tw:border-white/10 hover:tw:bg-white/5"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div className="form-check mb-4">
            <input
              className="form-check-input bg-black/20 border-white/10"
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className="form-check-label tw:text-sm tw:text-slate-300" htmlFor="rememberMe">
              Remember my device
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="btn-silambu btn-silambu-primary w-100 mb-3"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : (
              <>
                Sign In <FiArrowRight className="btn-arrow" />
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-4 pt-3 tw:border-t tw:border-white/5">
          <p className="tw:text-sm tw:text-slate-400 mb-0">
            New to SILAMBU?{' '}
            <button
              onClick={onToggleView}
              className="tw:text-cyan-300 hover:tw:text-cyan tw:border-none tw:bg-transparent tw:p-0 tw:font-semibold"
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  )
}
