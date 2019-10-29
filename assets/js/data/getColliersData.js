var getColliersData = function (response) {
    //Land Rows
    let landSizeSqmGrossIDR = 0
    let landSizeSqmGrossUSD = 0
    if (response.results[0].graphic.attributes.total_idr !== null && response.results[0].graphic.attributes.price_per_sqm_gross_idr !== null) {
        landSizeSqmGrossIDR = response.results[0].graphic.attributes.total_idr / response.results[0].graphic.attributes.price_per_sqm_gross_idr;
    }
    if (response.results[0].graphic.attributes.total_usd !== null && response.results[0].graphic.attributes.price_per_sqm_gross_usd !== null) {
        landSizeSqmGrossUSD = response.results[0].graphic.attributes.total_usd / response.results[0].graphic.attributes.price_per_sqm_gross_usd;
    }
    if (landSizeSqmGrossIDR !== null) {
        landSizeSqmGrossUSD = landSizeSqmGrossIDR / 14266.4;
        $("#landSizeSqmGrossIDR").css("font-weight", "bold");
    } else if (landSizeSqmGrossUSD !== null) {
        landSizeSqmGrossIDR = landSizeSqmGrossUSD * 14266.4;
        $("#landSizeSqmGrossUSD").css("font-weight", "bold");
    } else if (landSizeSqmGrossIDR == null && landSizeSqmGrossUSD == null) {
        landSizeSqmGrossIDR = 0
        landSizeSqmGrossUSD = 0
    }
    let landSizeSqmSGAIDR = 0;
    let landSizeSqmSGAUSD = 0;
    if (landSizeSqmSGAIDR !== null) {
        landSizeSqmSGAUSD = landSizeSqmSGAIDR / 14266.4;
        $("#landSizeSqmSGAIDR").css("font-weight", "bold");
    } else if (landSizeSqmSGAUSD !== null) {
        landSizeSqmSGAIDR = landSizeSqmSGAUSD * 14266.4;
        $("#landSizeSqmSGAUSD").css("font-weight", "bold");
    } else if (landSizeSqmSGAIDR == null && landSizeSqmSGAUSD == null) {
        landSizeSqmSGAIDR = 0
        landSizeSqmSGAUSD = 0
    }
    let landSizeUnitKeysIDR = response.results[0].graphic.attributes.units_keys;
    let landSizeUnitKeysUSD = response.results[0].graphic.attributes.units_keys;
    if (landSizeUnitKeysIDR !== null) {
        landSizeUnitKeysUSD = landSizeUnitKeysIDR / 14266.4;
        $("#landSizeUnitKeysIDR").css("font-weight", "bold");
    } else if (landSizeUnitKeysUSD !== null) {
        landSizeUnitKeysIDR = landSizeUnitKeysUSD * 14266.4;
        $("#landSizeUnitKeysUSD").css("font-weight", "bold");
    } else if (landSizeUnitKeysIDR == null && landSizeUnitKeysUSD == null) {
        landSizeUnitKeysIDR = 0
        landSizeUnitKeysUSD = 0
    }
    let landPricePerSqmGrossIDR = response.results[0].graphic.attributes.price_per_sqm_gross_idr;
    let landPricePerSqmGrossUSD = response.results[0].graphic.attributes.price_per_sqm_gross_usd;
    if (landPricePerSqmGrossIDR !== null) {
        landPricePerSqmGrossUSD = landPricePerSqmGrossIDR / 14266.4;
        $("#landPricePerSqmGrossIDR").css("font-weight", "bold");
    } else if (landPricePerSqmGrossUSD !== null) {
        landPricePerSqmGrossIDR = landPricePerSqmGrossUSD * 14266.4;
        $("#landPricePerSqmGrossUSD").css("font-weight", "bold");
    } else if (landPricePerSqmGrossIDR == null && landPricePerSqmGrossUSD == null) {
        landPricePerSqmGrossIDR = 0
        landPricePerSqmGrossUSD = 0
    }
    let landPricePerSqmSGAIDR = response.results[0].graphic.attributes.price_per_sqm_sganett_idr;
    let landPricePerSqmSGAUSD = response.results[0].graphic.attributes.price_per_sqm_sganett_usd;
    if (landPricePerSqmSGAIDR !== null) {
        landPricePerSqmSGAUSD = landPricePerSqmSGAIDR / 14266.4;
        $("#landPricePerSqmSGAIDR").css("font-weight", "bold");
    } else if (landPricePerSqmSGAUSD !== null) {
        landPricePerSqmSGAIDR = landPricePerSqmSGAUSD * 14266.4;
        $("#landPricePerSqmSGAUSD").css("font-weight", "bold");
    } else if (landPricePerSqmSGAIDR == null && landPricePerSqmSGAUSD == null) {
        landPricePerSqmSGAIDR = 0
        landPricePerSqmSGAUSD = 0
    }
    let landPricePerUnitKeyIDR = 0;
    let landPricePerUnitKeyUSD = 0;
    if (landPricePerUnitKeyIDR !== null) {
        landPricePerUnitKeyUSD = landPricePerUnitKeyIDR / 14266.4;
        $("#landPricePerUnitKeyIDR").css("font-weight", "bold");
    } else if (landPricePerUnitKeyUSD !== null) {
        landPricePerUnitKeyIDR = landPricePerUnitKeyUSD * 14266.4;
        $("#landPricePerUnitKeyUSD").css("font-weight", "bold");
    } else if (landPricePerUnitKeyIDR == null && landPricePerUnitKeyUSD == null) {
        landPricePerUnitKeyIDR = 0
        landPricePerUnitKeyUSD = 0
    }
    let landNJOPPriceTotalIDR = 0;
    if (response.results[0].graphic.attributes.njop !== null) {
        landNJOPPriceTotalIDR = response.results[0].graphic.attributes.njop
    }
    let landNJOPPriceTotalUSD = 0
    if (response.results[0].graphic.attributes.njop !== null) {
        landNJOPPriceTotalUSD = response.results[0].graphic.attributes.njop / 14266.4;
    }
    let landNJOPPricePerSqmIDR = 0
    if (response.results[0].graphic.attributes.price_per_sqm_gross_idr !== null) {
        landNJOPPricePerSqmIDR = landNJOPPriceTotalIDR / response.results[0].graphic.attributes.price_per_sqm_gross_idr;
    }
    let landNJOPPricePerSqmUSD = 0
    if (response.results[0].graphic.attributes.price_per_sqm_gross_usd !== null) {
        landNJOPPricePerSqmUSD = landNJOPPriceTotalUSD / response.results[0].graphic.attributes.price_per_sqm_gross_usd;
    }
    let landNJOPPercentIDR = 0;
    let landNJOPPercentUSD = 0;
    let landTotalIDR = response.results[0].graphic.attributes.total_idr;
    let landTotalUSD = response.results[0].graphic.attributes.total_usd;
    if (landTotalIDR !== null) {
        landTotalUSD = landTotalIDR / 14266.4;
        $("#landTotalIDR").css("font-weight", "bold");
    } else if (landTotalUSD !== null) {
        landTotalIDR = landTotalUSD * 14266.4;
        $("#landTotalUSD").css("font-weight", "bold");
    } else if (landTotalIDR == null && landTotalUSD == null) {
        landTotalIDR = 0
        landTotalUSD = 0
    }

    //Building Rows
    let buildingSizeSqmGrossIDR = 0;
    let buildingSizeSqmGrossUSD = 0;
    let buildingSizeSqmSGAIDR = 0;
    let buildingSizeSqmSGAUSD = 0;
    let buildingSizeUnitKeysIDR = 0;
    let buildingSizeUnitKeysUSD = 0;
    let buildingPricePerSqmGrossIDR = 0;
    let buildingPricePerSqmGrossUSD = 0;
    let buildingPricePerSqmSGAIDR = 0;
    let buildingPricePerSqmSGAUSD = 0;
    let buildingPricePerUnitKeyIDR = 0;
    let buildingPricePerUnitKeyUSD = 0;
    let buildingNJOPPriceTotalIDR = 0;
    let buildingNJOPPriceTotalUSD = 0;
    let buildingNJOPPricePerSqmIDR = 0;
    let buildingNJOPPricePerSqmUSD = 0;
    let buildingNJOPPercentIDR = 0;
    let buildingNJOPPercentUSD = 0;
    let buildingTotalIDR = null;
    let buildingTotalUSD = null;
    if (buildingTotalIDR !== null) {
        buildingTotalUSD = buildingTotalIDR / 14266.4;
        $("#buildingTotalIDR").css("font-weight", "bold");
    } else if (buildingTotalUSD !== null) {
        buildingTotalIDR = buildingTotalUSD * 14266.4;
        $("#buildingTotalUSD").css("font-weight", "bold");
    } else if (buildingTotalUSD == null && buildingTotalIDR == null) {
        buildingTotalIDR = 0
        buildingTotalUSD = 0
    }

    //Total Rows
    let totalSizeSqmGrossIDR = landSizeSqmGrossIDR + buildingSizeSqmGrossIDR;
    let totalSizeSqmGrossUSD = landSizeSqmGrossUSD + buildingSizeSqmGrossUSD;
    if (totalSizeSqmGrossIDR !== null) {
        totalSizeSqmGrossUSD = totalSizeSqmGrossIDR / 14266.4;
        $("#totalSizeSqmGrossIDR").css("font-weight", "bold");
    } else if (totalSizeSqmGrossUSD !== null) {
        totalSizeSqmGrossIDR = totalSizeSqmGrossUSD * 14266.4;
        $("#totalSizeSqmGrossUSD").css("font-weight", "bold");
    } else if (totalSizeSqmGrossUSD == null && totalSizeSqmGrossIDR == null) {
        totalSizeSqmGrossIDR = 0
        totalSizeSqmGrossUSD = 0
    }
    let totalSizeSqmSGAIDR = landSizeSqmSGAIDR + buildingSizeSqmSGAIDR;
    let totalSizeSqmSGAUSD = landSizeSqmSGAUSD + buildingSizeSqmSGAUSD;
    if (totalSizeSqmSGAIDR !== null) {
        totalSizeSqmSGAUSD = totalSizeSqmSGAIDR / 14266.4;
        $("#totalSizeSqmSGAIDR").css("font-weight", "bold");
    } else if (totalSizeSqmSGAUSD !== null) {
        totalSizeSqmSGAIDR = totalSizeSqmSGAUSD * 14266.4;
        $("#totalSizeSqmSGAUSD").css("font-weight", "bold");
    } else if (totalSizeSqmSGAUSD == null && totalSizeSqmSGAIDR == null) {
        totalSizeSqmSGAIDR = 0
        totalSizeSqmSGAUSD = 0
    }
    let totalSizeUnitKeysIDR = landSizeUnitKeysIDR + buildingSizeUnitKeysIDR;
    let totalSizeUnitKeysUSD = landSizeUnitKeysUSD + buildingSizeUnitKeysUSD;
    if (totalSizeUnitKeysIDR !== null) {
        totalSizeUnitKeysUSD = totalSizeUnitKeysIDR / 14266.4;
        $("#totalSizeUnitKeysIDR").css("font-weight", "bold");
    } else if (totalSizeUnitKeysUSD !== null) {
        totalSizeUnitKeysIDR = totalSizeUnitKeysUSD * 14266.4;
        $("#totalSizeUnitKeysUSD").css("font-weight", "bold");
    } else if (totalSizeUnitKeysIDR == null && totalSizeUnitKeysUSD == null) {
        totalSizeUnitKeysIDR = 0
        totalSizeUnitKeysUSD = 0
    }
    let totalPricePerSqmGrossIDR = landPricePerSqmGrossIDR + buildingPricePerSqmGrossIDR;
    let totalPricePerSqmGrossUSD = landPricePerSqmGrossUSD + buildingPricePerSqmGrossUSD;
    if (totalPricePerSqmGrossIDR !== null) {
        totalPricePerSqmGrossUSD = totalPricePerSqmGrossIDR / 14266.4;
        $("#totalPricePerSqmGrossIDR").css("font-weight", "bold");
    } else if (totalPricePerSqmGrossUSD !== null) {
        totalPricePerSqmGrossIDR = totalPricePerSqmGrossUSD * 14266.4;
        $("#totalPricePerSqmGrossUSD").css("font-weight", "bold");
    } else if (totalPricePerSqmGrossIDR == null && totalPricePerSqmGrossUSD == null) {
        totalPricePerSqmGrossIDR = 0
        totalPricePerSqmGrossUSD = 0
    }
    let totalPricePerSqmSGAIDR = landPricePerSqmSGAIDR + buildingPricePerSqmSGAIDR;
    let totalPricePerSqmSGAUSD = landPricePerSqmSGAUSD + buildingPricePerSqmSGAUSD;
    if (totalPricePerSqmSGAIDR !== null) {
        totalPricePerSqmSGAUSD = totalPricePerSqmSGAIDR / 14266.4;
        $("#totalPricePerSqmSGAIDR").css("font-weight", "bold");
    } else if (totalPricePerSqmSGAUSD !== null) {
        totalPricePerSqmSGAIDR = totalPricePerSqmSGAUSD * 14266.4;
        $("#totalPricePerSqmSGAUSD").css("font-weight", "bold");
    } else if (totalPricePerSqmSGAIDR == null && totalPricePerSqmSGAUSD == null) {
        totalPricePerSqmSGAIDR = 0
        totalPricePerSqmSGAUSD = 0
    }
    let totalPricePerUnitKeyIDR = landPricePerUnitKeyIDR + buildingPricePerUnitKeyIDR;
    let totalPricePerUnitKeyUSD = landPricePerUnitKeyUSD + buildingPricePerUnitKeyUSD;
    if (totalPricePerUnitKeyIDR !== null) {
        totalPricePerUnitKeyUSD = totalPricePerUnitKeyIDR / 14266.4;
        $("#totalPricePerUnitKeyIDR").css("font-weight", "bold");
    } else if (totalPricePerUnitKeyUSD !== null) {
        totalPricePerUnitKeyIDR = totalPricePerUnitKeyUSD * 14266.4;
        $("#totalPricePerUnitKeyUSD").css("font-weight", "bold");
    } else if (totalPricePerUnitKeyIDR == null && totalPricePerUnitKeyUSD == null) {
        totalPricePerUnitKeyIDR = 0
        totalPricePerUnitKeyUSD = 0
    }
    let totalNJOPPriceTotalIDR = landNJOPPriceTotalIDR + buildingNJOPPriceTotalIDR;
    let totalNJOPPriceTotalUSD = landNJOPPriceTotalUSD + buildingNJOPPriceTotalUSD;
    if (totalNJOPPriceTotalIDR !== null) {
        totalNJOPPriceTotalUSD = totalNJOPPriceTotalIDR / 14266.4;
        $("#totalNJOPPriceTotalIDR").css("font-weight", "bold");
    } else if (totalNJOPPriceTotalUSD !== null) {
        totalNJOPPriceTotalIDR = totalNJOPPriceTotalUSD * 14266.4;
        $("#totalNJOPPriceTotalUSD").css("font-weight", "bold");
    } else if (totalNJOPPriceTotalIDR == null && totalNJOPPriceTotalUSD == null) {
        totalNJOPPriceTotalIDR = 0
        totalNJOPPriceTotalUSD = 0
    }
    let totalNJOPPricePerSqmIDR = landNJOPPricePerSqmIDR + buildingNJOPPricePerSqmIDR;
    let totalNJOPPricePerSqmUSD = landNJOPPricePerSqmUSD + buildingNJOPPricePerSqmUSD;
    if (totalNJOPPricePerSqmIDR !== null) {
        totalNJOPPricePerSqmUSD = totalNJOPPricePerSqmIDR / 14266.4;
        $("#totalNJOPPricePerSqmIDR").css("font-weight", "bold");
    } else if (totalNJOPPricePerSqmUSD !== null) {
        totalNJOPPricePerSqmIDR = totalNJOPPricePerSqmUSD * 14266.4;
        $("#totalNJOPPricePerSqmUSD").css("font-weight", "bold");
    } else if (totalNJOPPricePerSqmIDR == null && totalNJOPPricePerSqmUSD == null) {
        totalNJOPPricePerSqmIDR = 0
        totalNJOPPricePerSqmUSD = 0
    }
    let totalNJOPPercentIDR = landNJOPPercentIDR + buildingNJOPPercentIDR;
    let totalNJOPPercentUSD = landNJOPPercentUSD + buildingNJOPPercentUSD;
    if (totalNJOPPercentIDR !== null) {
        totalNJOPPercentUSD = totalNJOPPercentIDR / 14266.4;
        $("#totalNJOPPercentIDR").css("font-weight", "bold");
    } else if (totalNJOPPercentUSD !== null) {
        totalNJOPPercentIDR = totalNJOPPercentUSD * 14266.4;
        $("#totalNJOPPercentUSD").css("font-weight", "bold");
    } else if (totalNJOPPercentIDR == null && totalNJOPPercentUSD == null) {
        totalNJOPPercentIDR = 0
        totalNJOPPercentUSD = 0
    }
    let totalTotalIDR = landTotalIDR + buildingTotalIDR;
    let totalTotalUSD = landTotalUSD + buildingTotalUSD;
    if (totalTotalIDR !== null) {
        totalTotalUSD = totalTotalIDR / 14266.4;
        $("#totalTotalIDR").css("font-weight", "bold");
    } else if (totalTotalUSD !== null) {
        totalTotalIDR = totalTotalUSD * 14266.4;
        $("#totalTotalUSD").css("font-weight", "bold");
    }

    //KLB Rows
    let KLBTotalIDR = landTotalIDR
    let KLBTotalUSD = landTotalUSD
    if (KLBTotalIDR !== null) {
        KLBTotalUSD = KLBTotalIDR / 14266.4;
        $("#KLBTotalIDR").css("font-weight", "bold");
    } else if (KLBTotalUSD !== null) {
        KLBTotalIDR = KLBTotalUSD * 14266.4;
        $("#KLBTotalUSD").css("font-weight", "bold");
    } else if (KLBTotalUSD == null && KLBTotalIDR == null) {
        KLBTotalIDR = 0
        KLBTotalUSD = 0
    }
    let KLBKLBIDR = 0;
    let KLBKLBUSD = 0;
    if (response.results[0].graphic.attributes.klb !== null) {
        KLBKLBIDR = response.results[0].graphic.attributes.klb
        KLBKLBUSD = response.results[0].graphic.attributes.klb
    }
    let KLBLandSqmIDR = 0;
    let KLBLandSqmUSD = 0;
    if (landSizeSqmGrossIDR !== null) {
        KLBLandSqmIDR = landSizeSqmGrossIDR
        KLBLandSqmUSD = KLBLandSqmIDR / 14266.4;
        $("#KLBLandSqmIDR").css("font-weight", "bold");
    } else if (landSizeSqmGrossUSD !== null) {
        KLBLandSqmUSD = landSizeSqmGrossUSD
        KLBLandSqmIDR = KLBLandSqmUSD * 14266.4;
        $("#KLBLandSqmUSD").css("font-weight", "bold");
    }

    let KLBBuildableSqmIDR = KLBTotalIDR / (KLBKLBIDR * KLBLandSqmIDR);
    let KLBBuildableSqmUSD = KLBTotalUSD / (KLBKLBUSD * KLBLandSqmUSD);

    if (isFinite(KLBBuildableSqmIDR) == false) {
        KLBBuildableSqmIDR = 0
    }

    if (isFinite(KLBBuildableSqmUSD) == false) {
        KLBBuildableSqmUSD = 0
    }

    let attr = Object.keys(response.results[0].graphic.attributes);
    let priceType = response.results[0].graphic.attributes.price_type;
    let actionDate = response.results[0].graphic.attributes.action_date;
    let imageUrl = response.results[0].graphic.attributes.property_photo;
    let propertyType = response.results[0].graphic.attributes.property_type;
    let buildingName = response.results[0].graphic.attributes.property_name;
    let address = response.results[0].graphic.attributes.property_address;
    let lastupdate = response.results[0].graphic.attributes.last_update;
    let colliersContact = response.results[0].graphic.attributes.property_colliers_contact;
    let d = new Date(lastupdate);
    let a = new Date(actionDate);
    lastupdate =
        d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
    if (lastupdate === "NaN-NaN-NaN") {
        lastupdate = "-";
    }
    actionDate =
        a.getDate() + "-" + (a.getMonth() + 1) + "-" + a.getFullYear();
    if (actionDate === "NaN-NaN-NaN") {
        actionDate = "-";
    }
    if (attr.includes("propertytype") || attr.includes("property_type") || attr.includes("property_t")) {
        $(".popupFilter").show();
        $(".image-property").css("background-image", "url(" + imageUrl + ")");
        $(".image-property").css("background-size", "100% 100%");
        $("#propertytype-popup").text(
            "PROPERTY TYPE : " + propertyType.toUpperCase()
        );
        $("#colliers-contact-popup").text("Colliers Contact : " + colliersContact);
        if (priceType == "asking price") {
            $("#action-date-popup").text("Asking on " + actionDate);
        }
        $("#lastupdate-popup").text("Last updated : " + lastupdate);
        $("#buildingName-popup").text("Land at " + buildingName);
        $("#address-popup").text(address);

        //Land views
        $("#landTotalIDR").text(
            landTotalIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landTotalUSD").text(
            landTotalUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landSizeSqmGrossIDR").text(
            landSizeSqmGrossIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landSizeSqmGrossUSD").text(
            landSizeSqmGrossUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landSizeSqmSGAIDR").text(
            landSizeSqmSGAIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landSizeSqmSGAUSD").text(
            landSizeSqmSGAUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landSizeUnitKeysIDR").text(
            landSizeUnitKeysIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landSizeUnitKeysUSD").text(
            landSizeUnitKeysUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landPricePerSqmGrossIDR").text(
            landPricePerSqmGrossIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landPricePerSqmGrossUSD").text(
            landPricePerSqmGrossUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landPricePerSqmSGAIDR").text(
            landPricePerSqmSGAIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landPricePerSqmSGAUSD").text(
            landPricePerSqmSGAUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landPricePerUnitKeyIDR").text(
            landPricePerUnitKeyIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landPricePerUnitKeyUSD").text(
            landPricePerUnitKeyUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landNJOPPriceTotalIDR").text(
            landNJOPPriceTotalIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landNJOPPriceTotalUSD").text(
            landNJOPPriceTotalUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landNJOPPricePerSqmIDR").text(
            landNJOPPricePerSqmIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landNJOPPricePerSqmUSD").text(
            landNJOPPricePerSqmUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landNJOPPercentIDR").text(
            landNJOPPercentIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#landNJOPPercentUSD").text(
            landNJOPPercentUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );

        //building views
        $("#buildingTotalIDR").text(
            buildingTotalIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingTotalUSD").text(
            buildingTotalUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingSizeSqmGrossIDR").text(
            buildingSizeSqmGrossIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingSizeSqmGrossUSD").text(
            buildingSizeSqmGrossUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingSizeSqmSGAIDR").text(
            buildingSizeSqmSGAIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingSizeSqmSGAUSD").text(
            buildingSizeSqmSGAUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingSizeUnitKeysIDR").text(
            buildingSizeUnitKeysIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingSizeUnitKeysUSD").text(
            buildingSizeUnitKeysUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingPricePerSqmGrossIDR").text(
            buildingPricePerSqmGrossIDR
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingPricePerSqmGrossUSD").text(
            buildingPricePerSqmGrossUSD
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingPricePerSqmSGAIDR").text(
            buildingPricePerSqmSGAIDR
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingPricePerSqmSGAUSD").text(
            buildingPricePerSqmSGAUSD
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingPricePerUnitKeyIDR").text(
            buildingPricePerUnitKeyIDR
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingPricePerUnitKeyUSD").text(
            buildingPricePerUnitKeyUSD
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingNJOPPriceTotalIDR").text(
            buildingNJOPPriceTotalIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingNJOPPriceTotalUSD").text(
            buildingNJOPPriceTotalUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingNJOPPricePerSqmIDR").text(
            buildingNJOPPricePerSqmIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingNJOPPricePerSqmUSD").text(
            buildingNJOPPricePerSqmUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingNJOPPercentIDR").text(
            buildingNJOPPercentIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#buildingNJOPPercentUSD").text(
            buildingNJOPPercentUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );

        //total views
        $("#totalTotalIDR").text(
            totalTotalIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalTotalUSD").text(
            totalTotalUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalSizeSqmGrossIDR").text(
            totalSizeSqmGrossIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalSizeSqmGrossUSD").text(
            totalSizeSqmGrossUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalSizeSqmSGAIDR").text(
            totalSizeSqmSGAIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalSizeSqmSGAUSD").text(
            totalSizeSqmSGAUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalSizeUnitKeysIDR").text(
            totalSizeUnitKeysIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalSizeUnitKeysUSD").text(
            totalSizeUnitKeysUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalPricePerSqmGrossIDR").text(
            totalPricePerSqmGrossIDR
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalPricePerSqmGrossUSD").text(
            totalPricePerSqmGrossUSD
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalPricePerSqmSGAIDR").text(
            totalPricePerSqmSGAIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalPricePerSqmSGAUSD").text(
            totalPricePerSqmSGAUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalPricePerUnitKeyIDR").text(
            totalPricePerUnitKeyIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalPricePerUnitKeyUSD").text(
            totalPricePerUnitKeyUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalNJOPPriceTotalIDR").text(
            totalNJOPPriceTotalIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalNJOPPriceTotalUSD").text(
            totalNJOPPriceTotalUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalNJOPPricePerSqmIDR").text(
            totalNJOPPricePerSqmIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalNJOPPricePerSqmUSD").text(
            totalNJOPPricePerSqmUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalNJOPPercentIDR").text(
            totalNJOPPercentIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#totalNJOPPercentUSD").text(
            totalNJOPPercentUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );

        //KLB views
        $("#KLBTotalIDR").text(
            KLBTotalIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#KLBTotalUSD").text(
            KLBTotalUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#KLBKLBIDR").text(
            KLBKLBIDR
        );
        $("#KLBKLBUSD").text(
            KLBKLBUSD
        );
        $("#KLBLandSqmIDR").text(
            KLBLandSqmIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#KLBLandSqmUSD").text(
            KLBLandSqmUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#KLBBuildableSqmIDR").text(
            KLBBuildableSqmIDR.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );
        $("#KLBBuildableSqmUSD").text(
            KLBBuildableSqmUSD.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
        );

        $(".image-property").error(function () {
            $(this).attr("src", "assets/images/no-photo.png");
        });
    }
}