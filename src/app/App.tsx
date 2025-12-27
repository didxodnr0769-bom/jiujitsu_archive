import AppRoute from '../shared/route/AppRoute';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <>
      <AppRoute />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;