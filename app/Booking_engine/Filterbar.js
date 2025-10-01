"use client";
import { useBookingEngineContext } from "../context/BookingEngineContext";
import * as ReactDOM from "react-dom";
import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";
import "flatpickr/dist/themes/material_green.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { faPlane, faDiamond, faMaximize, faPeopleGroup, faTrain, } from "@fortawesome/free-solid-svg-icons";

import WizardSidebar from "./PaymentGateway/WizardForm";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './booking.css';
import { createSignature } from '../../utilities/signature';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

const dummyImage = "/no_image.jpg";

const FilterBar = ({ contentData }) => {
    // const { setSelectedPropertyId, selectedPropertyId, setSelectedPropertyName, setSelectedPropertyPhone, setFilteredRooms,
    //   selectedRoom, setSelectedRoom, setSelectedRoomRate, setPropertyId, setCancellationPolicyState
    //   , selectedRoomDetails, setSelectedRoomDetails,
    //   totalPrice,
    //   selectedStartDate,
    //   selectedEndDate,
    //   setTotalPrice,
    //   selectedSetRateDataList,
    //   setRateResponse,
    //   setPromoCodeContext } = useBookingEngineContext();
  // const [filters, setFilters] = useState({
  //   offer: "",
  //   query: "",
  //   dateRange: { start: "", end: "", totalPrice: 0 },
  //   guests: { adults: 1, children: 0, rooms: 1 },
  // });
  // const [destination, setDestination] = useState("");
  // const [filteredProperties, setFilteredProperties] = useState([]);
  // const [suggestions, setSuggestions] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  // const [hasSearched, setHasSearched] = useState(false);
  // const [propertyList, setPropertyList] = useState([]);
  const [isClassAddedBook, setIsClassAddedBook] = useState(false);
  // const [activeHotel, setActiveHotel] = useState(null);
  // const [visibleOfferRoomId, setVisibleOfferRoomId] = useState(null);
  // const [isFocused, setIsFocused] = useState(false);
  // const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [isHandleSearched, setHandleSearched] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

const [nextDate, setNextDate] = useState(() => {
  const tomorrow = new Date();  
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
});

  // useEffect(() => {
  //   if (selectedRoomDetails?.isPropertyVisible == false) {
  //     setVisibleOfferRoomId(null);
  //   }
  // }, [selectedRoomDetails?.isPropertyVisible]);


  // useEffect(() => {
  //   if (destination.trim() && selectedRoom?.length > 0 && selectedRoom[0].roomId != "") {
  //     handleDateChange(selectedStartDate, selectedEndDate, 0);
  //     handleSearch();
  //   }
  // }, [selectedStartDate, selectedEndDate]);

  useEffect(() => {
    // const fetchPrices = async () => {
    //   if (!isHandleSearched) {
    //     return;
    //   }
    //   else {
    //     setHandleSearched(false);
    //     try {
    //       const timestamp = Date.now().toString();
    //       const secret = "ABDEFGHJKLMOPQRSTUVWXYZ123456789";
    //       const signature = await createSignature(JSON.stringify(selectedPropertyId), timestamp, secret);


    //       return null;

          
    //     } catch (error) {
    //       console.error("Error fetching prices:", error);
    //     }
    //   }
    // };

    // fetchPrices();
  }, [isHandleSearched]);

  // function handleBlur() {
  //   setTimeout(() => {
  //     setIsFocused(false);
  //   }, 200);
  // }

  // const handleFocus = () => {
  //   setIsFocused(true);
  // };
  // const handleKeyDown = (e) => {
  //   if (e.key === 'Escape') {
  //     setIsFocused(false);
  //   }
  // };

  // Handle destination input change
  // const handleDestinationChange = async (e) => {
  //   const input = e.target.value;
  //   setIsFocused(true);
  //   setDestination(input);

  //   if (input) {
  //     try {
  //       const matchedSuggestions = propertyList
  //         .flatMapx((property) => [
  //           { name: property.PropertyData.Address.City, id: property.PropertyData.PropertyId },
  //           { name: property.PropertyData.PropertyName, id: property.PropertyData.PropertyId },
  //         ])
  //         .filter((item) => item.name.toLowerCase().includes(input.toLowerCase()));
  //       setSuggestions([...new Set(matchedSuggestions)]);
  //     } catch (error) {
  //       console.error("Error fetching suggestions:", error);
  //       setSuggestions([]);
  //     }
  //   } else  {
  //     setSuggestions([]);
  //   }
  // };
  // Handle search
  const handleSearch = () => {
    // if (!destination.trim()) {
    //   toast.error("Please enter a city/hotel.");
    //   return;
    // }
    // else if (selectedStartDate == "" || selectedEndDate == "" || selectedEndDate == selectedStartDate) {
    //   toast.error("Please choose check-in and check-out both date.");
    //   return;
    // }
    // const overlay = document.createElement('div');
    // overlay.style.position = 'fixed';
    // overlay.style.top = '0';
    // overlay.style.left = '0';
    // overlay.style.width = '100%';
    // overlay.style.height = '100%';
    // overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    // overlay.style.zIndex = '100';
    // document.body.appendChild(overlay);
    // document.body.style.overflow = 'hidden';
    // document.querySelector('.hotels-rooms-list').style.overflow = 'auto';
    // setIsClassAddedBook(true);

    // if (propertyList) {

    //   setHandleSearched(true);
    //   const result = propertyList.filter((property) => {

    //     const matchesDestination =
    //       destination
    //         ? property.PropertyData.Address.City.toLowerCase().includes(destination.toLowerCase()) ||
    //         property.PropertyData.PropertyName.toLowerCase().includes(destination.toLowerCase())
    //         : true;
    //     return matchesDestination;
    //   });
    //   setFilteredProperties(result);
    //   setHasSearched(true);

    //   ///setHandleSearched(false);
    // } else {
    //   console.error("PropertyList is undefined or not an array");
    // }
  };

  // const handleBookNow = (PropertyId, PropertyName, Phone) => {

  //   setSelectedPropertyPhone(Phone);
  //   //setSelectedPropertyId(propertyId);  
  //   setSelectedPropertyName(PropertyName);
  //   toggleBookNow(PropertyId);
  //   setTimeout(() => {
  //     const element = document.getElementById(`hotel-${PropertyId}`);
  //     if (element) {
  //       element.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   }, 100);
  // }
  // const calculateNumberOfDays = () => {
  //   if (!selectedStartDate || !selectedEndDate) return 1;
  //   const start = new Date(selectedStartDate);
  //   const end = new Date(selectedEndDate);
  //   const diffTime = Math.abs(end - start);
  //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  //   return diffDays;
  // };

  // const calculateBasePrice = () => {
  //   const numberOfDays = calculateNumberOfDays();

  //   // Sum all selectedRoom's roomRate
  //   const totalRoomRate = selectedRoom?.reduce((sum, room) => sum + (room?.roomRate || 0), 0);

  //   return totalRoomRate * numberOfDays;
  // };

  // const calculateTotalWithTax = () => {
  //   const basePrice = calculateBasePrice();
  //   const taxRate = basePrice >= 7000 ? 0.18 : 0.12;
  //   const taxAmount = basePrice * taxRate;
  //   return basePrice + taxAmount;
  // };

  // const finalAmount = calculateTotalWithTax();
  // const handleSuggestionClick = (suggestion) => {
  //   setDestination(suggestion.name);
  //   setSelectedPropertyId(suggestion.id); // Set the selected property ID
  //   setSuggestions([]);

  //   const result = propertyList.filter((property) => property.PropertyData.PropertyId === suggestion.id);
  //   setFilteredProperties(result);
  //   setHasSearched(true);
  // };
  // const handleGetDetails = (rooms) => {
  //   const roomId = rooms.RoomId;

  //   const roomCount = selectedRoom.filter(room => room.roomId === roomId).length;

  //   if (roomCount > rooms.MinInventory) {
  //     if (rooms.MinInventory == 0) {
  //       toast.error("This room is not available for selected date.");
  //     }
  //     else {
  //       toast.error(`Only ${rooms.MinInventory} room(s) allowed for ${rooms.RoomName}`);
  //     }
  //     return; 
  //   }

  //   setVisibleOfferRoomId((prev) => (prev === roomId ? null : roomId));
  //   setSelectedRoomDetails({ isPropertyVisible: true, id: selectedRoomDetails?.id });

  //   if (selectedRoomDetails?.id) {
  //     setSelectedRoom((prev) => {
  //       const updatedRooms = prev.map((room) => {
  //         if (room?.id === selectedRoomDetails?.id) {
  //           if ((room.adults + room.children) <= rooms.MaxGuest) {
  //             return {
  //               ...room,
  //               roomId: roomId,
  //               maxGuest: rooms.MaxGuest,
  //               maxAdult: rooms.MaxAdult,
  //               maxChildren: rooms.MaxChildren,
  //               roomName: rooms.RoomName,
  //               roomRate: rooms.RackRate,
  //               roomImage: rooms.Images[0]
  //             };
  //           } else {
  //             toast.error(`Only ${rooms.MaxGuest} guests including adults and Children are allowed for this room`);
  //           }
  //         }
  //         return room;
  //       });

  //       return updatedRooms;
  //     });
  //   } else {
  //     // setSelectedRoom((prev) => {
  //     //   if (prev.length > 0) {

  //     //     if ((prev[0].children + prev[0].adults) <= rooms.MaxGuest) {
  //     //       const first = prev[0];
  //     //       return [
  //     //         {
  //     //           id: first?.id,
  //     //           roomId: roomId,
  //     //           maxGuest: rooms.MaxGuest,
  //     //           maxAdult: rooms.MaxAdult,
  //     //           maxChildren: rooms.MaxChildren,
  //     //           roomName: rooms.RoomName,
  //     //           roomRate: rooms.RackRate,
  //     //           roomImage: rooms.Images[0],
  //     //           adults: first?.adults,
  //     //           children: first?.children
  //     //         },
  //     //         ...prev.slice(1)
  //     //       ];
  //     //     }
  //     //     else {
  //     //       toast.error(`Only ${rooms.MaxGuest} guests including adults and Children are allowed for this room`)
  //     //       return [
  //     //         {
  //     //           ...prev[0]
  //     //         },
  //     //         ...prev.slice(1)
  //     //       ];
  //     //     }
  //     //   } else {
  //     //     return [
  //     //       {
  //     //         roomId: roomId,
  //     //         roomName: rooms.RoomName,
  //     //         roomRate: rooms.RackRate,
  //     //         roomImage: rooms.Images[0],
  //     //         adults: 1,
  //     //         children: 0,
  //     //         extraAdultRate: rooms.ExtraAdultRate
  //     //       }
  //     //     ];
  //     //   }
  //     // });
  //   }

  //   setSelectedRoomRate({ roomId: roomId, roomRate: rooms.RackRate });

  //   setTimeout(() => {
  //     document.getElementById(`offer-${roomId}`)?.scrollIntoView({ behavior: 'smooth' });
  //   }, 100);
  // };

  // function stripHtml(html) {
  //   if (!html) return "";
  //   const entityMap = {
  //     '&rsquo;': "'",
  //     '&lsquo;': "'",
  //     '&rdquo;': '"',
  //     '&ldquo;': '"',
  //     '&mdash;': '—',
  //     '&ndash;': '–',
  //     '&nbsp;': ' ',
  //     '&amp;': '&',
  //     '&lt;': '<',
  //     '&gt;': '>',
  //     '&quot;': '"',
  //     '&#39;': "'",
  //   };
  //   let decoded = html.replace(/&[a-zA-Z0-9#]+;/g, (match) => entityMap[match] || '');
  //   decoded = decoded.replace(/<[^>]+>/g, "");
  //   decoded = decoded.replace(/['’“”—]/g, " ");
  //   return decoded.replace(/\s+/g, " ").trim();
  // }

  // const handleSelectRoom = (mapping, rate, rooms, packageRate, adultRate) => {
  //   if (!rooms.RestrictionTitle && rooms.RestrictionTitle == "") {
  //     SelectedRoomWithOffer(mapping);
  //     if (selectedRoomDetails?.id) {
  //       const roomCount = selectedRoom.filter(room => room.roomId === rooms.RoomId).length;
  //       if (roomCount <= rooms.MinInventory) {
  //         setSelectedRoom((prev) =>
  //           prev.map((room, index) =>
  //             room?.id === selectedRoomDetails?.id &&
  //               room.adults <= room.maxAdult &&
  //               (parseInt(room.adults) + parseInt(room.children)) <= room.maxGuest
  //               ? {
  //                 ...room,
  //                 roomPackage: rate.RateName,
  //                 rateId: rate.RateId,
  //                 applicableGuest: mapping.ApplicableGuest,
  //                 applicableAdult: mapping.ApplicableAdult,
  //                 applicableChild: mapping?.ApplicableChild ? mapping?.ApplicableChild : 0,
  //                 roomRateWithTax: parseInt(
  //                   rooms?.RatePlans?.find((element) => element.RateId === mapping.RateId)
  //                     ?.Rates?.[Object.keys(rooms?.RatePlans?.[0]?.Rates || {})[0]]
  //                     ?.OBP?.[prev[index]?.adults?.toString()]?.RateAfterTax || "0"
  //                 ),
  //                 packageRate:
  //                   rooms?.RatePlans?.find((element) => element.RateId === mapping.RateId)
  //                     ?.Rates?.[Object.keys(rooms?.RatePlans?.[0]?.Rates || {})[0]]
  //                     ?.OBP?.[prev[index]?.adults?.toString()]?.RateBeforeTax || "0",
  //                 roomAdultExtraCharge: (parseInt(
  //                   rooms?.RatePlans?.find((element) => element.RateId === mapping.RateId)
  //                     ?.Rates?.[Object.keys(rooms?.RatePlans?.[0]?.Rates || {})[0]]
  //                     ?.OBP?.[prev[index]?.adults?.toString()]?.RateAfterTax || "0"
  //                 ) - parseInt(
  //                   rooms?.RatePlans?.find((element) => element.RateId === mapping.RateId)
  //                     ?.Rates?.[Object.keys(rooms?.RatePlans?.[0]?.Rates || {})[0]]
  //                     ?.OBP?.[prev["1"]]?.RateAfterTax || "0"
  //                 )),
  //               }
  //               : room
  //           )
  //         );
  //       }

  //       else {
  //         setSelectedRoom((prev) => {
  //           if (prev.length === 0) return prev; // nothing to reset

  //           const updated = [...prev];
  //           const lastIndex = updated.length - 1;
  //           const lastRoom = updated[lastIndex];

  //           updated[lastIndex] = {
  //             id: lastRoom.id,
  //             roomId: '',
  //             roomName: '',
  //             roomRate: '',
  //             roomImage: {},
  //             adults: 1,
  //             children: 0
  //           };

  //           return updated;
  //         });

  //         toast.error(`Only ${rooms.MinInventory} room(s) allowed for ${rooms.RoomName}`);
  //       }

  //     } else {
  //       // If no id, replace only the first record and keep the rest unchanged
  //       setSelectedRoom((prev) => {
  //         if (prev.length > 0) {
  //           const pacRate = rooms?.RatePlans?.find(element => element.RateId === mapping.RateId)
  //             ?.Rates?.[Object.keys(rooms?.RatePlans?.[0]?.Rates || {})[0]]
  //             ?.OBP;
  //           return [
  //             {
  //               ...prev[0], roomPackage: rate.RateName, rateId: rate.RateId,
  //               applicableGuest: mapping.ApplicableGuest, applicableAdult: mapping.ApplicableAdult,
  //               applicableChild: mapping?.ApplicableChild ? mapping?.ApplicableChild : 0,
  //               adultExRate: parseFloat(pacRate?.[prev[0].adults.toString()]?.RateAfterTax || "0") - parseFloat(pacRate?.[0]?.RateAfterTax || "0"),
  //               packageRate: parseFloat(pacRate?.[prev[0].adults.toString()]?.RateBeforeTax || "0")
  //             },
  //             ...prev.slice(1)
  //           ];
  //         } else {
  //           return [{ roomPackage: rate.RateName }];
  //         }
  //       });

  //     }
  //     if (finalAmount !== 0 && finalAmount !== null && !isNaN(finalAmount)) {
  //       setTotalPrice(finalAmount);
  //     }
  //   }
  //   else {
  //     toast.error(rooms.RestrictionTitle)
  //   }
  // }
  // const handleDateChange = (startDate, endDate, totalPrice) => {
  //   if (startDate != '' && endDate != '') {

  //     setFilters({
  //       ...filters,
  //       dateRange: { start: startDate, end: endDate, totalPrice },
  //     });
  //   }
  //   else {
  //     toast.error("Please choose check-in and check-out both date.");
  //   }
  // };

  // const handleRoomChange = (adults, children, roomCount) => {
  //   setFilters((prev) => ({
  //     ...prev,
  //     guests: { adults, children, rooms: roomCount },
  //   }));
  // };

  // const showBookingEngine = () => {
  //   setIsVisible(true);
  // };

  // const hideBookingEngine = () => {
  //   setIsVisible(false);
  // };

  // const toggleBookNow = (id) => {
  //   setActiveHotel((prev) => (prev === id ? null : id));
  // };

  // const toggleAmenitiesPopup = () => {
  //   setShowAllAmenities(!showAllAmenities);
  // };

  // const removeHtmlTags = (htmlString) => {
  //   return htmlString
  //     .replace(/\n|\t/g, "")
  //     .replace(/<\/?ul>/g, "")
  //     .replace(/<br\s*\/?>/g, "")
  //     .replace(/&nbsp;/g, " ");
  // };
  const [isWizardVisible, setIsWizardVisible] = useState(false);

  // const toggleWizard = () => {
  //   setIsWizardVisible(!isWizardVisible);
  // };

  // const status = () => {
  //   window.location.reload();
  // };
  // const SelectedRoomWithOffer = (mapping) => {
  //   if (!mapping || !mapping.CancellationPolicy) {
  //     console.error("Mapping is undefined or missing CancellationPolicy");
  //     return;
  //   }

  //   setCancellationPolicyState(mapping.CancellationPolicy);
  //   toggleWizard();
  //   setIsVisible(true);
  // };

  return (
    <>
      <section className="banner-section">
        <div className="banner-image">
          <img src="/images/banner.jpg" alt="banner image" className="banner-img mobile_img" />
          <img src="/images/banner.png" alt="banner image" className="banner-img desktop_img" />
          <div className="banner-search-btn">
            {!isVisible && (
              <a className="banner-search-btn-link" onClick={showBookingEngine} id="booking-engine-btn">
                <Image src="/img/search-icon-white.svg" height={500} width={500} alt="search icon" />
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="booking-form-wrapper toggle-div">
        <div className="container-fluid">
          <div id="booking-bar" className={`booking-bar ${isClassAddedBook ? "fullscreen" : ""}`}>

            <div className="booking-form-container">
                 
              <form className="booking-form">
                <div className="form-group">
                  <label>Arrival Date</label>
                  
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);                  
                       const nextDay = new Date(date);
                        nextDay.setDate(nextDay.getDate() + 1);
                        setNextDate(nextDay);
                    }}
                    className="p-2"
                    minDate={new Date()}
 dateFormat="dd-MM-yyyy"
                  />
                   <FontAwesomeIcon className="calender_show" icon={faCalendar}/>
                </div>
                <div className="form-group">
                  <label>Departure Date</label>
                  <DatePicker
                    selected={nextDate}
                    onChange={(date) => setNextDate(date)}
                    minDate={
                      selectedDate
                        ? new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000)
                        : new Date()
                    }
                    placeholderText="check out date"
                    className="p-2"
                    disabled={!selectedDate}
                dateFormat="dd-MM-yyyy"
                  />
                  <FontAwesomeIcon className="calender_show" icon={faCalendar}/>
                </div>
                <div className="form-group">
                  <label>Adults</label>
                  <select>
                    <option>Adults</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3+</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Children</label>
                  <select>
                    <option>Children</option>
                    <option>0</option>
                    <option>1</option>
                    <option>2+</option>
                  </select>
                </div>
                <button type="submit" className="book-btn">Book Now</button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* <WizardSidebar isVisible={isWizardVisible} onClose={() => setIsWizardVisible(false)} status={status} /> */}
    </>
  );
};

export default FilterBar;