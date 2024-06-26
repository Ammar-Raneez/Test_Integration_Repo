import type { Metadata, Viewport } from 'next';
import ogImage from './og-image.jpg';
import { Inter } from 'next/font/google';
import './globals.css';
import { BreadcrumbList, Course, WithContext } from 'schema-dts';

const inter = Inter({ subsets: ['latin'] });

// Control mobile pinch to zoom in/out
export const viewport: Viewport = {
  initialScale: 2,
  maximumScale: 10,
  width: 'device-width',
  // userScalable: false
};

export const metadata: Metadata = {
  // metadataBase: new URL('http://localhost:3000'),
  metadataBase: new URL('https://test-integration-repo.vercel.app/'),
  title: 'Test Integration Metadata Title',
  description: 'Test integration Metadata Description',
  keywords: ['Next.js', 'Create Next App'],
  openGraph: {
    title: 'Test Integration',
    description:
      'Test Integration application with a few tools - these tools include: Sonarcloud, CodeQL, CodeFactor, Prettier, ESLint & Commitlint',
    type: 'website',
    images: [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: 'https://ammarraneez.vercel.app/',
    creator: '@Ammar',
    images: [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height,
      },
    ],
  },

  // iOS fullscreen when launched from home screen
  appleWebApp: {
    capable: true, // enables fullscreen
    title: 'Test Integration Apple Web App', // Fullscreen home title
    statusBarStyle: 'black', // status bar styling on fullscreen
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdBreadcrumbs: WithContext<BreadcrumbList> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://test-integration-repo.vercel.app/',
      },
    ],
  };

  const jsonLdData: WithContext<Course> = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Test Integration JSON-LD',
    description:
      'Test Integration application with a few tools - these tools include: Sonarcloud, CodeQL, CodeFactor, Prettier, ESLint & Commitlint',
    provider: {
      '@type': 'Organization',
      name: 'Ammar',
      sameAs: 'https://ammarraneez.vercel.app/',
    },
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdBreadcrumbs),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
        {children}
      </body>
    </html>
  );
}
