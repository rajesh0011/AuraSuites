
export const metadata = {
    metadataBase: new URL('https://www.eckohotels.com'),
    alternates: {
      canonical: '/contact-us'
     },
    title: 'Hotel Offers & Deals in Tanzania Dar Es Salaam - Aura Suites',
    keywords : "Hotels",
    description:"Discover the best hotel offers and deals in Dar es Salaam, Tanzania at Aura Suites. Enjoy exclusive discounts on luxurious stays, dining, and event bookings for a memorable experience.", 
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