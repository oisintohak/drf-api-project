// adapted from https://medium.com/swlh/prevent-useeffects-callback-firing-during-initial-render-the-armchair-critic-f71bc0e03536
import { useEffect, useRef } from "react";
// this can be used just like useEffect, but will skip the first execution (when the component first renders)
const useOnUpdate = (callback, deps) => {
  const initialRender = useRef(true);
  useEffect(() => {
    let effectReturns = null;
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      effectReturns = callback();
    }

    if (effectReturns && typeof effectReturns === "function") {
      return effectReturns;
    }
    return undefined;
  }, deps);
};

export default useOnUpdate;
