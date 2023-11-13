import { Inconsolata, Inter, Roboto_Mono } from 'next/font/google';
import localFont from 'next/font/local';

// Aguardo pela fonte Galaxie Copernicus. O setup está feito com o ficheiro que encontrei online.
// É só substituir o path do ficheiro e o ficheiro em si e adicionar o weight necessário.

// export const galaxieCopernicus = localFont({
//   src: './GalaxieCopernicus.woff',
// });

export const galaxieCopernicus = localFont({
  src: [
    {
      path: './GalaxieCopernicus.woff',
      weight: '700',
      style: 'normal',
    },
  ],
});

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const inconsolata = Inconsolata({
  subsets: ['latin'],
  display: 'swap',
});
