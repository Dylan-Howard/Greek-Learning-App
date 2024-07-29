export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* <link rel="apple-touch-icon" sizes="144x144" href="%PUBLIC_URL%/static/img/apple-touch-icon.png" /> */}
        {/* <link rel="apple-touch-icon" sizes="114x114" href="%PUBLIC_URL%/static/img/apple-touch-icon.png" /> */}
        {/* <link rel="apple-touch-icon" sizes="72x72" href="%PUBLIC_URL%/static/img/apple-touch-icon.png" /> */}
        {/* <link rel="apple-touch-icon" href="%PUBLIC_URL%/static/img/favicon-32x32.png" /> */}
        <meta name="theme-color" content="#F1F1F9" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1B2021" media="(prefers-color-scheme: dark)" />
        <meta
          name="description"
          content="Koine: Your Companion to Reading the Bible in its Original Languages"
        />
        <title>Koine</title>
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">
          {children}
        </div>
      </body>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap" rel="stylesheet" precedence="default" />
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" precedence="default" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" precedence="default" />
    </html>
  )
}