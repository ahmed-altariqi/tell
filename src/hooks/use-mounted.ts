import { useEffect, useState } from "react";

export function useMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, [isMounted, setIsMounted]);

  return { isMounted };
}
