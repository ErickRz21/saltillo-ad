import { useRef, useEffect } from "react";

const useCarouselScroll = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 600;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (carouselElement) {
      let isDragging = false;
      let startX: number;
      let scrollLeft: number;

      const handleDragStart = (e: MouseEvent) => {
        e.preventDefault();
        isDragging = true;
        startX = e.pageX - carouselElement.offsetLeft;
        scrollLeft = carouselElement.scrollLeft;
      };

      const handleDragMove = (e: MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carouselElement.offsetLeft;
        const walk = (x - startX) * 2.5; // Adjust scroll speed
        carouselElement.scrollLeft = scrollLeft - walk;
      };

      const handleDragEnd = () => {
        isDragging = false;
      };

      carouselElement.addEventListener("mousedown", handleDragStart);
      carouselElement.addEventListener("mousemove", handleDragMove);
      carouselElement.addEventListener("mouseup", handleDragEnd);
      carouselElement.addEventListener("mouseleave", handleDragEnd);

      return () => {
        carouselElement.removeEventListener("mousedown", handleDragStart);
        carouselElement.removeEventListener("mousemove", handleDragMove);
        carouselElement.removeEventListener("mouseup", handleDragEnd);
        carouselElement.removeEventListener("mouseleave", handleDragEnd);
      };
    }
  }, []);

  return { carouselRef, scroll };
};

export default useCarouselScroll;
