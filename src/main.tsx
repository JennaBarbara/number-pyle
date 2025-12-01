import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './index.css'
import App from './App.tsx'
import NumberPyre from './alternate-modes/number-pyre/number-pyre.tsx';
import NumberScryer from './alternate-modes/number-scryer/number-scryer.tsx';

const router = createBrowserRouter([
  {
    path: "/number-pyle/",
    element: <App />,
  },
  
  {
    path: "/number-pyre/",
    element: <NumberPyre />
  },
  {
    path: "/number-scryer/",
    element: <NumberScryer />
  }
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <RouterProvider router={router} />,
  </StrictMode>,
)
