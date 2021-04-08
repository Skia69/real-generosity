import { useEffect, useState, useRef } from 'react';

export const useLocation = (loc) => {
  const [cityName, setCityName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const renders = useRef(0);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    setIsLoading(true);
    const fetchLocation = async () => {
      try {
        const result = await (
          await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${loc.latitude},${loc.longitude}
                &key=${API_KEY}`,
            { cache: 'force-cache' }
          )
        ).json();

        if (result) {
          const location = result?.results[1]?.formatted_address;
          setCityName(location);
          setIsLoading(false);
        }
      } catch (error) {
        console.log('useLocation error', error);
      }
    };

    fetchLocation();
    console.log('useLoaction renders...', renders.current++);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { cityName, isLoading };
};
