
export const metadata = {
    // metadataBase: new URL('https://www.eckohotels.com'),
    alternates: {
      canonical: '/event-venue-dar-es-salam-tanzania'
     },
    title: 'Meeting & Event Venues in Dar es Salaam | Wedding Halls | Aura Suites',
    keywords : "Hotels",
    description:"Host unforgettable events at Aura Suites with top meeting and event venues in Dar es Salaam. Perfect for weddings, conferences, and celebrations with elegant halls and premium services.", 
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