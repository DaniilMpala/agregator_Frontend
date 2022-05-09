import { useEffect } from "react";

/**
 * В useEffect нельзя передавать асинхронный колбэк по умолчанию
 * @param callback Async callback
 * @param deps Dependency list, like in useEffect
 */
const useAsyncEffect = (
  callback: () => Promise<void>,
  deps?: React.DependencyList
) => {
  useEffect(() => {
    callback();
  }, deps);
};

export default useAsyncEffect;
