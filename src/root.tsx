import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router"

export function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <html lang="en">
    <head>
        <meta charSet="UTF-8" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Number Pyle</title>
        <Meta />
        <Links />
    </head>
    <body>
        {children}
        <ScrollRestoration />
        <Scripts />
    </body>
    </html>
  );
}

export function HydrateFallback() {
  return <div>Loading...</div>
}


export default function Root() {
  return (
      <Outlet />
  )
}