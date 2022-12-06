import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getListSearchByKey } from "../apis/apiService";
import Loading from "../common/Loading/Loading";
import ShopList from "../components/shop/ShopList";
import { AppContext } from "../context/AppProvider";

export const SearchPage = () => {
    const { setHeaderInfo, keySearch, mobileMode, isSearchSubmit, setIsSearchSubmit, menuIdProvider, mode } = useContext(AppContext);
    const [isLoadingCircle, setIsLoadingCircle] = useState(false);
    const [listAll, setListAll] = useState(null);
    const [listSearch, setListSearch] = useState(null);
    const [tabActive, setTabActive] = useState(0);
    let history = useHistory();
    let location = useLocation();

    useEffect(() => {
        let modeId = location.pathname.trim().split("/")[2];
        if (menuIdProvider === "0") {
            history.push(`/mode/${modeId}`);
        }

        setHeaderInfo({ isSearchHeader: true, title: "" });
        return () => {
            setHeaderInfo({});
        };
    }, [setHeaderInfo]);

    useEffect(() => {
        if (isSearchSubmit || keySearch !== "") {
            setIsLoadingCircle(true);
            getListSearchByKey(keySearch, menuIdProvider, 1, 100)
                .then((res) => {
                    if (res.data) {
                        const data = res.data;
                        setListAll(data);

                        setListSearch(tabActive === 0 ? data.store : data.product);
                        setIsLoadingCircle(false);
                        setIsSearchSubmit(false);
                    } else {
                        setIsLoadingCircle(false);
                        setIsSearchSubmit(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setListAll([]);
                    setListSearch([]);
                    setIsLoadingCircle(false);
                    setIsSearchSubmit(false);
                });
        }
        return () => {};
    }, [isSearchSubmit, menuIdProvider, mode, setIsSearchSubmit]);

    return (
        <div>
            <Loading isLoading={isLoadingCircle} />
            <div className={`loading-spin ${!isLoadingCircle && "loading-spin-done"}`}></div>

            {listAll !== null && (
                <>
                    <div style={{ background: "rgb(246, 249, 252)", width: "100%", paddingTop: mobileMode ? 115 : 130, paddingBottom: 15, paddingLeft: 15, display: "flex", gap: 15 }}>
                        <div
                            style={{
                                background: "#fff",
                                borderRadius: "10px",
                                border: "1px solid rgb(204, 204, 204)",
                                width: mobileMode ? 120 : 130,
                                height: 40,
                                color: "rgb(128, 128, 128)",
                                fontSize: mobileMode ? 14 : 16,
                            }}
                            className={`center_flex cusor ${tabActive === 0 ? "active-search" : ""}`}
                            onClick={() => {
                                setTabActive(0);
                                setListSearch(listAll.store);
                            }}
                        >
                            <span>Nhà hàng</span>
                        </div>
                        <div
                            style={{
                                background: "#fff",
                                borderRadius: "10px",
                                border: "1px solid rgb(204, 204, 204)",
                                width: mobileMode ? 120 : 130,
                                height: 40,
                                color: "rgb(128, 128, 128)",
                                fontSize: mobileMode ? 14 : 16,
                            }}
                            className={`center_flex cusor ${tabActive === 1 ? "active-search" : ""}`}
                            onClick={() => {
                                setTabActive(1);
                                setListSearch(listAll.product);
                            }}
                        >
                            <span>Món ăn</span>
                        </div>
                    </div>
                    {listSearch?.length === 0 && (
                        <div className="not-found-search container" style={{ height: mobileMode ? "calc(100% - 250px)" : "calc(90% - 185px)" }}>
                            <div className="center_flex" style={{ flexDirection: "column", gap: 20 }}>
                                <img src="https://cdn-icons-png.flaticon.com/512/954/954591.png" alt="" />
                                <span style={{ fontSize: 18, fontWeight: "lighter" }}>Không tìm thấy kết quả nào</span>
                            </div>
                        </div>
                    )}
                </>
            )}

            <ShopList data={listSearch !== null && listSearch} tabActive={tabActive} />
        </div>
    );
};
