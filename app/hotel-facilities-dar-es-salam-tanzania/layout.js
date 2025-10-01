
export const metadata = {
    metadataBase: new URL('https://www.eckohotels.com'),
    alternates: {
      canonical: '/contact-us'
     },
    title: 'Hotels with Swimming Pool | Fitness Centre | near Dar Es Salaam | Aura Suites',
    keywords : "Hotels",
    description:"Stay at Aura Suites, a premium hotel near Dar es Salaam offering a swimming pool, fitness centre, and modern amenities for a relaxing and rejuvenating experience in Tanzania.", 
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