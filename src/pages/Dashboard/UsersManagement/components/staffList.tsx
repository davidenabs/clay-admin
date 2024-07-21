import React, { useState, useEffect } from "react";
import Divider from "../../../../components/divider";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "../../../../components/table/table";
import useSearch from "../../../../hooks/useSearch";
import useNavigateTo from "../../../../hooks/useNavigateTo";
import Pagination from "../../LoanManagement/components/pagination";
import InputField from "../../../../components/form/input";
import { formatDate, formatTime } from "../../../../utils/dateUtils";
import { Loader } from "rizzui";
import StaffModel, { IStaff } from "../../../../models/staff";
import {
  AdminModel,
  EmployerModel,
  MerchantModel,
} from "../../../../models/user";
import StaffTable from "./tables/StaffTable";
import MerchantTable from "./tables/MerchantTable";
import AdminTable from "./tables/AdminTable";
import EmployerTable from "./tables/EmployerTable";

const statusColors = {
  requested: "#DF9757",
  pending: "#FFD329",
  rejected: "#D70000",
  approved: "#409900",
};

interface StaffListProps {
  staffs: any;
  employers: IStaff[];
  merchants: IStaff[];
  admins: IStaff[];
  totalStaffPages: number;
  totalEmployerPages: number;
  totalMerchantPages: number;
  totalAdminPages: number;
  isLoading: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const StaffList: React.FC<StaffListProps> = ({
  staffs,
  employers,
  merchants,
  admins,
  totalStaffPages,
  totalEmployerPages,
  totalMerchantPages,
  totalAdminPages,
  isLoading,
  currentPage,
  setCurrentPage,
}) => {
  const { navigateToStaffProfile } = useNavigateTo();
  const [activeTab, setActiveTab] = useState("Staff");
  const [models, setModels] = useState<any[]>([]);

  const {
    searchQuery,
    setSearchQuery,
    filteredData: filteredModels,
  } = useSearch(models, [
    "publicId",
    "fullName",
    "email",
    "phoneNumber",
    "bvn",
  ]);

  useEffect(() => {
    const mapToModel = (data: any[], modelClass?: any) => 
      data.map((item: any) => modelClass ? new modelClass(item) : item);
    

    let dataToMap: any[] = [];
    let modelClass: any;
    switch (activeTab) {
      // case "Admin":
      //   dataToMap = admins;
      //   modelClass = AdminModel;
      //   break;
      case "Employer":
        dataToMap = employers;
        modelClass = null;
        break;
      case "Merchant":
        dataToMap = merchants;
        modelClass = MerchantModel;
        break;
      case "Staff":
        dataToMap = staffs;
        modelClass = null;
        break;
      default:
        dataToMap = staffs;
        modelClass = null; // Default to StaffModel for mixed data
        break;
    }

    const instances = mapToModel(dataToMap, modelClass);
    setModels(instances);
  }, [staffs, employers, merchants, admins, activeTab]);

  const handleOnclick = (id: string) => {
    navigateToStaffProfile(id);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const tabs = ["Staff", "Employer", "Merchant"];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to the first page when tab changes
  };

  const displayedStaffs = filteredModels;

  const renderTable = () => {
    switch (activeTab) {
      // case "Admin":
      //   return (
      //     <AdminTable
      //       data={filteredModels}
      //       currentPage={currentPage}
      //       handleOnclick={handleOnclick}
      //     />
      //   );
      case "Employer":
        return (
          <EmployerTable
            data={filteredModels}
            currentPage={currentPage}
            handleOnclick={handleOnclick}
          />
        );
      case "Merchant":
        return (
          <MerchantTable
            data={filteredModels}
            currentPage={currentPage}
            handleOnclick={handleOnclick}
          />
        );
      case "Staff":
        return (
          <StaffTable
            data={filteredModels}
            currentPage={currentPage}
          />
        );
      default:
        return (
          <StaffTable
            data={filteredModels}
            currentPage={currentPage}
          />
        );
    }
  };

  return (
    <div className="flex flex-col py-5 mx-auto max-w-full rounded-2xl shadow-lg w-full bg-white">
      {/* Tabs */}
      <div className="flex gap-5 lg:gap-16 px-12 w-full md:overflow-x-auto text-lg font-medium transition text-clayGray max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        {tabs.map((tab) => (
          <button
            type="button"
            onClick={() => handleTabChange(tab)}
            key={tab}
            className={`flex flex-col self-center ${
              activeTab === tab ? "text-brown " : ""
            }`}
          >
            <div className="self-center">{tab}</div>
            {activeTab === tab && (
              <div className="self-center border-solid border-lightBrown border-b-4 rounded-lg w-full" />
            )}
          </button>
        ))}
      </div>
      <div className="flex justify-end px-8 lg:px-12 py4">
        <InputField
          label=""
          type="search"
          name="search"
          value={searchQuery}
          onChange={(e: any) => setSearchQuery(e.target.value)}
          placeholder={"Search staffs..."}
          error={""}
          className="!rounded-full !border-clayGray"
        />
      </div>
      <Divider />

      {isLoading ? (
        <div className="flex justify-center my-auto py-10">
          <Loader variant="pulse" />
        </div>
      ) : displayedStaffs.length === 0 ? (
        <div className="text-center my-auto p-10 text-clayGray">
          No staffs found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>{renderTable()}</Table>
          <Pagination
            currentPage={currentPage}
            totalPages={
              activeTab === "Admin"
                ? totalAdminPages
                : activeTab === "Employer"
                ? totalEmployerPages
                : activeTab === "Merchant"
                ? totalMerchantPages
                : activeTab === "Staff"
                ? totalStaffPages
                : Math.max(
                    totalAdminPages,
                    totalEmployerPages,
                    totalMerchantPages,
                    totalStaffPages
                  )
            }
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default StaffList;
