import { useEffect, useState } from "react";

const useIsRTL = () => {
  const [isRTL, setIsRTL] = useState(
    document.getElementsByTagName("html")[0].getAttribute("dir") === "rtl"
  );

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "dir") {
          const direction = document
            .getElementsByTagName("html")[0]
            .getAttribute("dir");
          //make body dirction
          document.body.dir = direction as string;
          setIsRTL(direction === "rtl");
        }
      });
    });

    observer.observe(document.getElementsByTagName("html")[0], {
      attributes: true,
    });

    // Cleanup function
    return () => {
      observer.disconnect();
    };
  }, []);

  return isRTL;
};

export default useIsRTL;
