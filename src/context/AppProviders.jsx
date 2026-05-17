import { AuthProvider } from './AuthContext.jsx';
import { ToastProvider } from './ToastContext.jsx';
import { HelmetProvider } from 'react-helmet-async';

export default function AppProviders({ children }) {
  return (
    <HelmetProvider>
      <ToastProvider>
        <AuthProvider>{children}</AuthProvider>
      </ToastProvider>
    </HelmetProvider>
  );
}
