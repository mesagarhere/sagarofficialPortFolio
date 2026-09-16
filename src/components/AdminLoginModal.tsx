import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Lock,
  Eye,
  EyeOff,
  X,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Mail,
  Send,
  RefreshCw,
  ShieldCheck,
  ExternalLink,
  ChevronLeft,
  Key,
  Clock,
  AlertCircle
} from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const {
    isAdminLoginOpen,
    setIsAdminLoginOpen,
    loginAdmin,
    adminPasscode,
    adminRecoveryEmail,
    setAdminRecoveryEmail,
    sendAdminVerificationCode,
    verifyCodeAndResetPasscode
  } = usePortfolio();

  // Mode: 'login' | 'forgot'
  const [modalMode, setModalMode] = useState<'login' | 'forgot'>('login');

  // Login form state
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [resetMsg, setResetMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Forgot Password / Email Verification state
  const ownerEmail = adminRecoveryEmail;
  const [verificationCode, setVerificationCode] = useState('');
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmNewPasscode, setConfirmNewPasscode] = useState('');
  const [showNewPasscode, setShowNewPasscode] = useState(false);
  const [showConfirmNewPasscode, setShowConfirmNewPasscode] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [codeSentData, setCodeSentData] = useState<{
    sent: boolean;
    email: string;
    maskedEmail?: string;
  } | null>(null);
  const [forgotStatus, setForgotStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  if (!isAdminLoginOpen) return null;



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setErrorMsg('Please enter your admin passcode.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setResetMsg('');

    setTimeout(() => {
      const res = loginAdmin(passcode.trim());
      setIsLoading(false);
      if (!res.success) {
        setErrorMsg(res.error || 'Invalid passcode. Access restricted.');
      } else {
        setPasscode('');
        setErrorMsg('');
      }
    }, 200);
  };



  const handleSendVerificationCode = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const targetEmail = ownerEmail;
    setIsSendingCode(true);
    setForgotStatus(null);

    try {
      const res = await sendAdminVerificationCode(targetEmail);
      setIsSendingCode(false);
      if (res.success) {
        setCodeSentData({
          sent: true,
          email: targetEmail,
          maskedEmail: res.maskedEmail || targetEmail,
        });
        setForgotStatus({
          type: 'success',
          message: res.message || `Verification code sent to ${res.maskedEmail || targetEmail}. Please check your inbox.`,
        });
      } else {
        setForgotStatus({
          type: 'error',
          message: res.error || 'Could not send verification code. Please try again.',
        });
      }
    } catch {
      setIsSendingCode(false);
      setForgotStatus({
        type: 'error',
        message: 'Network error. Please try again.',
      });
    }
  };

  const handleVerifyAndReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetEmail = ownerEmail;
    const code = verificationCode.trim();
    const cleanPass = newPasscode.trim();

    if (!code) {
      setForgotStatus({
        type: 'error',
        message: 'Please enter the 6-digit verification code.',
      });
      return;
    }

    if (!cleanPass || cleanPass.length < 4) {
      setForgotStatus({
        type: 'error',
        message: 'New passcode must be at least 4 characters long.',
      });
      return;
    }

    if (cleanPass !== confirmNewPasscode.trim()) {
      setForgotStatus({
        type: 'error',
        message: 'New passcodes do not match.',
      });
      return;
    }

    setIsVerifyingCode(true);
    setForgotStatus(null);

    const res = await verifyCodeAndResetPasscode(code, cleanPass, targetEmail);
    setIsVerifyingCode(false);

    if (res.success) {
      setForgotStatus({
        type: 'success',
        message: `Admin passcode changed to "${cleanPass}"! Logging you into Admin Studio...`,
      });
      setTimeout(() => {
        handleClose();
      }, 1200);
    } else {
      setForgotStatus({
        type: 'error',
        message: res.error || 'Verification failed. Please double check the code.',
      });
    }
  };

  const handleClose = () => {
    setIsAdminLoginOpen(false);
    setPasscode('');
    setErrorMsg('');
    setResetMsg('');
    setModalMode('login');
    setCodeSentData(null);
    setVerificationCode('');
    setNewPasscode('');
    setConfirmNewPasscode('');
    setForgotStatus(null);
  };

  return (
    <div
      id="admin-login-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-auth-title"
    >
      <div
        id="admin-login-card"
        className="relative w-full max-w-lg rounded-3xl glass-panel border border-white/20 p-6 sm:p-7 shadow-2xl text-left overflow-hidden max-h-[92vh] overflow-y-auto"
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-blue-500/15 border border-blue-500/30 text-blue-400 shadow-inner shrink-0">
              {modalMode === 'login' ? <Lock className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
            </div>
            <div>
              <h3
                id="admin-auth-title"
                className="text-lg font-bold text-white tracking-tight"
              >
                {modalMode === 'login' ? 'Admin Authorization' : 'Forgot Passcode Recovery'}
              </h3>
              <p className="text-xs text-neutral-400">
                {modalMode === 'login'
                  ? 'Sagar D. Portfolio CMS & Customizer'
                  : 'Direct verification code sent to owner email'}
              </p>
            </div>
          </div>

          <button
            type="button"
            id="btn-close-admin-login"
            onClick={handleClose}
            aria-label="Close admin login"
            className="p-1.5 rounded-full text-neutral-400 hover:text-white glass-panel transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ======================= MODE 1: STANDARD LOGIN ======================= */}
        {modalMode === 'login' && (
          <div>
            {/* Notice for visitors */}
            <div className="mb-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5 text-xs text-amber-200/90 leading-relaxed">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Portfolio customization is <strong>strictly locked for owner administration</strong>. Once unlocked, all editing buttons and the Admin Studio are enabled.
              </span>
            </div>

            <div className="mb-4 p-3 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-start gap-2.5 text-xs text-blue-200">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-blue-100">Admin Passcode Active</p>
                <p className="text-[11px] text-blue-200/80 mt-0.5">
                  Your portfolio editor is protected by your personalized passcode.
                </p>
              </div>
            </div>

            {/* Passcode entry form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="admin-passcode-input"
                    className="block text-xs font-semibold uppercase tracking-wider text-neutral-300"
                  >
                    Enter Admin Passcode
                  </label>

                  {/* Forgot passcode -> Email code trigger */}
                  <button
                    type="button"
                    onClick={() => {
                      setModalMode('forgot');
                      setErrorMsg('');
                      setResetMsg('');
                    }}
                    className="text-[11px] font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Mail className="w-3 h-3" />
                    <span>Forgot Passcode? Send Code to Email</span>
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showPasscode ? 'text' : 'password'}
                    id="admin-passcode-input"
                    autoFocus
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      if (errorMsg) setErrorMsg('');
                      if (resetMsg) setResetMsg('');
                    }}
                    placeholder="Enter your private passcode"
                    className="w-full px-4 py-2.5 pr-10 rounded-xl bg-white/[0.06] border border-white/20 text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                  />
                  <button
                    type="button"
                    id="btn-toggle-show-passcode"
                    onClick={() => setShowPasscode(!showPasscode)}
                    aria-label={showPasscode ? 'Hide passcode' : 'Show passcode'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
                  >
                    {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {resetMsg && (
                  <p className="text-xs text-emerald-400 font-medium mt-1.5 flex items-center gap-1.5 animate-in fade-in">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{resetMsg}</span>
                  </p>
                )}

                {errorMsg && (
                  <p className="text-xs text-red-400 font-medium mt-1.5 flex items-center gap-1.5 animate-in fade-in">
                    <span>✕</span> {errorMsg}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  id="btn-cancel-admin-login"
                  onClick={handleClose}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white glass-panel transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="btn-submit-admin-login"
                  disabled={isLoading}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/25 cursor-pointer disabled:opacity-50"
                >
                  <span>{isLoading ? 'Verifying...' : 'Unlock with Passcode'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ======================= MODE 2: FORGOT PASSCODE -> EMAIL VERIFICATION ======================= */}
        {modalMode === 'forgot' && (
          <div className="space-y-4">
            {/* Back button */}
            <button
              type="button"
              onClick={() => {
                setModalMode('login');
                setForgotStatus(null);
              }}
              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to standard login</span>
            </button>

            {/* Email Verification Card */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/15 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Authorized Portfolio Owner</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Owner Only</span>
                </span>
              </div>

              {/* Locked Owner Email Badge */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-black/50 border border-white/10">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white font-mono truncate">{ownerEmail}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  </div>
                  <p className="text-[10px] text-neutral-400 mt-0.5">
                    Registered Owner & Administrator
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-neutral-300 leading-relaxed">
                <strong className="text-amber-300">Security Restricted:</strong> Verification codes can only be requested and sent to the portfolio owner. Other users cannot change this email.
              </p>

              <button
                type="button"
                onClick={() => handleSendVerificationCode()}
                disabled={isSendingCode}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSendingCode ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending Code...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>{codeSentData ? 'Resend Verification Code' : 'Send Verification Code'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct Email Confirmation Notice (Secret & Confidential) */}
            {codeSentData && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3 animate-in fade-in">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h5 className="text-xs font-bold text-emerald-300">Code Dispatched to Admin Email</h5>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                        Private & Confidential
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      For your protection, the 6-digit verification code is <strong className="text-white">NOT displayed on this website</strong> so other visitors cannot see it or reset your password.
                    </p>
                    <p className="text-xs text-neutral-400">
                      Dispatched directly to: <span className="font-mono font-semibold text-emerald-300">{codeSentData.maskedEmail || 'lov*****gl@gmail.com'}</span>
                    </p>
                  </div>
                </div>

                {/* Direct Inbox Check Button */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-emerald-500/20">
                  <a
                    href="https://mail.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3.5 rounded-xl bg-red-600/90 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Open Gmail Inbox</span>
                    <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                  </a>

                  <div className="flex items-center gap-1 text-[11px] text-neutral-400">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span>Code valid for 15 minutes</span>
                  </div>
                </div>
              </div>
            )}

            {/* Verification Form */}
            <form onSubmit={handleVerifyAndReset} className="space-y-3.5">
              {/* Step 1: Verification Code Input */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  1. Enter 6-Digit Verification Code from Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    maxLength={6}
                    value={verificationCode}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setVerificationCode(val);
                      if (forgotStatus) setForgotStatus(null);
                    }}
                    placeholder="Enter code (e.g. 481920)"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/20 text-white font-mono tracking-widest text-center text-lg placeholder-neutral-600 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  />
                </div>
              </div>

              {/* Step 2: New Passcode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    2. New Admin Passcode
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPasscode ? 'text' : 'password'}
                      value={newPasscode}
                      onChange={(e) => {
                        setNewPasscode(e.target.value);
                        if (forgotStatus) setForgotStatus(null);
                      }}
                      placeholder="Min 4 chars"
                      className="w-full px-3 py-2 pr-9 rounded-xl bg-black/40 border border-white/20 text-white text-xs placeholder-neutral-600 focus:outline-none focus:border-blue-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPasscode(!showNewPasscode)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
                    >
                      {showNewPasscode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    3. Confirm Passcode
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmNewPasscode ? 'text' : 'password'}
                      value={confirmNewPasscode}
                      onChange={(e) => {
                        setConfirmNewPasscode(e.target.value);
                        if (forgotStatus) setForgotStatus(null);
                      }}
                      placeholder="Re-enter passcode"
                      className="w-full px-3 py-2 pr-9 rounded-xl bg-black/40 border border-white/20 text-white text-xs placeholder-neutral-600 focus:outline-none focus:border-blue-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmNewPasscode(!showConfirmNewPasscode)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
                    >
                      {showConfirmNewPasscode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Status Message */}
              {forgotStatus && (
                <div
                  className={`p-3 rounded-xl flex items-start gap-2 text-xs font-medium ${
                    forgotStatus.type === 'success'
                      ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-500/15 border border-rose-500/30 text-rose-300'
                  }`}
                >
                  {forgotStatus.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <span>{forgotStatus.message}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setModalMode('login');
                    setForgotStatus(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white glass-panel transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isVerifyingCode || !verificationCode}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/25 cursor-pointer disabled:opacity-50"
                >
                  {isVerifyingCode ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <Key className="w-3.5 h-3.5" />
                      <span>Verify & Reset Passcode</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
