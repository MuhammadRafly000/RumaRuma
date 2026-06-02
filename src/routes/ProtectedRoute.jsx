import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, isAuthenticated, status } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const [isReady, setIsReady] = useState(false);
  const toastShown = useRef(false);

  useEffect(() => {
    if (status === 'loading') return;

    if (!isAuthenticated) {
      // Pass `from` as a plain string so LoginPage doesn't need to handle
      // both string and Location object shapes (matches Cart/Checkout pattern).
      const from = location.pathname + (location.search || '');
      navigate('/login', { state: { from }, replace: true });
      return;
    }

    if (requireAdmin && user?.role !== 'admin') {
      if (!toastShown.current) {
        toast.error('Akses Ditolak', 'Anda tidak memiliki izin untuk mengakses halaman Admin.');
        toastShown.current = true;
      }
      navigate('/', { replace: true });
      return;
    }

    setIsReady(true);
  }, [status, isAuthenticated, requireAdmin, user, navigate, location, toast]);

  if (status === 'loading' || !isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-sage-200 border-t-sage-600"></div>
      </div>
    );
  }

  return children;
}
