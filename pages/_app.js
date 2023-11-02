import '../styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { NoirProvider } from '../components/context';
import '../styles/BinaryTree.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <NoirProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </NoirProvider>
    </>
  );
}
