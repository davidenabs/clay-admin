import { useAtom } from "jotai";
import {
  apiLoadingAtom,
  apiErrorAtom,
  apiSuccessAtom,
} from "../atoms/apiAtoms";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import config from "../config";

const useApiMethods = () => {
  const [, setLoading] = useAtom(apiLoadingAtom);
  const [, setError] = useAtom(apiErrorAtom);
  const [, setSuccess] = useAtom(apiSuccessAtom);
  const authToken = useAuthHeader();

  const getHeaders = () => ({
    // mode: 'no-cors',
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "trues",
    "User-Agent": "CustomUserAgent/1.0",
    Authorization: authToken,
  });

  const apiRequest = async (method, url, body = null) => {
    url = config.base_uri + url;
    setLoading(true);
    setError(null);
    setSuccess(null);
    let response;

    try {
      if (body) {
        response = await fetch(url, {
          // mode: 'no-cors',
          method,
          headers: getHeaders(),
          body: body !== null ? JSON.stringify(body) : undefined, // Omit unnecessary body
        });
      } else {
        response = await fetch(url, {
          method,
          headers: getHeaders(),
        });
      }

      if (!response.ok) {
        const errorData = await response.json(); // Attempt to parse error JSON
        const errorMessage =
          errorData?.errors?.message ||
          errorData?.errors?.error ||
          errorData?.message ||
          "API request failed";
        throw new Error(errorMessage);
      }

      const result = await response.json();
      setSuccess(result);
      return result;
    } catch (err) {
      setError(err.message); 
      throw err; // Re-throw for potential global error handling
    } finally {
      setLoading(false);
    }
  };

  return {
    get: (url) => apiRequest("GET", url),
    post: (url, data) => apiRequest("POST", url, data),
    put: (url, data) => apiRequest("PUT", url, data),
    patch: (url, data) => apiRequest("PATCH", url, data),
    delete: (url, data) => apiRequest("DELETE", url, data),
  };
};

export default useApiMethods;
