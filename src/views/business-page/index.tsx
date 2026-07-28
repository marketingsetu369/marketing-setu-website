"use client";

import type { BusinessPageData } from "@/types/businessPage";
import BakeryView from "./templates/bakery";
import CafeView from "./templates/cafe";
import Cafe2View from "./templates/cafe2";
import DoctorView from "./templates/doctor";
import GymView from "./templates/gym";
import HotelView from "./templates/hotel";
import JewelleryView from "./templates/jewellery";
import NurseryView from "./templates/nursery";
import PhotographerView from "./templates/photographer";
import RealEstateView from "./templates/realEstate";
import RestaurantView from "./templates/restaurant";
import SalonSinglePageView from "./templates/salonSinglePage";
import BusinessView from "./templates/starterTemplate";
import TravelView from "./templates/travel";

interface BusinessViewProps {
  data: BusinessPageData | null;
  businessName: string;
}

export default function MainBusinessView({ data, businessName }: BusinessViewProps) {
  const category = (data?.business_category || "").toLowerCase();
  
  const isDoctor = 
    category.includes("doctor") || 
    category.includes("clinic") || 
    category.includes("dentist") || 
    category.includes("hospital") || 
    category.includes("medical") || 
    category.includes("cardiologist") || 
    category.includes("physician") || 
    category.includes("healthcare");

  const isSalon = 
    category.includes("salon") || 
    category.includes("saloon") || 
    category.includes("parlour") || 
    category.includes("parlor") || 
    category.includes("spa") || 
    category.includes("hair") || 
    category.includes("beauty") || 
    category.includes("makeup") || 
    category.includes("unisex") || 
    category.includes("barber");

  const isHotel = 
    category.includes("hotel") || 
    category.includes("resort") || 
    category.includes("stay") || 
    category.includes("inn") || 
    category.includes("suite") || 
    category.includes("lodging");

  // Cafe v2 — triggered by slug containing "cafe2" (preview) or template_data.cafe.variant === "v2"
  const isCafe2 =
    (data?.slug ?? "").includes("cafe2") ||
    (data?.template_data?.cafe as { variant?: string } | undefined)?.variant === "v2";

  const isCafe = 
    !isCafe2 && (
      category.includes("cafe") || 
      category.includes("coffee") || 
      category.includes("bakery") || 
      category.includes("bistro") || 
      category.includes("patio") || 
      category.includes("espresso")
    );

  const isRestaurant = 
    category.includes("restaurant") || 
    category.includes("dining") || 
    category.includes("bistro") || 
    category.includes("eatery") || 
    category.includes("bar") || 
    category.includes("tavern");

  const isGym = 
    category.includes("gym") || 
    category.includes("fitness") || 
    category.includes("studio") || 
    category.includes("crossfit") || 
    category.includes("training") || 
    category.includes("fitness center");

  const isRealEstate = 
    category.includes("real estate") || 
    category.includes("property") || 
    category.includes("realtor") || 
    category.includes("broker") || 
    category.includes("estate") || 
    category.includes("housing");

  const isJewellery = 
    category.includes("jewellery") || 
    category.includes("jewelry") || 
    category.includes("gold") || 
    category.includes("silver") || 
    category.includes("diamond");

  const isTravel = 
    category.includes("travel") || 
    category.includes("tour") || 
    category.includes("trip") || 
    category.includes("holiday") || 
    category.includes("wanderlust");

  const isPhotographer = 
    category.includes("photograph") || 
    category.includes("camera") || 
    category.includes("lens") || 
    category.includes("portfolio") || 
    category.includes("shoot");

  const isBakery = 
    category.includes("bakery") || 
    category.includes("cake") || 
    category.includes("bake") || 
    category.includes("bread") || 
    category.includes("pastry");

  const isNursery = 
    category.includes("nursery") || 
    category.includes("plant") || 
    category.includes("garden") || 
    category.includes("flower") || 
    category.includes("grow");

  if (isDoctor) {
    return <DoctorView data={data} businessName={businessName} />;
  }

  if (isSalon) {
    return <SalonSinglePageView data={data} businessName={businessName} />;
  }

  if (isHotel) {
    return <HotelView data={data} businessName={businessName} />;
  }

  if (isCafe2) {
    return <Cafe2View data={data} businessName={businessName} />;
  }

  if (isCafe) {
    return <CafeView data={data} businessName={businessName} />;
  }

  if (isRestaurant) {
    return <RestaurantView data={data} businessName={businessName} />;
  }

  if (isGym) {
    return <GymView data={data} businessName={businessName} />;
  }

  if (isRealEstate) {
    return <RealEstateView data={data} businessName={businessName} />;
  }

  if (isJewellery) {
    return <JewelleryView data={data} businessName={businessName} />;
  }

  if (isTravel) {
    return <TravelView data={data} businessName={businessName} />;
  }

  if (isPhotographer) {
    return <PhotographerView data={data} businessName={businessName} />;
  }

  if (isBakery) {
    return <BakeryView data={data} businessName={businessName} />;
  }

  if (isNursery) {
    return <NurseryView data={data} businessName={businessName} />;
  }

  return <BusinessView data={data} businessName={businessName} />;
}
