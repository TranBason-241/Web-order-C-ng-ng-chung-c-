import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import { banner } from "../constants/Variable";
import { AppContext } from "../context/AppProvider";

const HomePage = ({ productItems, shopItems }) => {
    const { userInfo, setIsHeaderHome, setVisiblePopupInfo, mobileMode, setMode, setisCartMain1, setisCartMain2, setisCartMain3, Cart1, Cart2, Cart3, setisLoadigFromHome } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true);
    let history = useHistory();
    useEffect(() => {
        setisLoadigFromHome(false);
        setIsLoading(true);
        setIsHeaderHome(true);
        setisCartMain1(false);
        setisCartMain2(false);
        setisCartMain3(false);
        setTimeout(() => {
            setIsLoading(false);
        }, 200);
        return () => {
            setIsHeaderHome(false);
            if (Cart1?.length > 0) {
                setisCartMain1(true);
            }
            if (Cart2?.length > 0) {
                setisCartMain2(true);
            }
            if (Cart3?.length > 0) {
                setisCartMain3(true);
            }
        };
    }, [Cart1, Cart2, Cart3, setIsHeaderHome, setisCartMain1, setisCartMain2, setisCartMain3]);

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: mobileMode ? 1 : 2,
        slidesToScroll: 1,
        autoplay: false,

        appendDots: (dots) => {
            return <ul style={{ margin: "0px" }}>{dots}</ul>;
        },
    };

    return (
        <>
            <div className={`loading-spin ${!isLoading && "loading-spin-done"}`}></div>
            <div className="container" style={{ background: "var(--primary)" }}>
                <section className="background container back-white home-menu" style={{ padding: "30px 15px 50px 15px" }}>
                    <div className="f_flex" style={{ gap: 15, width: "100%", flexWrap: "wrap" }}>
                        <div
                            style={{}}
                            className="home-menu-item"
                            onClick={() => {
                                setMode("1");
                                if (userInfo.building && userInfo.fullName && userInfo.phone) {
                                    setVisiblePopupInfo(false);
                                    history.push(`/mode/${1}`, { home: true });
                                    setisLoadigFromHome(true);
                                } else {
                                    setVisiblePopupInfo(true);
                                }
                            }}
                        >
                            <div className="home-menu-item-icon">
                                <img src="./images/icons/hamburger.png" alt="" />
                            </div>
                            <span>Gọi đồ ăn</span>
                        </div>
                        <div
                            style={{}}
                            className="home-menu-item"
                            onClick={() => {
                                setMode("2");

                                if (userInfo.building && userInfo.fullName && userInfo.phone) {
                                    setVisiblePopupInfo(false);
                                    history.push(`/mode/${2}`, { home: true });
                                    setisLoadigFromHome(true);
                                } else {
                                    setVisiblePopupInfo(true);
                                }
                            }}
                        >
                            <div className="home-menu-item-icon">
                                <img src="./images/icons/groceries.png" alt="" />
                            </div>
                            <span>Giao hàng</span>
                        </div>
                        <div
                            style={{}}
                            className="home-menu-item"
                            onClick={() => {
                                setMode("3");
                                if (userInfo.building && userInfo.fullName && userInfo.phone) {
                                    setVisiblePopupInfo(false);
                                    history.push(`/mode/${3}`, { home: true });
                                    setisLoadigFromHome(true);
                                } else {
                                    setVisiblePopupInfo(true);
                                }
                            }}
                        >
                            <div className="home-menu-item-icon">
                                <img src="./images/icons/food-delivery.png" alt="" />
                            </div>
                            <span>Đặt Hàng</span>
                        </div>
                    </div>
                    <section className="TopCate  " style={{ width: "100%" }}>
                        <div className="container" style={{ padding: 0 }}>
                            <Slider {...settings}>
                                {banner.map((value, index) => {
                                    return (
                                        <>
                                            <div
                                                className=""
                                                key={index}
                                                style={{
                                                    padding: mobileMode ? "30px 0" : "30px 5px 0 5px",
                                                    background: "none",
                                                    boxShadow: "none",
                                                    margin: 0,
                                                    borderRadius: "0.5rem",
                                                    transition: "1s all",
                                                    WebkitTransition: "1s all",
                                                }}
                                            >
                                                <div className="slide-img" style={{ borderRadius: 5, height: 200 }}>
                                                    <img src={value.cover} alt="" style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: "0.5rem" }} />
                                                </div>
                                            </div>
                                        </>
                                    );
                                })}
                            </Slider>
                        </div>
                    </section>
                </section>
            </div>
        </>
    );
};

export default HomePage;
