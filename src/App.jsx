import AppProviders from './context/AppProviders.jsx';
import AppRouter from './routes/AppRouter.jsx';

export default function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}
