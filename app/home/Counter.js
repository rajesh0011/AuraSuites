//import React, { useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import './counter.css';

const StatsCounter = () => {
  // State to track if the counters have started
  //const [hasAnimated, setHasAnimated] = useState(false);
const hasAnimated = true;
  // Intersection observer hook
  const { ref, inView } = useInView({
    triggerOnce: true, // Ensures the animation triggers only once
    threshold: 0.3, // Triggers when 30% of the section is visible
  });

  // Trigger animation when section becomes visible
  if (inView && !hasAnimated) {
    //setHasAnimated(true);
  }

  return (
<>
{/* <section className="counter-section sec-padding" ref={ref}>
  <div className="container">
    <div className="global-heading-sec">
      <h2
        className="global-heading text-center text-white"
        data-aos="fade-left"
        data-aos-duration={2500}
      > INDIAS FASTEST GROWING CHAIN
      </h2>
    </div>
    <div className="row justify-content-center">
      <div className="col-md-4 counter-box">
        <div className="counter-label">COUNTRIES</div>
        <div className="counter-number">
        
        {hasAnimated ? <CountUp start={0} end={3} duration={2} /> : 0}
        </div>
      </div>
      <div className="col-md-4 counter-box">
        <div className="counter-label">DESTINATIONS</div>
        <div className="counter-number">

        {hasAnimated ? <CountUp start={0} end={110} duration={5} suffix="+" /> : 0}
        </div>
      </div>
      <div className="col-md-4 counter-box">
        <div className="counter-label">HOTELS</div>
        <div className="counter-number" >
        {hasAnimated ? <CountUp start={0} end={133} duration={5} suffix="+" /> : 0}
        </div>
      </div>
    </div>
  </div>
</section> */}

</>

  );
};

export default StatsCounter;
