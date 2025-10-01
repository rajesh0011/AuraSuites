"user client"
import { BookingEngineProvider } from "../context/BookingEngineContext";
import FilterBar from "../Booking_engine/Filterbar";
import Amenities from "../Booking_engine/Amenities";

export default function Offers() {
    return (
        <>
        <BookingEngineProvider>
            <FilterBar />
        </BookingEngineProvider>
        <h1 className="my-3">Comming Soon</h1>
        </>
    );
}