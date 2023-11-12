import localFont from 'next/font/local';

// Aguardo pela fonte Galaxie Copernicus. O setup está feito com o ficheiro que encontrei online.
// É só substituir o path do ficheiro e o ficheiro em si e adicionar o weight necessário.

// export const galaxieCopernicus = localFont({
//   src: './GalaxieCopernicus-Book.woff',
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
