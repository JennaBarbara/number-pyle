import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './index.css'
import App from './modes/number-pyle/number-pyle.tsx'
import NumberPyre from './modes/number-pyre/number-pyre.tsx';
import NumberScryer from './modes/number-scryer/number-scryer.tsx';

const router = createBrowserRouter( 
    [{
    // no component, just a path
    path: "number-pyle",
    children: [
        {
          index: true,
          element: <App />,
        },
        
        {
          path: "number-pyre",
          element: <NumberPyre />
        },
        {
          path: "number-scryer",
          element: <NumberScryer />
        }
    ],
  }],
);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <RouterProvider router={router} />,
  </StrictMode>,
)
