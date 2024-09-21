import React, { useEffect, useState } from "react";
import TopCards from "./components/topCards";
import StaffList from "./components/staffList";
import createApiManager from "../../../managers/apiManager";

const UsersManagement = () => {
  const [staffs, setStaffs] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [merchants, setMerchants] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalStaffPages, setTotalStaffPages] = useState(0);
  const [totalEmployerPages, setTotalEmployerPages] = useState(0);
  const [totalMerchantPages, setTotalMerchantPages] = useState(0);
  const [totalAdminPages, setTotalAdminPages] = useState(0);

  const [totalStaffTotalItems, setTotalStaffTotalItems] = useState(0);
  const [totalEmployerTotalItems, setTotalEmployerTotalItems] = useState(0);
  const [totalMerchantTotalItems, setTotalMerchantTotalItems] = useState(0);
  const [totalAdminTotalItems, setTotalAdminTotalItems] = useState(0);

  const itemsPerPage = 10;
  const apiManager = createApiManager();


  const [search, setSearch] = useState("");
  const [debounceSearch, setDebounceSeaarch] = useState('')

  useEffect(() => {
    if (!search) return

    setTimeout(() => {
      setDebounceSeaarch(search)
    }, 3000);

  }, [search]);

  useEffect(() => {
    const fetchUsers = async (page, debounceSearch) => {
      setIsLoading(true);
      // console.log(debounceSearch)
      try {
        const [
          fetchedStaffs,
          fetchedEmployers,
          fetchedMerchants,
        ] = await Promise.all([
          apiManager.getStaffs(page, itemsPerPage, debounceSearch),
          apiManager.getEmployers(page, itemsPerPage),
          apiManager.getMerchants(page, itemsPerPage),
        ]);

        setStaffs(fetchedStaffs.data.users);
        setEmployers(fetchedEmployers.data.users);
        setMerchants(fetchedMerchants.data.users);

        setTotalStaffPages(fetchedStaffs.data.totalPages);
        setTotalEmployerPages(fetchedEmployers.data.totalPages);
        setTotalMerchantPages(fetchedMerchants.data.totalPages);

        setTotalStaffTotalItems(fetchedStaffs.data.totalItems);
        setTotalEmployerTotalItems(fetchedEmployers.data.totalItems);
        setTotalMerchantTotalItems(fetchedMerchants.data.totalItems);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers(currentPage, debounceSearch);
  }, [currentPage, debounceSearch]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="space-y-10 px-12 -mt-10 max-md:max-w-full">
      <TopCards
        staffs={totalStaffTotalItems}
        employers={totalEmployerTotalItems}
        merchants={totalMerchantTotalItems}
      />
      <StaffList
        staffs={staffs}
        employers={employers}
        merchants={merchants}
        admins={admins}
        isLoading={isLoading}
        currentPage={currentPage}
        totalStaffPages={totalStaffPages}
        totalEmployerPages={totalEmployerPages}
        totalMerchantPages={totalMerchantPages}
        totalAdminPages={0}
        setCurrentPage={handlePageChange}
        setSearch={setSearch}
        search={search}
        
      />
      <div></div>
    </div>
  );
};

export default UsersManagement;
