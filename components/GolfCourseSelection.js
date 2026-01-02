"use client";

import React, { useState } from "react";
import Image from "next/image";



const GolfCourseSelection = () => {
    const [set1, usetSet1] = useState(false);

    function handleClick(popuiId) {
        if (set1 === popuiId) {
            usetSet1(false);
        }
        else {
            usetSet1(popuiId);
        }
    }
    return (
        <>
            <div>
                <div className="row">
                    <div className="col-lg-5">
                        <div className="img-box-selection boxx-1" onClick={() => handleClick('popup1')}>
                            <Image src="/images/pattya.png" alt="Golf Course Selection"
                                className="img-fluid" height={400} width={800} />
                            <div className="text-selectionn">
                                <h4>Pattaya Country Club</h4>
                            </div>
                        </div>
                        {set1 === 'popup1' && <div className="overlay" onClick={() => handleClick('popup1')}>
                            <p className="popup" onClick={(e) => e.stopPropagation()}>
                            <button className="close" onClick={() => handleClick('popup1')}>X</button>
                            Pattaya Country Club is set on over 2,000 rai of gently rolling hills and is one of the nearest golf courses to Pattaya. It’s a great choice for players of all skill levels.
                            Some holes at Pattaya Country Club have two fairways, offering both challenging and safer paths to the green. The greens are protected by bunkers and have uneven surfaces.
                            Unlike many Pattaya courses, water only comes into play on the 17th hole, a par 4. The course covers a large area, so some holes are far apart, leading to long walks and more out-of-bounds (OB) areas.
                            The last three holes, known as the{` "amen corner,"`} are the toughest and often lead to unexpected finishes.
                            While the clubhouse is small, the friendly staff and great Thai restaurant make up for it. Overall, Pattaya Country Club offers good value for golfers in the area

                        </p>
                        </div>
                        }
                    </div>

                    <div className="col-lg-7">
                        <div className="row">
                            <div className="col-lg-6 col-6">
                                <div className="img-box-selection" onClick={() => handleClick('popup2')}>
                                    <Image src="/images/bankok.png" alt="Golf Course Selection"
                                        className="img-fluid" height={400} width={800} />
                                    <div className="text-selectionn">
                                        <h4>Bangkok Golf Club</h4>
                                    </div>

                                </div>
                                {set1 === 'popup2' && <div className="overlay" onClick={() => handleClick('popup2')}>
                                    <p className="popup" onClick={(e) => e.stopPropagation()}>
                                    <button className="close" onClick={() => handleClick('popup2')}>X</button>
                                    Bangkok Golf Club is just 35 minutes from downtown and was built in the 1990s. It has hosted several professional tournaments, including the Asian {`Tour's`} Volvo Masters in 2003. After severe flooding in 2011, the course was rebuilt and reopened in 2012 as a more player-friendly layout. Today,{` it's`} well-maintained and managed by a skilled team.
                                    Surrounded by city life, the course offers a peaceful escape behind its high walls. It stretches over 6,800 yards and challenges golfers with narrow fairways, water hazards, and tricky greens.
                                    One of the standout holes is the par-3 11th, featuring an island-style green that demands a confident tee shot. The par-5 9th hole, once ranked among the top 500 holes globally, is another highlight.
                                    The course is known for its fast, undulating greens, and the experienced caddies help read the slopes with ease.
                                    The clubhouse includes Thai massage services, a pro shop, locker rooms, and international dining options. Practice areas and on-site accommodations are also available. Plus, the course is floodlit, making night golf a great option for late starters.

                                </p>
                                </div>
                                }
                            </div>
                            <div className="col-lg-6 col-6">
                                <div className="img-box-selection" onClick={() => handleClick('popup3')}>
                                    <Image src="/images/alpine.png" alt="Golf Course Selection"
                                        className="img-fluid" height={400} width={800} />
                                    <div className="text-selectionn">
                                        <h4>Alpine Golf & Sports Club Bangkok</h4>
                                    </div>
                                </div>
                                {set1 === 'popup3' && <div className="overlay" onClick={() => handleClick('popup3')}>
                                    <p className="popup" onClick={(e) => e.stopPropagation()}>
                                    <button className="close" onClick={() => handleClick('popup3')}>X</button>
                                    Alpine Golf & Sports Club is one of the top golf courses in Thailand and among the best in Asia. Designed by renowned architect Ronald Garl, it hosted the prestigious Johnnie Walker Classic twice, with Tiger Woods winning in 2000.

                                    This private 18-hole course is known for its challenging layout, fast greens, and well-maintained fairways. The land, once flat rice fields, has been transformed into a stunning parkland course with rolling hills, tall trees, and lush vegetation—unusual for Bangkok.

                                    The course features major elevation changes, water hazards, and beach-style bunkers, especially around holes like the par-3 3rd and 12th. Some greens are island-like, making accuracy essential, particularly on holes like the 7th and 11th.

                                    Alpine demands straight drives and smart course management. Most greens slope from back to front, so keeping the ball below the hole helps with scoring. Poorly placed shots can be heavily penalized.

                                    Playing at Alpine is a memorable experience for serious golfers. The clubhouse offers excellent facilities, including locker rooms, a coffee shop, and a fine Chinese restaurant. It’s a must-play course for anyone visiting Bangkok for golf.

                                </p>
                                </div>
                                }
                            </div>
                            <div className="col-lg-12 mt-3">
                                <div className="img-box-selection" onClick={() => handleClick('popup4')}>
                                    <Image src="/images/siam.png" alt="Golf Course Selection"
                                        className="img-fluid" height={400} width={800} />
                                    <div className="text-selectionn">
                                        <h4>Siam Country Club, Bangkok</h4>
                                    </div>
                                </div>
                                {set1 === 'popup4' && <div className="overlay" onClick={() => handleClick('popup4')}>
                                      <div className="popup" onClick={(e) => e.stopPropagation()}>
                                    
                                    <button className="close" onClick={() => handleClick('popup4')}>X</button>
                                    <p>
                                    Just 30 minutes south of Bangkok, Siam Country Club Bangkok is the fifth course in the prestigious Siam Country Club family. Designed by Toby Cobb, this 18-hole championship course stretches 7,250 yards and features Zoysia fairways and ultra-dwarf Bermuda greens.

                                    The layout is a unique mix—a parkland-style course on a links-like site, with wide fairways, rolling slopes, large elevated greens, and native red grass mounding. The semi-rough is kept short, making the course enjoyable for all skill levels.

                                    Water only comes into play on four holes, but the course stands out with small, deep pot bunkers and tricky turtle-back greens. Club selection is key, as daily pin placements can significantly affect your approach shot.

                                    The 18th hole is a short but memorable 100-yard par-3 that faces the clubhouse restaurant. Despite its short length, a shot off target can land you in a deep bunker nicknamed the “big ass” bunker—tough to escape from!

                                    The modern 4,400 sqm clubhouse includes top-notch locker rooms, a pro shop, and a great Japanese restaurant. Caddies are experienced and come from top courses nearby.

                                    The only downside is the lack of a full driving range, though warm-up nets are available. Overall, Siam Country Club Bangkok offers a premium golf experience and is a strong addition to the Siam brand.

                                </p>
                                </div>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
};

export default GolfCourseSelection;
