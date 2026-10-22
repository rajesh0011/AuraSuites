
import { Montserrat } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import Script from "next/script";

import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import Addbootstrap from "./common/bootstrap";
// import "./booking.css";
import "./custom.css";
import Footer from "./common/Footer"
import Header from "./common/Header";

const montserrat = Montserrat({
  subsets: ['latin'],
  preload: true,
});
export const metadata = {
  alternates: {
    canonical: '/'
  },
  title: 'Hotels in Dar es Salaam, Tanzania - Aura Suites',
  description:"Looking for the best hotels in Dar es Salaam, Tanzania? Aura Suites offers modern rooms, prime location, comfortable amenities, and a relaxing stay ideal for business and leisure travelers.", 
  openGraph: {
    title: 'The Aura Suits Hotels',
    description:"The Aura Suits Hotels Description", 
  }
}

const GTM_ID = 'GTM-NQRH6WNR';

export default function Layout({ children }) {

  return (
    <html lang="en" className={montserrat.className}>
       <head>
        {/* Google Tag Manager Script */}
        <meta name="google-site-verification" content="kQragmdIyLmHxu7xz5JyyCC6WBbcPXuLrnLK5YY6KWA" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="icon" type="image/png" href="/images/favicon.png" />
        <meta name="robots" content="index, follow" />
      </head>

      <body>
         <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NQRH6WNR"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Addbootstrap />
        <Header />
        <main>{children}</main>
        <Footer />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
};


