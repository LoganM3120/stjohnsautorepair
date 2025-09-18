import React, { PropsWithChildren } from 'react';

import Footer from './Footer';
import Header from './Header';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="app-shell">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
