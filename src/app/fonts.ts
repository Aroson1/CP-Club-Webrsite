import localFont from 'next/font/local';

export const nevera = localFont({
  src: '../../public/fonts/Nevera-Regular.otf',
  display: 'swap',
  variable: '--font-nevera',
});

// import { IBM_Plex_Mono, Montserrat } from 'next/font/google';

// export const montserrat = Montserrat({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-montserrat',
//   preload: false,
// });

// export const ibmPlexMono = IBM_Plex_Mono({
//   subsets: ['latin'],
//   weight: ['400', '500', '700'],
//   display: 'swap',
//   variable: '--font-ibm-plex-mono',
//   preload: false,
// });