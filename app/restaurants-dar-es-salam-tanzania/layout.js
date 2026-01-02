
export const metadata = {
    // metadataBase: new URL('https://www.eckohotels.com'),
    alternates: {
      canonical: '/restaurants-dar-es-salam-tanzania'
     },
    title: 'Fine Dining Restaurants In Dar Es Salaam | Kinaya Bar | Aura Suites',
    keywords : "Hotels",
    description:"Experience fine dining at Kinaya Bar, one of the top restaurants in Dar es Salaam at Aura Suites. Savor gourmet cuisine, stylish ambiance, and exceptional service in the heart of Tanzania.", 
  }
  
  export default function contactLayout({
    children, // will be a page or nested layout
  }) {
    return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}

   
        {children}
      
      </section>
      
    )
  }