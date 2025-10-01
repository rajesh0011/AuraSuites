
export const metadata = {
    metadataBase: new URL('https://www.eckohotels.com'),
    alternates: {
      canonical: '/contact-us'
     },
    title: 'Explore Our Image Gallery and Videos - Aura Suites',
    keywords : "Hotels",
    description:"Explore the image gallery and videos of Aura Suites. Get a visual preview of our luxurious rooms, dining spaces, event venues, and top-notch amenities before you book your stay.", 
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