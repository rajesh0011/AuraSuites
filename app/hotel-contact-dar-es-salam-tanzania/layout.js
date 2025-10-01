
export const metadata = {
    metadataBase: new URL('https://www.eckohotels.com'),
    alternates: {
      canonical: '/contact-us'
     },
    title: 'Tanzania, Dar es Salaam Hotel Contact Number and Address - Aura Suites',
    keywords : "Hotels",
    description:"Find the contact number and address for Aura Suites, a premium hotel in Dar es Salaam, Tanzania. Reach out for bookings, inquiries, and assistance for a seamless stay experience.", 
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