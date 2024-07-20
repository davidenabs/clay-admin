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
  const [totalStaffPages, setTotalStaffPages] = useState(1);
  const [totalEmployerPages, setTotalEmployerPages] = useState(1);
  const [totalMerchantPages, setTotalMerchantPages] = useState(1);
  const [totalAdminPages, setTotalAdminPages] = useState(1);
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
          fetchedAdmins,
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

        // Assuming totalPages is the same for all endpoints
        setTotalStaffPages(fetchedStaffs.data.totalPages);
        setTotalEmployerPages(fetchedEmployers.data.totalPages);
        setTotalMerchantPages(fetchedMerchants.data.totalPages);
        setTotalAdminPages(fetchedAdmins.data.totalPages);
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
        staffs={totalStaffPages}
        employers={totalEmployerPages}
        merchants={totalMerchantPages}
        // admins={totalAdminPages}
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
