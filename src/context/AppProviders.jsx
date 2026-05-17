import { AuthProvider } from './AuthContext.jsx';
import { ToastProvider } from './ToastContext.jsx';

export default function AppProviders({ children }) {
  return (
    <ToastProvider>
      <AuthProvider>{children}</AuthProvider>
    </ToastProvider>
  );
}
