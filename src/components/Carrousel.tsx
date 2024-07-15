"use client";
import CarrouselItem from "./CarrouselItem";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

export default function Carrousel({ items }: { items: any }) {
  const carrouselRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="carrousel-container" style={{ position: "relative" }}>
      <div className="carrousel-items" ref={carrouselRef}>
        {items.map((item: any) => (
          <CarrouselItem {...item} key={crypto.randomUUID()} />
        ))}
      </div>
      <button
        className="controls back"
        onClick={() => back(carrouselRef?.current)}
      >
        <FaChevronLeft />
      </button>
      <button
        className="controls next"
        onClick={() => next(carrouselRef?.current)}
      >
        <FaChevronRight />
      </button>
    </div>
  );
}

function getCarrouselPosition(
  xCords: number,
  carrousel: HTMLDivElement | null
) {
  if (!carrousel) return 0;
  return Math.ceil(xCords * carrousel.childElementCount);
}
function getFirstXcords(carrousel: HTMLDivElement | null) {
  if (!carrousel) return 0;
  return (
    Math.max(carrousel.scrollLeft - carrousel.clientWidth, 0) /
    carrousel.scrollWidth
  );
}
function getLastXcords(carrousel: HTMLDivElement | null) {
  if (!carrousel) return 0;
  return (
    Math.min(
      carrousel.scrollLeft + carrousel.clientWidth,
      carrousel.scrollWidth
    ) / carrousel.scrollWidth
  );
}
function back(carrousel: HTMLDivElement | null) {
  if (!carrousel) return;
  const pos = getCarrouselPosition(getFirstXcords(carrousel), carrousel);
  carrousel.children[pos].scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "start",
  });
}
function next(carrousel: HTMLDivElement | null) {
  if (!carrousel) return;
  const pos = getCarrouselPosition(getLastXcords(carrousel), carrousel);
  carrousel.children[pos - 1].scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "start",
  });
}
