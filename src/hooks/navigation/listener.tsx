"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useContext, useEffect, useRef } from "react";
import { onComplete, onStart } from "./events";

const NavigationEvent = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    onComplete();
  }, [pathname, searchParams]);
  return null;
};

export const NavigationEventsListener = () => {
  return (
    <Suspense>
      <NavigationEvent />
    </Suspense>
  );
};
