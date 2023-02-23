import { useState } from 'react';
import { wrapper } from "../redux/store";
import '../styles/style.css';
import '../styles/responsive.css';
import Layout from '../views/layout';


function MyApp({ Component, pageProps }) {
  const [currentPage, setCurrentPage] = useState(false);
  const pageName = (param) => {
    setCurrentPage(param);
  };
  return (
    <Layout currentPage={currentPage}>
      <Component {...pageProps} pageName={pageName} />  
    </Layout>
  );
}

export default wrapper.withRedux(MyApp);
