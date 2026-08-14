import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiShield, FiUser } from 'react-icons/fi'

export default function Signup({ onToggleView, onSignupSuccess }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Calculate password strength simple helper
  const getPasswordStrength = () => {
    if (!password) return { text: 'Empty', score: 0, color: 'bg-danger' }
    let score = 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    switch (score) {
      case 0:
      case 1:
        return { text: 'Weak', score: 25, color: 'bg-danger' }
      case 2:
        return { text: 'Fair', score: 50, color: 'bg-warning' }
      case 3:
        return { text: 'Good', score: 75, color: 'bg-info' }
      case 4:
        return { text: 'Strong', score: 100, color: 'bg-success' }
      default:
        return { text: 'Weak', score: 25, color: 'bg-danger' }
    }
  }

  const strength = getPasswordStrength()

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields.')
      return
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.')
      return
    }

    if (!agreeTerms) {
      setErrorMessage('You must agree to the Terms of Service & Privacy Policy.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onSignupSuccess({ email, name })
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
            Create Account
          </h2>
          <p className="tw:text-sm tw:text-slate-400">
            Set up your secure guardian safety profile
          </p>
        </div>

        {errorMessage && (
          <div className="alert alert-danger py-2 px-3 tw:text-sm animate__animated animate__headShake" role="alert">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name input */}
          <div className="mb-3">
            <label className="form-label tw:text-xs tw:text-slate-300 tw:font-medium tw:uppercase tw:tracking-wider">
              Full Name
            </label>
            <div className="input-group">
              <span className="input-group-text bg-dark-subtle border-secondary-subtle text-muted tw:bg-white/5 tw:border-white/10 tw:text-slate-400">
                <FiUser size={16} />
              </span>
              <input
                type="text"
                className="form-control bg-dark border-secondary-subtle text-white tw:bg-black/20 tw:border-white/10 focus:tw:border-cyan/50 focus:tw:ring-1 focus:tw:ring-cyan/20 focus:tw:outline-none"
                placeholder="Alex Johnson"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

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
          <div className="mb-3">
            <label className="form-label tw:text-xs tw:text-slate-300 tw:font-medium tw:uppercase tw:tracking-wider mb-1">
              Create Password
            </label>
            <div className="input-group">
              <span className="input-group-text bg-dark-subtle border-secondary-subtle text-muted tw:bg-white/5 tw:border-white/10 tw:text-slate-400">
                <FiLock size={16} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control bg-dark border-secondary-subtle text-white tw:bg-black/20 tw:border-white/10 focus:tw:border-cyan/50 focus:tw:ring-1 focus:tw:ring-cyan/20 focus:tw:outline-none"
                placeholder="Minimum 8 characters"
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

            {/* Password strength visualizer */}
            {password && (
              <div className="mt-2">
                <div className="progress bg-secondary-subtle tw:bg-white/5" style={{ height: '4px' }}>
                  <div
                    className={`progress-bar ${strength.color}`}
                    role="progressbar"
                    style={{ width: `${strength.score}%`, transition: 'width 0.4s ease' }}
                    aria-valuenow={strength.score}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <div className="d-flex justify-content-between mt-1">
                  <span className="tw:text-[10px] tw:text-slate-400">Strength:</span>
                  <span className={`tw:text-[10px] tw:font-bold ${strength.color.replace('bg-', 'tw:text-')}`}>
                    {strength.text}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password input */}
          <div className="mb-4">
            <label className="form-label tw:text-xs tw:text-slate-300 tw:font-medium tw:uppercase tw:tracking-wider">
              Confirm Password
            </label>
            <div className="input-group">
              <span className="input-group-text bg-dark-subtle border-secondary-subtle text-muted tw:bg-white/5 tw:border-white/10 tw:text-slate-400">
                <FiLock size={16} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control bg-dark border-secondary-subtle text-white tw:bg-black/20 tw:border-white/10 focus:tw:border-cyan/50 focus:tw:ring-1 focus:tw:ring-cyan/20 focus:tw:outline-none"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Agree to terms */}
          <div className="form-check mb-4">
            <input
              className="form-check-input bg-black/20 border-white/10"
              type="checkbox"
              id="agreeTerms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <label className="form-check-label tw:text-sm tw:text-slate-300" htmlFor="agreeTerms">
              I agree to the <a href="#terms" className="tw:text-cyan-300 hover:tw:text-cyan">Terms of Service</a> & <a href="#privacy" className="tw:text-cyan-300 hover:tw:text-cyan">Privacy Policy</a>
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
                Register Account <FiArrowRight className="btn-arrow" />
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-4 pt-3 tw:border-t tw:border-white/5">
          <p className="tw:text-sm tw:text-slate-400 mb-0">
            Already have a profile?{' '}
            <button
              onClick={onToggleView}
              className="tw:text-cyan-300 hover:tw:text-cyan tw:border-none tw:bg-transparent tw:p-0 tw:font-semibold"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  )
}
