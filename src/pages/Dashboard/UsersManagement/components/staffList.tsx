import React, { useState, useEffect } from "react";
import Divider from "../../../../components/divider";
import { Table } from "../../../../components/table/table";
import useSearch from "../../../../hooks/useSearch";
import useNavigateTo from "../../../../hooks/useNavigateTo";
import Pagination from "../../LoanManagement/components/pagination";
import InputField from "../../../../components/form/input";
import { Loader } from "rizzui";
import StaffTable from "./tables/StaffTable";
import MerchantTable from "./tables/MerchantTable";
import EmployerTable from "./tables/EmployerTable";
import StaffWithoutEmployerTable from "./tables/StaffWithoutEmployerTable";

const StaffList = ({
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
  setSearch,
  search
}) => {
  const { navigateToStaffProfile } = useNavigateTo();
  const [activeTab, setActiveTab] = useState("Staff");
  const [models, setModels] = useState<any[]>([]);

  // const {
  //   searchQuery,
  //   setSearchQuery,
  //   filteredData: filteredModels,
  // } = useSearch(models, ["publicId", "fullName", "email", "phoneNumber", "bvn"]);
const filteredModels = models;
  useEffect(() => {
    const mapToModel = (data, modelClass) =>
      data.map((item) => (modelClass ? new modelClass(item) : item));

    let dataToMap = [];
    let modelClass;
    switch (activeTab) {
      case "Employer":
        dataToMap = employers;
        modelClass = null;
        break;
      case "Merchant":
        dataToMap = merchants;
        modelClass = null;
        break;
      case "Staff":
        dataToMap = staffs;
        modelClass = null;
        break;
      default:
        dataToMap = staffs;
        modelClass = null;
        break;
    }

    const instances = mapToModel(dataToMap, modelClass);
    setModels(instances);
  }, [staffs, employers, merchants, admins, activeTab]);

  const handleOnclick = (id) => {
    navigateToStaffProfile(id);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const tabs = ["Staff", "Staff (with employer)", "Employer", "Merchant"];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const renderTable = () => {
    switch (activeTab) {
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
        return <StaffTable data={filteredModels} currentPage={currentPage} />;
      case "Staff (with employer)":
        return <StaffWithoutEmployerTable data={filteredModels} currentPage={currentPage} />;
      default:
        return <StaffTable data={filteredModels} currentPage={currentPage} />;
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
      ) : filteredModels.length === 0 ? (
        <div className="text-center my-auto p-10 text-clayGray">
          No staffs found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>{renderTable()}</Table>
          <Pagination
            currentPage={currentPage}
            totalPages={
              activeTab === "Employer"
                ? totalEmployerPages
                : activeTab === "Merchant"
                ? totalMerchantPages
                : totalStaffPages
            }
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default StaffList;
