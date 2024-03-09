import { useState, useEffect } from "react";

import accessCriteriaApi from "../api/accessCriteria";
import useApi from "../hooks/useApi";

const useAccessibilities = () => {
  const [accessibilities, setAccessibilities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAccessApi = useApi(accessCriteriaApi.getAccessCriteria);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAccessApi.request();
        setAccessibilities(getAccessApi.data || []);
      } catch (error) {
        console.error("Error fetching accessibility values:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { accessibilities, isLoading };
};

export default useAccessibilities;
