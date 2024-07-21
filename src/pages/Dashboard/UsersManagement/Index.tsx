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

  useEffect(() => {
    const fetchUsers = async (page) => {
      setIsLoading(true);
      try {
        const [
          fetchedStaffs,
          fetchedEmployers,
          fetchedMerchants,
          // fetchedAdmins,
        ] = await Promise.all([
          apiManager.getStaffs(page, itemsPerPage),
          apiManager.getEmployers(page, itemsPerPage),
          apiManager.getMerchants(page, itemsPerPage),
          // apiManager.getAdmins(page, itemsPerPage),
        ]);

        setStaffs(fetchedStaffs.data.users);
        setEmployers(fetchedEmployers.data.users);
        setMerchants(fetchedMerchants.data.users);
        // setAdmins(fetchedAdmins.data.users);

        setTotalStaffPages(fetchedStaffs.data.totalPages);
        setTotalEmployerPages(fetchedEmployers.data.totalPages);
        setTotalMerchantPages(fetchedMerchants.data.totalPages);
        // setTotalAdminPages(fetchedAdmins.data.totalPages);

        setTotalStaffTotalItems(fetchedStaffs.data.totalItems);
        setTotalEmployerTotalItems(fetchedEmployers.data.totalItems);
        setTotalMerchantTotalItems(fetchedMerchants.data.totalUsers);
        // setTotalAdminTotalItems(fetchedAdmins.data.totalItems);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    // if (newPage >= 1 && newPage <= totalPages) {
    //   setCurrentPage(newPage);
    // }
  };

  return (
    <div className="space-y-10 px-12 -mt-10 max-md:max-w-full">
      <TopCards
        staffs={totalStaffTotalItems}
        employers={totalEmployerTotalItems}
        merchants={totalMerchantTotalItems}
        // admins={totalAdminTotalItems}
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
        setCurrentPage={handlePageChange}          // onPageChange={handlePageChange}
      />
      <div>&nbsp;</div>
    </div>
  );
};

export default UsersManagement;
