import { useAtom } from "jotai";
import { useEffect } from "react";
import createApiManager from "../managers/apiManager";
import { staffAtom, staffLoadingAtom, staffTotalPagesAtom } from "../atoms/staffsAtom";
import {StaffResponse} from "../types/staff.types";

const useFetchStaffs = (page = 1, itemsPerPage = 10) => {
  const [staffs, setStaffs] = useAtom(staffAtom);
  const [isLoading, setIsLoading] = useAtom(staffLoadingAtom);
  const [totalPages, setTotalPages] = useAtom(staffTotalPagesAtom);
  const apiManager = createApiManager();

  useEffect(() => {
    const fetchStaffs = async () => {
      setIsLoading(true);
      try {
        const fetchedStaffs = await apiManager.getStaffs(page, itemsPerPage);
        const data = fetchedStaffs.data;
        console.log(data);
        
        // setStaffs(data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching staffs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStaffs();
  }, [page, itemsPerPage]);

  return { staffs, isLoading, totalPages };
};

export default useFetchStaffs;

