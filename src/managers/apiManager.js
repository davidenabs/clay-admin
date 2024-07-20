import ENDPOINTS from "../constants/endpoints";
import useApiMethods from "../hooks/useApiMethods";
import memoize from "memoizee";

const createApiManager = () => {
  const { get, post, put, patch } = useApiMethods();

  return {
    login: memoize(async (data) => {
      const url = ENDPOINTS.LOGIN;
      return await post(url, data);
    }),
    register: memoize(async (data) => {
      const url = ENDPOINTS.REGISTER;
      return await post(url, data);
    }),
    getStaffSpending: memoize(async (page = 1, itemsPerPage = 10) => {
      const url = ENDPOINTS.STAFFS_SPENDING(page, itemsPerPage);
      return await get(url);
    }),
    getStaffSpendingById: memoize(async (transactionId) => {
      const url = ENDPOINTS.STAFFS_SPENDING_BY_ID(transactionId);
      return await get(url);
    }),
    getStaffs: memoize(async (page = 1, itemsPerPage = 10) => {
      const url = ENDPOINTS.STAFFS(page, itemsPerPage);
      return await get(url);
    }),
    getEmployers: memoize(async (page = 1, itemsPerPage = 10) => {
      const url = ENDPOINTS.EMPLOYERS(page, itemsPerPage);
      console.log(url);
      return await get(url);
    }),
    getMerchants: memoize(async (page = 1, itemsPerPage = 10) => {
      const url = ENDPOINTS.MERCHANTS(page, itemsPerPage);
      return await get(url);
    }),
    getAdmins: memoize(async (page = 1, itemsPerPage = 10) => {
      const url = ENDPOINTS.ADMINS(page, itemsPerPage);
      return await get(url);
    }),
    getStaffById: memoize(async (staffId) => {
      const url = ENDPOINTS.STAFFS_BY_ID(staffId);
      return await get(url);
    }),
    getStaffTransactions: memoize(
      async (staffId, page = 1, itemsPerPage = 10) => {
        const url = ENDPOINTS.STAFF_TRANSACTION(staffId, page, itemsPerPage);
        return await get(url);
      }
    ),
    getStaffsLoans: memoize(async () => {
      const url = ENDPOINTS.STAFFS_LOAN;
      return await get(url);
    }),
    getEmployersLoans: memoize(async () => {
      const url = ENDPOINTS.EMPLOYERS_LOAN;
      return await get(url);
    }),
    getEmployerLoans: memoize(
      async (employerId, page = 1, itemsPerPage = 10) => {
        const url = ENDPOINTS.EMPLOYER_LOAN(employerId, page, itemsPerPage);
        return await get(url);
      }
    ),

    getStaffs: memoize(async (page = 1, itemsPerPage = 10) => {
      const url = ENDPOINTS.STAFFS(page, itemsPerPage);
      return await get(url);
    }),
    verifyBvn: memoize(async (data) => {
      const url = ENDPOINTS.VERIFY_BVN;
      return await post(url, data);
    }),
    verifyOtp: memoize(async (data) => {
      const url = ENDPOINTS.VERIFY_OTP;
      return await post(url, data);
    }),
    getBvnData: memoize(async (data) => {
      const url = ENDPOINTS.GET_BVN_DATA;
      return await post(url, data);
    }),
    updateProfile: memoize(async (data) => {
      const url = ENDPOINTS.UPDATE_PROFILE;
      return await put(url, data);
    }),
    updatePassword: memoize(async (data) => {
      const url = ENDPOINTS.UPDATE_PASSWORD;
      return await patch(url, data);
    }),
    getActiveLoan: memoize(async () => {
      const url = ENDPOINTS.ACTIVE_LOAN;
      return await get(url);
    }),
    initiatePayment: memoize(async () => {
      const url = ENDPOINTS.INITIALIZE_PAYMENT;
      return await get(url);
    }),
    getEmployerById: memoize(async (employerId) => {
      const url = ENDPOINTS.EMPLOYERS_BY_ID(employerId);
      return await get(url);
    }),
  };
};
// STAFFS
export default createApiManager;
