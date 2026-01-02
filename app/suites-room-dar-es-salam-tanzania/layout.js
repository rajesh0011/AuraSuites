
export const metadata = {
    // metadataBase: new URL('https://www.aurasuites.co.tz'),
    alternates: {
      canonical: '/suites-room-dar-es-salam-tanzania'
     },
    title: 'Suites & Room Stay in Tanzania | Accommodations in Dar es Salaam | Aura Suites',
    keywords : "Hotels",
    description:"Discover premium accommodations in Dar es Salaam at Aura Suites. Enjoy spacious suites and comfortable rooms with modern amenities for a relaxing stay in Tanzania.", 
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