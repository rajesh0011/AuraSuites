"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./booking.css";
import Image from "next/image";
import BannerSlider from "@/components/BannerSlider";

const SWIFTBOOK_PROPERTY_ID = "303MjQOikQ7KsY8QgSguFzNTM=";
const SWIFTBOOK_SCRIPT_ID = "303MjQOikQ7KsY8QgSguFzNTM=";
const SWIFTBOOK_WIDGET_ID = `quickbook-widget-${SWIFTBOOK_PROPERTY_ID}-${SWIFTBOOK_SCRIPT_ID}`;
const SWIFTBOOK_SCRIPT_SRC = `https://www.swiftbook.io/cwplugin/displaywidget/preview/booking-service.min.js?propertyId=${encodeURIComponent(
  SWIFTBOOK_PROPERTY_ID
)}&scriptId=${encodeURIComponent(SWIFTBOOK_SCRIPT_ID)}`;
const QUICK_BOOK_EVENT = "aura:open-quick-book";

const FilterBar = () => {
  const [isWidgetLoading, setIsWidgetLoading] = useState(true);
  const [isQuickBookActive, setIsQuickBookActive] = useState(false);

  useEffect(() => {
    const widgetRoot = document.getElementById(SWIFTBOOK_WIDGET_ID);

    if (!widgetRoot) return undefined;

    setIsWidgetLoading(true);
    widgetRoot.innerHTML = "";

    const markWidgetReady = () => {
      const hasWidgetControls = widgetRoot.querySelector(
        ".MbsSearchWidget, .searchBlock, .searchBtn, form, button"
      );

      if (hasWidgetControls) {
        setIsWidgetLoading(false);
      }
    };

    const observer = new MutationObserver(markWidgetReady);
    observer.observe(widgetRoot, { childList: true, subtree: true });

    document
      .querySelectorAll(`script[data-swiftbook-widget="${SWIFTBOOK_WIDGET_ID}"]`)
      .forEach((script) => script.remove());

    const script = document.createElement("script");
    script.src = SWIFTBOOK_SCRIPT_SRC;
    script.id = "propInfo";
    script.async = true;
    script.dataset.swiftbookWidget = SWIFTBOOK_WIDGET_ID;

    document.body.appendChild(script);
    script.addEventListener("load", markWidgetReady);

    return () => {
      observer.disconnect();
      script.removeEventListener("load", markWidgetReady);
      script.remove();
      widgetRoot.innerHTML = "";
    };
  }, []);

  useEffect(() => {
    let focusTimer;

    const activateQuickBook = () => {
      const section = document.getElementById("quick-book");
      const widgetRoot = document.getElementById(SWIFTBOOK_WIDGET_ID);

      setIsQuickBookActive((isActive) => {
        const nextIsActive = !isActive;

        window.clearTimeout(focusTimer);

        if (nextIsActive) {
          section?.scrollIntoView({ behavior: "smooth", block: "center" });

          focusTimer = window.setTimeout(() => {
            const firstControl = widgetRoot?.querySelector(
              "button, input, select, [tabindex]:not([tabindex='-1'])"
            );

            firstControl?.focus?.({ preventScroll: true });
          }, 650);
        }

        return nextIsActive;
      });
    };

    window.addEventListener(QUICK_BOOK_EVENT, activateQuickBook);

    if (window.location.hash === "#quick-book") {
      window.setTimeout(activateQuickBook, 500);
    }

    return () => {
      window.removeEventListener(QUICK_BOOK_EVENT, activateQuickBook);
      window.clearTimeout(focusTimer);
    };
  }, []);

  return (
    <>
      {/* <section className="banner-section">
        <div className="banner-image">
          <Image height={700} width={600} quality={100} src="/images/banner-mob.webp" alt="Aura Suites banner image" title="Aura Suites banner image" className="banner-img mobile_img" />
          <Image height={700} width={1200} quality={100} src="/images/banner.webp" alt="Aura Suites banner image" title="Aura Suites banner image" className="banner-img desktop_img" />
        </div>
      </section> */}
      <BannerSlider/>
      <section
        id="quick-book"
        className={`booking-form-wrapper toggle-div quickbook-booking-wrapper ${
          isQuickBookActive ? "is-active" : ""
        }`}
      >
        <div className="container-fluid">
          <div id="booking-bar" className="booking-bar">
            <div className="booking-form-container">
              <div
                className={`quickbook-widget-shell ${
                  isWidgetLoading ? "is-loading" : "is-ready"
                }`}
              >
                {isWidgetLoading && (
                  <div className="quickbook-loading-strip" aria-hidden="true">
                    <div className="quickbook-loading-field">
                      <span className="quickbook-loading-label" />
                      <span className="quickbook-loading-box" />
                    </div>
                    <div className="quickbook-loading-field">
                      <span className="quickbook-loading-label" />
                      <span className="quickbook-loading-box" />
                    </div>
                    <div className="quickbook-loading-field small">
                      <span className="quickbook-loading-label" />
                      <span className="quickbook-loading-box" />
                    </div>
                    <div className="quickbook-loading-field small">
                      <span className="quickbook-loading-label" />
                      <span className="quickbook-loading-box" />
                    </div>
                    <div className="quickbook-loading-button" />
                  </div>
                )}
                <div
                  id={SWIFTBOOK_WIDGET_ID}
                  className="Configure-quickBook-Widget"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FilterBar;
