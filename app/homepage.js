"use client";
import dynamic from "next/dynamic";
import { BookingEngineProvider } from "./context/BookingEngineContext";
import SkeletonHotelGrid from "@/components/SkeletonCard";

const HeroSection = dynamic(
  () => import("@/components/HeroSection"),
  {
    ssr: false,
    loading: () => <SkeletonHotelGrid />,
  }
);

const FilterBar = dynamic(
  () => import("@/app/Booking_engine/Filterbar"),
  {
    ssr: false,
    loading: () => <SkeletonHotelGrid />,
  }
);

const NewHotel = dynamic(
  () => import("@/app/sliders/NewHotel"),
  {
    ssr: false,
    loading: () => <SkeletonHotelGrid />,
  }
);
const Suitslider = dynamic(
  () => import("@/app/sliders/Suitslider"),
  {
    ssr: false,
    loading: () => <SkeletonHotelGrid />,
  }
);

const HomeExploreSec = dynamic(
  () => import("@/components/HomeExploreSec"),
  {
    ssr: false,
    loading: () => <SkeletonHotelGrid />,
  }
);

const DiningExperience = dynamic(
  () => import("@/components/DiningExperience"),
  {
    ssr: false,
    loading: () => <SkeletonHotelGrid />,
  }
);

const Eventslider = dynamic(
  () => import("@/app/sliders/Eventslider"),
  {
    ssr: false,
    loading: () => <SkeletonHotelGrid />,
  }
);
const HomeOffer = dynamic(
  () => import("@/components/HomeOffer"),
  {
    ssr: false,
    loading: () => <SkeletonHotelGrid />,
  }
);

function HomePage({ contentData }) {

    return (
        <>
            <BookingEngineProvider>
                <FilterBar contentData={contentData} />
            </BookingEngineProvider>
            <HeroSection></HeroSection>
            <Suitslider />
            <DiningExperience></DiningExperience>
            <Eventslider />
            <HomeOffer></HomeOffer>
            <HomeExploreSec></HomeExploreSec>
            <NewHotel />
        </>
    );
}

export default HomePage
