import { useEffect } from "react";
import { useSetAtom } from "jotai";
import {
  apiLoadingAtom,
  apiErrorAtom,
  apiSuccessAtom,
} from "../atoms/apiAtoms";
import {
  registerFormValuesAtom,
  registerFormErrorValuesAtom,
} from "../atoms/registerFormAtoms";

const useInitializeAtoms = () => {
  const setLoading = useSetAtom(apiLoadingAtom);
  const setError = useSetAtom(apiErrorAtom);
  const setSuccess = useSetAtom(apiSuccessAtom);
  const setFormValues = useSetAtom(registerFormValuesAtom);
  const setErrors = useSetAtom(registerFormErrorValuesAtom);

  useEffect(() => {
    setLoading(false);
    setError(null);
    setSuccess(null);
  }, [setLoading, setError, setSuccess, setFormValues, setErrors]);
};

export default useInitializeAtoms;
