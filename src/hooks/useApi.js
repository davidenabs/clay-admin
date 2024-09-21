import { useAtom } from "jotai";
import {
  apiLoadingAtom,
  apiErrorAtom,
  apiSuccessAtom,
} from "../atoms/apiAtoms";

const useApi = (url, options) => {
  const [, setLoading] = useAtom(apiLoadingAtom);
  const [, setError] = useAtom(apiErrorAtom);
  const [, setSuccess] = useAtom(apiSuccessAtom);

  const fetchData = async (body = null) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const fetchOptions = { ...options };
      if (fetchOptions.method !== "GET" && body !== null) {
        fetchOptions.body = JSON.stringify(body);
      }
      const response = await fetch(url, fetchOptions);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          result.errors?.error || result.message || "An error occurred"
        );
      }
      setSuccess(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { fetchData };
};

export default useApi;
