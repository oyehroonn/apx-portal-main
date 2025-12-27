import { useState, useRef, useEffect } from 'react';
import { Camera, CheckCircle, XCircle, AlertCircle, X, ArrowRight } from 'lucide-react';

type KycStatus = 'not_started' | 'pending' | 'verified' | 'rejected';

interface KycVerificationCardProps {
  status?: KycStatus;
  contractorId?: string | number;
  onStatusChange?: (status: KycStatus) => void;
}

export default function KycVerificationCard({ status: initialStatus = 'not_started', contractorId, onStatusChange }: KycVerificationCardProps) {
  const [status, setStatus] = useState<KycStatus>(initialStatus);
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState<'id' | 'selfie'>('id');
  const [idPhoto, setIdPhoto] = useState<string | null>(null);
  const [selfiePhoto, setSelfiePhoto] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fetch KYC status on mount
  useEffect(() => {
    const fetchStatus = async () => {
      if (!contractorId) return;
      
      // Try API first
      try {
        const response = await fetch(`http://127.0.0.1:5001/api/kyc/status?contractorId=${contractorId}`);
        if (response.ok) {
          const data = await response.json();
          setStatus(data.status || 'not_started');
          return;
        }
      } catch (error) {
        console.warn('API unavailable, checking localStorage:', error);
      }
      
      // Fallback to localStorage
      try {
        const stored = localStorage.getItem(`kyc_${contractorId}`);
        if (stored) {
          const kycData = JSON.parse(stored);
          setStatus(kycData.status || 'not_started');
        }
      } catch (error) {
        console.error('Failed to read localStorage:', error);
      }
    };
    fetchStatus();
  }, [contractorId]);

  const getStatusBadge = () => {
    switch (status) {
      case 'verified':
        return (
          <span className="px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-semibold">
            Verified
          </span>
        );
      case 'pending':
        return (
          <span className="px-2 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-semibold">
            Pending
          </span>
        );
      case 'rejected':
        return (
          <span className="px-2 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-semibold">
            Rejected
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-400 text-[10px] font-semibold">
            Not Started
          </span>
        );
    }
  };

  const startCamera = async () => {
    try {
      setError(null);
      // Stop any existing stream first
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      
      // For ID photos, try environment (back camera) first, fallback to user (front)
      // For selfies, use user (front camera)
      const videoConstraints = step === 'selfie' 
        ? { facingMode: 'user' }
        : { facingMode: { ideal: 'environment' } };
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: videoConstraints,
        audio: false,
      });
      
      setStream(mediaStream);
    } catch (err: any) {
      console.error('Camera error:', err);
      setError('Camera access denied. Please allow camera permissions or use upload instead.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const photoData = canvas.toDataURL('image/jpeg');
        if (step === 'id') {
          setIdPhoto(photoData);
        } else {
          setSelfiePhoto(photoData);
        }
        stopCamera();
      }
    }
  };

  const handleRetake = () => {
    if (step === 'id') {
      setIdPhoto(null);
    } else {
      setSelfiePhoto(null);
    }
    startCamera();
  };

  const handleContinue = () => {
    if (step === 'id' && idPhoto) {
      setStep('selfie');
      // Stop current stream before switching
      stopCamera();
      // Camera will start when user clicks "Open Camera" button
    }
  };

  const handleSubmit = async () => {
    if (!idPhoto || !selfiePhoto) return;

    setLoading(true);
    try {
      // Convert data URLs to blobs
      const idBlob = await (await fetch(idPhoto)).blob();
      const selfieBlob = await (await fetch(selfiePhoto)).blob();

      // Create FormData
      const formData = new FormData();
      formData.append('idPhoto', idBlob, 'id-photo.jpg');
      formData.append('selfiePhoto', selfieBlob, 'selfie-photo.jpg');
      if (contractorId) {
        formData.append('contractorId', contractorId.toString());
      }

      // Try to submit to API, but fallback to local storage if backend is down
      try {
        const response = await fetch('http://127.0.0.1:5001/api/kyc/submit', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('API request failed');
        }

        // Update status
        setStatus('pending');
        if (onStatusChange) {
          onStatusChange('pending');
        }
      } catch (apiError) {
        // Backend is down - store locally in localStorage as fallback
        console.warn('Backend unavailable, storing locally:', apiError);
        const kycData = {
          contractorId: contractorId?.toString() || 'unknown',
          idPhoto,
          selfiePhoto,
          status: 'pending',
          submittedAt: new Date().toISOString(),
        };
        localStorage.setItem(`kyc_${contractorId}`, JSON.stringify(kycData));
        
        // Update status locally
        setStatus('pending');
        if (onStatusChange) {
          onStatusChange('pending');
        }
      }

      // Reset and close
      setIdPhoto(null);
      setSelfiePhoto(null);
      setStep('id');
      setShowModal(false);
    } catch (err: any) {
      console.error('KYC submission error:', err);
      setError(err.message || 'Failed to submit verification');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    if (status === 'verified' || status === 'pending') return;
    setShowModal(true);
    setStep('id');
    setIdPhoto(null);
    setSelfiePhoto(null);
    setError(null);
    // Don't start camera automatically - user clicks "Open Camera" button
  };

  const handleCloseModal = () => {
    stopCamera();
    setShowModal(false);
    setStep('id');
    setIdPhoto(null);
    setSelfiePhoto(null);
    setError(null);
  };

  // Update video element when stream changes
  useEffect(() => {
    const video = videoRef.current;
    if (video && stream) {
      // Clear any existing srcObject first
      if (video.srcObject) {
        const oldStream = video.srcObject as MediaStream;
        oldStream.getTracks().forEach((track) => track.stop());
      }
      
      video.srcObject = stream;
      video.muted = true;
      
      // Wait for video to be ready
      const handleLoadedMetadata = () => {
        video.play().catch((err) => {
          console.error('Video play error:', err);
          setError('Failed to start video. Please try again.');
        });
      };
      
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        if (video.srcObject) {
          const tracks = (video.srcObject as MediaStream).getTracks();
          tracks.forEach((track) => track.stop());
          video.srcObject = null;
        }
      };
    }
    
    return () => {
      // Cleanup on unmount
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <>
      <div className="glass-card p-6 rounded-2xl flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-slate-800 border border-white/5">
              <Camera className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white">KYC Photo ID Verification</h4>
              <p className="text-xs text-slate-500">Identity verification</p>
            </div>
          </div>
          {getStatusBadge()}
        </div>

        {status === 'verified' && (
          <div className="mt-2 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-emerald-400">Your identity has been verified</span>
          </div>
        )}

        {status === 'pending' && (
          <div className="mt-2 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-amber-400">Verification is under review</span>
          </div>
        )}

        <button
          onClick={handleOpenModal}
          disabled={status === 'verified' || status === 'pending'}
          className="mt-auto w-full py-2 rounded-lg bg-emerald-500 text-slate-900 font-semibold hover:bg-emerald-400 shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-400"
        >
          {status === 'not_started' || status === 'rejected' ? 'Verify Photo ID' : status === 'pending' ? 'Verification Pending' : 'Verified'}
        </button>
      </div>

      {/* KYC Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-panel rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-white/10 shadow-2xl">
            {/* Header */}
            <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-white mb-1">
                  {step === 'id' ? 'Capture Photo ID' : 'Capture Selfie'}
                </h2>
                <p className="text-slate-400 text-sm">
                  {step === 'id'
                    ? 'Take a clear photo of your government-issued ID'
                    : 'Take a selfie to verify your identity'}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/10 transition-colors text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8">
              {error && (
                <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              {step === 'id' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                    <h3 className="text-sm font-medium text-white mb-2">Accepted Documents</h3>
                    <ul className="text-xs text-slate-400 space-y-1">
                      <li>• Driving License</li>
                      <li>• National ID Card</li>
                      <li>• Passport</li>
                    </ul>
                  </div>

                  {!idPhoto ? (
                    <div className="space-y-4">
                      {!stream ? (
                        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-white/10 rounded-xl">
                          <Camera className="w-12 h-12 text-slate-500 mb-4" />
                          <button
                            onClick={startCamera}
                            className="px-6 py-3 rounded-xl bg-emerald-500 text-slate-900 font-semibold hover:bg-emerald-400 transition-colors"
                          >
                            Open Camera
                          </button>
                        </div>
                      ) : (
                        <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden border border-white/10">
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover"
                          />
                          <canvas ref={canvasRef} className="hidden" />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="border-2 border-emerald-500 rounded-lg w-64 h-40" />
                          </div>
                        </div>
                      )}

                      {stream && (
                        <button
                          onClick={capturePhoto}
                          className="w-full py-3 rounded-xl bg-emerald-500 text-slate-900 font-semibold hover:bg-emerald-400 transition-colors"
                        >
                          Take Photo
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden">
                        <img src={idPhoto} alt="ID Photo" className="w-full h-full object-contain" />
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={handleRetake}
                          className="flex-1 py-3 rounded-xl border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors"
                        >
                          Retake
                        </button>
                        <button
                          onClick={handleContinue}
                          className="flex-1 py-3 rounded-xl bg-emerald-500 text-slate-900 font-semibold hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2"
                        >
                          Continue <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === 'selfie' && (
                <div className="space-y-6">
                  {!selfiePhoto ? (
                    <div className="space-y-4">
                      {!stream ? (
                        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-white/10 rounded-xl">
                          <Camera className="w-12 h-12 text-slate-500 mb-4" />
                          <button
                            onClick={startCamera}
                            className="px-6 py-3 rounded-xl bg-emerald-500 text-slate-900 font-semibold hover:bg-emerald-400 transition-colors"
                          >
                            Open Camera
                          </button>
                        </div>
                      ) : (
                        <div className="relative aspect-square bg-slate-900 rounded-xl overflow-hidden max-w-md mx-auto">
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover"
                            style={{ transform: 'scaleX(-1)' }}
                          />
                          <canvas ref={canvasRef} className="hidden" />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="border-2 border-emerald-500 rounded-full w-48 h-48" />
                          </div>
                        </div>
                      )}

                      {stream && (
                        <button
                          onClick={capturePhoto}
                          className="w-full py-3 rounded-xl bg-emerald-500 text-slate-900 font-semibold hover:bg-emerald-400 transition-colors"
                        >
                          Take Selfie
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative aspect-square bg-slate-900 rounded-xl overflow-hidden max-w-md mx-auto border border-white/10">
                        <img src={selfiePhoto} alt="Selfie" className="w-full h-full object-cover rounded-xl" />
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={handleRetake}
                          className="flex-1 py-3 rounded-xl border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors"
                        >
                          Retake
                        </button>
                        <button
                          onClick={handleSubmit}
                          disabled={loading}
                          className="flex-1 py-3 rounded-xl bg-emerald-500 text-slate-900 font-semibold hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {loading ? 'Submitting...' : 'Submit'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

