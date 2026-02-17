"use client";

import "react-toastify/dist/ReactToastify.css";

import { twMerge } from "tailwind-merge";

import { outfitFont } from "@/styles/fonts";

import Tailwind_Wrapper from "./templates/Tailwind_Wrapper";

export default function Home() {
  return (
    <div className={twMerge("wf min-hf", outfitFont)}>
      <Tailwind_Wrapper />
    </div>
  );
}
