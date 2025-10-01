"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignRight,
  faArrowRight,
  faFileEdit,
  faHouse,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";
import * as ReactDOM from "react-dom";
import Image from "next/image";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useBookingEngineContext } from "../../context/BookingEngineContext"; // Adjust the import path

import "flatpickr/dist/themes/material_green.css";
import "bootstrap/dist/css/bootstrap.min.css";

const CartOverview = ({ goNext, onClose }) => {
  const {
    selectedPropertyPhone,
    selectedPropertyName,
    currentStep,
    selectedPropertyId,
    selectedStartDate,
    selectedEndDate,
    totalPrice,
    setTotalPrice,
    selectedRoom,
    setSelectedRoom,
    selectedRooms,
    selectedRoomRate,
    getRoomNameById,
    setSelectedRoomDetails,
    cancellationPolicyState,
    selectedAddOns,
    setAddOns,
    addonAmountTotal,
    setAddonAmountTotal,
    addonList,
    setAddonList,
    selectedAddonList,
    selectedSetAddonList,
    isRoomsChange,
    selectedTaxList,
    setSelectedTaxList,
    rateResponse,
    setRateResponse,
    addOnsresponse,
    setAddOnsResponse,
    roomTaxes,
    setRoomTaxes,
    setAddonTaxTotal,
    addonTaxTotal,
  } = useBookingEngineContext();

  const [totalAddOns, setTotalAddOns] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const dummyImage = "/no_image.jpg";
  const totalAdults = selectedRooms.reduce((sum, room) => sum + room.adults, 0);
  const totalChildren = selectedRooms.reduce(
    (sum, room) => sum + room.children,
    0
  );
  const totalRooms = selectedRooms.length;
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isPropertyVisible, setIsPropertyVisible] = useState(false);
  const [isRoomsVisible, setIsRoomsVisible] = useState(false);
  const [isRoomsClose, setIsRoomsClose] = useState(false);
  const [amountToatal, setAmountTotal] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [taxList, setTaxList] = useState(null);
  const [isInventoryAvailable, setInventoryAvailable] = useState(true);
  const [activeRoomIndex, setActiveRoomIndex] = useState(selectedRoom[0]?.id ? selectedRoom[0]?.id : 0);
  const [filters, setFilters] = useState({
    offer: "",
    query: "",
    dateRange: { start: "", end: "", totalPrice: 0 },
    guests: { adults: 1, children: 0, rooms: 1 },
  });
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toISOString().split("T")[0];
  };
  const fromDate = formatDate(selectedStartDate);
  const toDate = formatDate(selectedEndDate);

  const calculateNumberOfDays = () => {
    if (!selectedStartDate || !selectedEndDate) return 1;
    const start = new Date(selectedStartDate);
    const end = new Date(selectedEndDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const numberOfDays = calculateNumberOfDays();
  const calculateBasePrice = () => {

    // Sum all selectedRoom's roomRate
    const totalRoomRate = selectedRoom?.reduce(
      (sum, room) => sum + (parseFloat(room?.packageRate) || 0),
      0
    );

    return totalRoomRate * numberOfDays;
  };

  const calculateTotalWithTax = () => {
    const basePrice = calculateBasePrice();
    return basePrice + totalTax;
  };

  const basePrice = calculateBasePrice();
  const finalAmount = calculateTotalWithTax();


  const fetchRateApi = async () => {
    const dayRate = rateResponse?.Product?.[0]?.Rooms?.flatMap((room) => {
      const selectedRooms = selectedRoom.filter(sel => sel.roomId === room?.RoomId);

      return selectedRooms.map((selected) => {
        const matchedRatePlan = room?.RatePlans?.find(
          (ratePlan) => ratePlan?.RateId === selected?.rateId
        );

        const firstRateObj = matchedRatePlan
          ? Object.values(matchedRatePlan?.Rates || {})[0]
          : null;

        // Update packageRate for selectedRoom
        setSelectedRoom((prev) =>
          prev.map((rm) =>
            rm?.rateId === selected?.rateId && rm?.roomId === selected?.roomId
              ? {
                ...rm,
                packageRate: firstRateObj?.OBP?.[rm.adults.toString()]?.RateBeforeTax,
                roomRateWithTax: firstRateObj?.OBP?.[rm.adults.toString()]?.RateAfterTax,
                childRate: parseFloat(firstRateObj?.ExtraChildRate?.RateAfterTax) || 0.0,
                roomAdultExtraCharge: (parseInt(firstRateObj?.OBP?.[rm.adults.toString()]?.RateAfterTax)
                  - parseInt(firstRateObj?.OBP?.["1"]?.RateAfterTax
                  )),
              }
              : rm
          )
        );

        const extraChildren =
          selected.children > selected?.applicableChild
            ? (selected?.children - selected?.applicableChild) : 0;

        const extraChildTaxes = Array.from({ length: extraChildren }, () =>
          extraChildren >= 1
            ? firstRateObj?.ExtraChildRate?.Tax || []
            : []
        ).flat();

        const taxArray = [
          ...(firstRateObj?.OBP?.[selected.adults.toString()]?.Tax || []),
          ...extraChildTaxes
        ];


        const taxObject = {};
        taxArray.forEach((t) => {
          if (t?.Name && t?.Amount != null) {
            const amount = parseFloat(t.Amount);
            taxObject[t.Name] = (taxObject[t.Name] || 0) + amount;
          }
        });

        if (firstRateObj && selected) {
          if (
            extraChildren > 0
          ) {
            taxObject["ExtraChildRate"] = parseFloat(
              (firstRateObj?.ExtraChildRate?.RateBeforeTax || 0.0)
              * extraChildren
            );
          }

          if (selected?.adults > selected?.maxAdult && parseFloat(firstRateObj?.ExtraAdultRate?.RateAfterTax) > 1.00) {
            // taxObject["ExtraAdultRate"] = parseFloat(
            //   selected?.roomRateWithTax || 0.0
            // );

            taxObject["ExtraAdultRate"] = parseFloat(
              firstRateObj?.ExtraAdultRate?.RateBeforeTax || 0.0
            );
          }
        }

        return {
          RoomId: selected?.roomId,
          RateId: selected?.rateId,
          MinInventory: room?.MinInventory,
          RateAfterTax: parseInt(firstRateObj?.OBP?.["1"]?.RateAfterTax || "0"),
          ...taxObject,
        };
      });
    });

    return dayRate;
  }
  useEffect(() => {
    setAmountTotal(totalPrice + addonAmountTotal);
  }, [addonAmountTotal, totalPrice, selectedRoom]);

  useEffect(() => {
    const fetchPrices = async () => {
      if (!selectedPropertyId && currentStep !== 2) return;
      try {
        const dayRate = rateResponse?.Product[0]?.Rooms?.map(room => ({
          RoomId: room?.RoomId,
          MinInventory: room?.MinInventory,
          RateAfterTax: Object.values(room?.RatePlans?.[0]?.Rates || {})[0]?.OBP?.["1"]?.RateBeforeTax || null
        }));

        if (selectedRoom) {
          const updatedRooms = selectedRoom.map(sel => {
            const match = dayRate.find(rate => rate.RoomId == sel.roomId);
            return {
              ...sel,
              roomRate: match?.RateAfterTax ? parseFloat(match.RateAfterTax) : sel.roomRate
            };
          });

          setSelectedRoom(updatedRooms);
        }
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };

    fetchPrices();
    let selectedAdons = [];
    Object.entries(selectedAddOns || {}).forEach(([roomId, addons]) => {
      Object.entries(addons || {}).forEach(([addonId, count]) => {
        const matchingAddons = addonList?.filter(
          (addon) => String(addon.AddonId) === String(addonId)
        );
        if (matchingAddons?.length) {
          const addonWithRoomId = {
            ...matchingAddons[0],
            roomId,
            quantity: count,
          };
          selectedAdons.push(addonWithRoomId);
        }
      });
    });
    const totalAddOnPrice = selectedAdons.reduce((sum, addon) => {
      const price =
        addon?.Rate?.[0]?.INR?.amountAfterTax ||
        addon?.AdultRate?.[0]?.INR?.amountAfterTax ||
        0;
      return sum + parseFloat(price) * addon.quantity;
    }, 0);

    setTotalAddOns(addonAmountTotal);
    selectedSetAddonList(selectedAdons || []);
    setLoading(true);
  }, [amountToatal]);

  useEffect(() => {
    if (finalAmount !== null && !isNaN(finalAmount)) {
      const fetchPrices = async () => {
        if (!selectedPropertyId && currentStep !== 2) return;

        try {
          const response = await fetchRateApi();

          if (selectedRoom?.length > 0) {
            const updatedRooms = selectedRoom.map((sel) => {
              const matchedRate = response.find(
                (rate) => rate?.RateId === sel?.rateId && rate?.RoomId === sel?.roomId
              );
              return matchedRate ? { ...matchedRate, Id: sel?.id } : null;
            });

            const allTaxKeys = new Set();
            let hasZeroInventory = false;

            updatedRooms?.forEach((room) => {
              if (!room) return;

              if (room?.MinInventory === 0) {
                hasZeroInventory = true;
                return;
              }

              Object.keys(room).forEach((key) => {
                if (
                  !["roomId", "RateId", "MinInventory", "RateAfterTax", "Id"].includes(key) &&
                  typeof room[key] === "number"
                ) {
                  allTaxKeys.add(key);
                }
              });
            });

            if (hasZeroInventory) {
              setInventoryAvailable(false);
            } else {
              setInventoryAvailable(true);
            }

            setRoomTaxes(updatedRooms);
            const taxList = {};
            allTaxKeys.forEach((key) => {
              taxList[key] = updatedRooms
                .filter((room) => room !== undefined && room !== null)
                .reduce(
                  (acc, room) => acc + (room[key] * numberOfDays || 0),
                  0
                );
            });

            setTaxList(taxList);
            setSelectedTaxList(taxList);

            const totalTax = Object.values(taxList).reduce(
              (acc, taxVal) => acc + taxVal,
              0
            );
            setTotalTax(totalTax);
          }
        } catch (error) {
          console.error("Error fetching prices:", error);
        }
      };

      fetchPrices();
      setTotalPrice(finalAmount);
    }
  }, [finalAmount, isRoomsChange, currentStep, selectedStartDate, selectedEndDate]);

  const taxRate = basePrice >= 7000 ? "18%" : "12%";

  const openCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };
  const openPropertyPage = (id) => {
    setSelectedRoomDetails({ isPropertyVisible: false, id: id });
    setSelectedRoomId(id);
    setIsPropertyVisible(true);
  };
  const handleDateChange = (startDate, endDate, totalPrice) => {
    setFilters({
      ...filters,
      dateRange: { start: startDate, end: endDate, totalPrice },
    });
  };
  const openRoomPage = () => {
    setIsRoomsClose(true);
    setIsRoomsVisible(!isRoomsVisible);
  };

  const closeRoomChange = () => {
    setIsRoomsClose(false);
    setIsRoomsVisible(false);
  };
  const handleRoomChange = (adults, children, roomCount) => {
    setFilters((prev) => ({
      ...prev,
      guests: { adults, children, rooms: roomCount },
    }));
  };

  const handleAdd = (addon, addonId, price) => {
    setAddOns((prev) => {
      const roomAddOns = { ...(prev[activeRoomIndex] || {}) };
      roomAddOns[addonId] = (roomAddOns[addonId] || 0) + 1;

      return {
        ...prev,
        [activeRoomIndex]: roomAddOns,
      };
    });

    setAddonAmountTotal(addonAmountTotal + parseInt(price));
    setAmountTotal(totalPrice + parseInt(price));
  };

  const handleIncrement = (addonId, price, addon, tax) => {
    const roomAddOns = selectedAddOns[activeRoomIndex] || {};
    const isTypeR = addonList.find(a => a.AddonId === addonId)?.Type === "R";
    const maxQty = isTypeR ? 1 : 20;

    if ((roomAddOns[addonId] || 0) < maxQty) {

      setAddOns((prev) => {
        const updatedRoomAddOns = { ...(prev[activeRoomIndex] || {}) };
        updatedRoomAddOns[addonId] = (updatedRoomAddOns[addonId] || 0) + 1;

        return {
          ...prev,
          [activeRoomIndex]: updatedRoomAddOns,
        };
      });

      const rateObj = addon?.ChildRate?.[0]?.INR;
      const adlt = selectedRoom?.find(element => element.id == activeRoomIndex)?.adults ?? 0;
      const chld = selectedRoom?.find(element => element.id == activeRoomIndex)?.children ?? 0;
      const adultPrice = parseInt(price) * adlt;
      const childPrice = parseInt(rateObj?.amountAfterTax) * chld;
      const adultTax = parseInt(tax) * adlt;
      const childTax = parseInt(rateObj?.tax) * chld;


      if (addon?.Type == "O") {
        if (addon?.Applicable == "G") {
          setAddonAmountTotal(addonAmountTotal + ((adultPrice + childPrice)));
          setAddonTaxTotal(addonTaxTotal + ((adultTax + childTax)));
          setAmountTotal(totalPrice + ((adultPrice + childPrice)));
        }
        if (addon?.Applicable == "D" || addon?.Applicable == "Q") {
          setAddonAmountTotal(addonAmountTotal + parseInt(price));
          setAddonTaxTotal(addonTaxTotal + parseInt(tax));
          setAmountTotal(totalPrice + parseInt(price));
        }
      }
      // setAddonAmountTotal(addonAmountTotal + parseInt(price));
      // setAmountTotal(totalPrice + parseInt(price));
    }
  };

  const handleDecrement = (addonId, price, addon, tax) => {
    const roomAddOns = selectedAddOns[activeRoomIndex] || {};
    const newQty = (roomAddOns[addonId] || 0) - 1;

    setAddOns((prev) => {
      const updatedRoomAddOns = { ...roomAddOns };
      if (newQty <= 0) {
        delete updatedRoomAddOns[addonId];
      } else {
        updatedRoomAddOns[addonId] = newQty;
      }
      return {
        ...prev,
        [activeRoomIndex]: updatedRoomAddOns,
      };
    });

    const rateObj = addon?.ChildRate?.[0]?.INR;
    const adlt = selectedRoom?.find(element => element.id == activeRoomIndex)?.adults ?? 0;
    const chld = selectedRoom?.find(element => element.id == activeRoomIndex)?.children ?? 0;
    const adultPrice = parseInt(price) * adlt;
    const childPrice = parseInt(rateObj?.amountAfterTax) * chld;
    const adultTax = parseInt(tax) * adlt;
    const childTax = parseInt(rateObj?.tax) * chld;

    if (addon?.Type == "R") {
      if (addon?.Applicable == "G") {
        setAddonAmountTotal(addonAmountTotal - ((adultPrice + childPrice) * numberOfDays));
        setAddonTaxTotal(addonTaxTotal - ((adultTax + childTax) * numberOfDays));
        setAmountTotal(totalPrice - ((adultPrice + childPrice) * numberOfDays));
      }
      if (addon?.Applicable == "D" || addon?.Applicable == "Q") {
        setAddonAmountTotal(addonAmountTotal - (parseInt(price) * numberOfDays));
        setAddonTaxTotal(addonTaxTotal - (parseInt(tax) * numberOfDays));
        setAmountTotal(totalPrice - (parseInt(price) * numberOfDays));
      }
    }
    else if (addon?.Type == "O") {
      if (addon?.Applicable == "G") {
        setAddonAmountTotal(addonAmountTotal - ((adultPrice + childPrice)));
        setAddonTaxTotal(addonTaxTotal - (adultTax + childTax));
        setAmountTotal(totalPrice - ((adultPrice + childPrice)));
      }
      if (addon?.Applicable == "D" || addon?.Applicable == "Q") {
        setAddonAmountTotal(addonAmountTotal - parseInt(price));
        setAddonTaxTotal(addonTaxTotal - parseInt(tax));
        setAmountTotal(totalPrice - parseInt(price));
      }
    }
  };

  const getNZDPrice = (addon) => {
    const extractRate = (rateArray) => {
      if (!rateArray || rateArray.length === 0) return null;
      //const nzdRate = rateArray.find((r) => r.NZD)?.NZD;
      const nzdRate = rateArray.find((r) => r.INR)?.INR;
      return nzdRate ? `${nzdRate.amountAfterTax}` : "0";
    };

    return (
      extractRate(addon.Rate) ||
      extractRate(addon.AdultRate) ||
      extractRate(addon.ChildRate) ||
      "0"
    );
  };

  const getAddonUnitPrice = (addon) => {
    const extractRate = (rateArray) => {
      if (!rateArray || rateArray.length === 0) return null;
      //const nzdRate = rateArray.find((r) => r.NZD)?.NZD;
      const nzdRate = rateArray.find((r) => r.INR)?.INR;
      return nzdRate ? `${nzdRate.tax}` : "0";
    };

    return (
      extractRate(addon.Rate) ||
      extractRate(addon.AdultRate) ||
      extractRate(addon.ChildRate) ||
      "0"
    );
  };
  return (
    <div className="stay-info">
      <div className="wizard-step-global-padding">

        <h4>YOUR CART OVERVIEW</h4>
        <div className="accordion p-2" id="room-details">
          <h5 className="mb-2"> Rooms</h5>

          {selectedRoom?.length > 0
            ? selectedRoom.map((room, index) => (
              <div className="accordion-item" key={room?.id || index}>
                <div className="m-2">
                  {room?.roomId && room?.roomName ? (
                    <Image
                      src={room?.roomImage && room?.roomImage?.trim() !== "" ? room?.roomImage : dummyImage}
                      className="img-fluid room-image rounded-3"
                      alt="Room Image"
                      height={80}
                      width={100}
                      onError={(e) => (e.target.src = dummyImage)}
                    />
                  ) : (
                    // Grey placeholder when no image is available
                    <div>
                      <div
                        className="room-placeholder rounded-3"
                        style={{
                          width: "auto",
                          height: "80px",
                          backgroundColor: "#ccc",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          margin: "5px",
                        }}
                        onClick={() => {
                          openPropertyPage(room?.id);
                          onClose();
                        }}
                      >
                        Select Room
                      </div>
                    </div>
                  )}
                </div>

                {room?.roomId && room?.roomName ? (
                  <div className="row p-2">
                    <div className="col-8">
                      <h6 className="h6">{room.roomName}</h6>
                    </div>
                    <div className="col-md-12">
                      {/* <h6>Best Available Rate - Room Only ₹{room?.roomRate}</h6> */}
                      <h6>
                        {/* {room?.roomPackage} - ₹{room?.packageRate} */}
                        {room?.roomPackage} - ₹{isFinite(room?.packageRate) ? parseInt(room?.packageRate) : 0}
                      </h6>
                    </div>
                  </div>
                ) : null}
              </div>
            ))
            : null}

          <div className="accordion-item py-2">
            <h6>
              Stay Dates
              <div className="room-flex">
                <p>
                  {formatDate(selectedStartDate)}{" "}
                  <FontAwesomeIcon icon={faArrowRight} />{" "}
                  {formatDate(selectedEndDate)}
                </p>
              </div>
            </h6>
          </div>
          <div className="accordion-item py-2">
            <h6>Guests and Rooms</h6>
            <div className="room-flex">
              <p>{`${totalAdults} Adults, ${totalChildren} Children, ${totalRooms} Rooms`}</p>
            </div>
          </div>
        </div>
        {selectedAddOns &&
          Object.values(selectedAddOns).some(roomAddOns =>
            Object.values(roomAddOns).some(qty => qty > 0)
          ) && (<div className="cancellation-policy">
            <h5>Add-Ons</h5>

            {/* TABS for rooms */}
            <div style={{ marginTop: "10px", marginBottom: "15px" }}>
              <ul
                style={{
                  display: "flex",
                  listStyle: "none",
                  paddingLeft: 0,
                  gap: "10px",
                }}
              >
                {selectedRoom.map((room, index) => (
                  <li
                    key={index}
                    onClick={() => setActiveRoomIndex(room.id)}
                    style={{
                      cursor: "pointer",
                      padding: "8px 16px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      background:
                        activeRoomIndex === room.id ? "#007bff" : "#f0f0f0",
                      color: activeRoomIndex === room.id ? "#fff" : "#000",
                      fontWeight: "bold",
                    }}
                  >
                    Room {index + 1}
                  </li>
                ))}
              </ul>
            </div>

            {/* ADD-ONS FOR SELECTED ROOM ONLY */}
            <div className="row">
              {addonList && addonList.length > 0 ? (
                addonList
                  .filter(
                    (addon) =>
                      selectedAddOns?.[activeRoomIndex]?.[addon.AddonId] > 0
                  )
                  .map((addon) => {
                    const quantity =
                      selectedAddOns?.[activeRoomIndex]?.[addon.AddonId] || 0;
                    const isTypeR = addon.Type === "R";
                    const maxQty = isTypeR ? 1 : 20;

                    return (
                      <div
                        className="col-6 py-3"
                        key={`${activeRoomIndex}_${addon.AddonId}`}
                        style={{
                          borderRadius: "8px",
                          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                          textAlign: "center",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          src={addon.Image || dummyImage}
                          alt={addon?.AddonName || "Addon Image"}
                          height={100}
                          width={120}
                          style={{ borderRadius: "5px", objectFit: "cover" }}
                        />
                        <div style={{ textAlign: "center", marginTop: "8px" }}>
                          <p style={{ fontWeight: "bold", margin: 0 }}>
                            {addon?.AddonName}
                          </p>
                          <p style={{ fontWeight: "bold", margin: 0 }}>
                            ₹{getNZDPrice(addon)}
                          </p>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: "10px",
                            border: "1px solid #000",
                            borderRadius: "5px",
                            background: "#000",
                            color: "#fff",
                            padding: "2px 10px",
                          }}
                        >
                          <button
                            onClick={() =>
                              handleDecrement(
                                addon.AddonId,
                                getNZDPrice(addon), addon, getAddonUnitPrice(addon)
                              )
                            }
                            style={{
                              border: "none",
                              background: "transparent",
                              color: "#fff",
                              fontSize: "18px",
                              cursor: "pointer",
                            }}
                          >
                            −
                          </button>
                          <span
                            style={{
                              margin: "0 10px",
                              color: "#fff",
                              fontSize: "16px",
                            }}
                          >
                            {quantity}
                          </span>
                          <button
                            onClick={() => {
                              if (quantity < maxQty) {
                                handleIncrement(
                                  addon.AddonId,
                                  getNZDPrice(addon), addon, getAddonUnitPrice(addon)
                                );
                              }
                            }}
                            disabled={quantity >= maxQty}
                            style={{
                              border: "none",
                              background: "transparent",
                              color: "#fff",
                              fontSize: "18px",
                              cursor: quantity >= maxQty ? "not-allowed" : "pointer",
                              opacity: quantity >= maxQty ? 0.5 : 1,
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <p>No selected add-ons for this room</p>
              )}
            </div>
          </div>)}
        <div className="cancellation-policy">
          <div className="room-flex">
            <p>Total Amount Payable </p>
            <p>
              <strong>₹{amountToatal}</strong>
            </p>
          </div>
          <p className="m-0 inclusive">*Inclusive of Taxes</p>
          <div className="accordion-body">
            <button
              type="button"
              className="btn btn-link p-0"
              data-bs-toggle="modal"
              data-bs-target="#rateDetailsModal-b"
            >
              Rate Details
            </button>
          </div>
        </div>
        <div className="cancellation-policy">
          <p>
            <strong>Cancellation Policy</strong>
          </p>
          <span>
            {cancellationPolicyState}
          </span>
        </div>
      </div>
      <div className="book-a-stay wizard-bottom-fixed">
        <button
          onClick={() => {
            goNext();
            setTotalPrice(amountToatal);
          }}
          className="btn btn-primary w-100"
        >
          Proceed to Details
        </button>
      </div>

      {ReactDOM.createPortal(
        <div
          className="modal fade"
          id="rateDetailsModal-b"
          tabIndex="-1"
          aria-labelledby="rateDetailsModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="rateDetailsModalLabel">
                  Rate Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  {" "}
                  CLOSE{" "}
                  <Image
                    src="./images/white_close_icon.svg"
                    alt="close icon"
                    width={25}
                    height={25}
                  />
                </button>
              </div>
              <div className="modal-body">
                <div className="popup-box-contentrj1">
                  <div className="popup-amenity-items">
                    {selectedRoom && (
                      <div>
                        <h6 className="py-2">{selectedRoom.roomName}</h6>
                        <h6>{selectedRoom.RoomDescription}</h6>
                        <p>
                          <strong>Base Price:</strong> ₹ {basePrice}
                        </p>
                        {taxList &&
                          Object.entries(taxList).map(([taxName, taxValue]) => (
                            parseFloat(taxValue) > 0.0 ? <p key={taxName}>
                              <strong>{taxName}:</strong> ₹ {taxValue}
                            </p>
                              : null
                          ))}
                        {totalAddOns ? (<p>
                          <strong>Add-Ons Price:</strong> ₹ {totalAddOns.toFixed(2)}
                        </p>) : ""}
                        <p>
                          <strong>Total Price:</strong> ₹{" "}
                          {finalAmount + parseFloat(totalAddOns.toFixed(2))}
                        </p>
                        <p>
                          <strong>Check-in:</strong>{" "}
                          {formatDate(selectedStartDate)}
                        </p>
                        <p>
                          <strong>Check-out:</strong>{" "}
                          {formatDate(selectedEndDate)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-3">
                  <h6>Cancellation Policy</h6>
                  <p>{cancellationPolicyState}</p>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
export default CartOverview;
