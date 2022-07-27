import { MutableRefObject, Ref, RefCallback, useCallback } from "react";

/**
 * Allows you to create a ref function that can access multiple refs.
 *
 * Example: needing to use a ref in a ref forwarding component
 */
function useMergedRef<T = any>(...refs: Ref<T>[]): RefCallback<T> {
  return useCallback((value) => {
    for (let i = 0; i < refs.length; i++) {
      const ref = refs[i];
      if (typeof ref === "function") {
        ref(value);
      } else if (ref && typeof ref === "object") {
        (ref as MutableRefObject<T | null>).current = value;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}

export default useMergedRef;
