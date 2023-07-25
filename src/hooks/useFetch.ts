import axios from "axios";
import { useEffect, useState } from "react";

export interface IItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface State<T> {
  loading: boolean;
  data: T[];
  error: Error | null;
}

export const useFetch = <T extends IItem>(url: string, _page: number): State<T> => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      axios
        .get(url, {
          params: {
            _page,
            _limit: 20,
          },
        })
        .then((res) => setData(res.data))
        .catch(setError)
        .finally(() => setLoading(false));
    }, 500);
  }, [url, _page]);

  return { loading, data, error };
};
