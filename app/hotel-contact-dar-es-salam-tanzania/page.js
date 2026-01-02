
import Link from "next/link"
import { BookingEngineProvider } from "../context/BookingEngineContext";
import FilterBar from "../Booking_engine/Filterbar";

const Contact = () => {
  return (
    <>
    
            <BookingEngineProvider>
                <FilterBar />
            </BookingEngineProvider>
   <div className="container inner_content">
      {/* Page Heading */}
      <div className="text-center mb-5">
        <h1 className="heading inner_heading">Contact Aura Suites in Dar es Salaam, Tanzania</h1>
        <p className="suit_content">
Whether you want to book a suite, plan your trip to Dar es Salaam, or inquire about our services, we are always happy to assist you. Just make a call, drop an email or pay us a visit at our location, and our travel desk will do all it takes to help you out!        </p>
      </div>

      {/* Contact Info */}
      <div className="row g-4 mb-5">
        {/* Address */}
        <div className="col-md-4 col-12">
          <div className="visit">
            <h4 className="mb-3">Visit Us</h4>
            <p className="mb-1">108/1 Morogoro Rd</p>
            <p className="mb-1">Lumumba Road Junction</p>
            <p>Dar es Salaam, Tanzania</p>
          </div>
        </div>
{/* Phone  */}
    <div className="col-md-4 col-12">
          <div className="visit">
            <h4 className="mb-3">Phone number</h4>
            <p>
              <strong>Phone:</strong>{' '}
              <a href="tel:+255746941286" className="text-decoration-none">
                +255 746 941 286 (Front Desk)
              </a>
            </p>
            
          </div>
        </div>

        {/* Email */}
        <div className="col-md-4 col-12">
          <div className="visit">
            <h4 className="mb-3">Contact Information</h4>
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:stay@aurasuites.co.tz" className="text-decoration-none">
                stay@aurasuites.co.tz
              </a>
            </p>
          </div>
        </div>
      </div>

      
    </div>
    </>
  )
}

export default Contact
