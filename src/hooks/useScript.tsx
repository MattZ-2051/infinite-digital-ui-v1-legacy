import { useState, useEffect } from 'react';

const useScript = (src: string): boolean[] => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;

    const onScriptLoad = () => {
      setLoaded(true);
      setError(false);
    };

    const onScriptError = () => {
      script.remove();
      setLoaded(true);
      setError(true);
    };

    script.addEventListener('load', onScriptLoad);
    script.addEventListener('error', onScriptError);
    document.body.appendChild(script);

    return () => {
      script.removeEventListener('load', onScriptLoad);
      script.removeEventListener('error', onScriptError);
    };
  }, [src]);
  return [loaded, error];
};

export default useScript;
