import './app/styles/index.scss';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './app/app.tsx';

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
