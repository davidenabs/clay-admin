import { generateQueryString } from "../utils/queryUtils";

const BASE_URL = "/admin";

const ENDPOINTS = {
  LOGIN: `/auth/admin/login`,
  REGISTER: `/auth/admin/register`,
  STAFFS_SPENDING: (page = 1, itemsPerPage = 10) => {
    const queryParams = generateQueryString({
      limit: itemsPerPage,
      page: page,
      sort: "createdAt",
      sortType: "desc",
    });
    return `${BASE_URL}/transactions/staffs-spending?${queryParams}`;
  },
  STAFF_TRANSACTION: (staffId, page = 1, itemsPerPage = 10) => {
    const queryParams = generateQueryString({
      limit: itemsPerPage,
      page: page,
      sort: "createdAt",
      sortType: "desc",
    });
    return `${BASE_URL}/transactions/staff-spending/${staffId}?${queryParams}`;
  },
  STAFFS_BY_ID: (staffId) => `${BASE_URL}/staffs/${staffId}`,
  EMPLOYERS_BY_ID: (employerId) => `${BASE_URL}/employers/${employerId}`,
  STAFFS_LOAN: `${BASE_URL}/loan/staffs`,
  EMPLOYERS_LOAN: `${BASE_URL}/loan/employers`,
  EMPLOYER_LOAN: (employerId, page = 1, itemsPerPage = 10) => {
    const queryParams = generateQueryString({
      limit: itemsPerPage,
      page: page,
      sort: "createdAt",
      sortType: "desc",
    });
    return `${BASE_URL}/loan/employer/${employerId}?${queryParams}`;
  },
  STAFFS_SPENDING_BY_ID: (transactionId) =>
    `/employer/transactions/staff/${transactionId}`,
  STAFFS: (page = 1, itemsPerPage = 10,  search = "") => {
    const queryParams = generateQueryString({
      limit: itemsPerPage,
      page: page,
      sort: "createdAt",
      sortType: "desc",
      search: search
    });
    return `${BASE_URL}/staffs?${queryParams}`;
  },
  EMPLOYERS: (page = 1, itemsPerPage = 10) => {
    const queryParams = generateQueryString({
      limit: itemsPerPage,
      page: page,
      sort: "createdAt",
      sortType: "desc",
    });
    return `${BASE_URL}/employers?${queryParams}`;
  },
  ADMINS: (page = 1, itemsPerPage = 10) => {
    const queryParams = generateQueryString({
      limit: itemsPerPage,
      page: page,
      sort: "createdAt",
      sortType: "desc",
    });
    return `${BASE_URL}/admins?${queryParams}`;
  },
  MERCHANTS: (page = 1, itemsPerPage = 10) => {
    const queryParams = generateQueryString({
      limit: itemsPerPage,
      page: page,
      sort: "createdAt",
      sortType: "desc",
    });
    return `${BASE_URL}/merchants?${queryParams}`;
  },
  VERIFY_BVN: `${BASE_URL}/staffs/verify-bvn`,
  VERIFY_OTP: `${BASE_URL}/staffs/verify-bvn-otp`,
  GET_BVN_DATA: `${BASE_URL}/staffs/get-bvn-data`,
  UPDATE_PROFILE: `/auth/employer/update`,
  UPDATE_PASSWORD: `/auth/employer/update-password`,
  ACTIVE_LOAN: `${BASE_URL}/loans/active`,
  INITIALIZE_PAYMENT: `${BASE_URL}/payment`,
  USER_ACCOUNT: (userId) => `${BASE_URL}/cards/account/${userId}`,
  USER_CARD: (userId) => `${BASE_URL}/cards/${userId}`,
  SET_PIN: (cardNumber) => `${BASE_URL}/cards/${cardNumber}/set-pin`,
  UPDATE_CARD: (cardNumber) => `${BASE_URL}/cards/${cardNumber}/update`,
  STAFF_LOAN: `${BASE_URL}/loan/staff-apply`,
  CREATE_CARD: `${BASE_URL}/cards`,
  UPDATE_STAFF: (staffId) => `${BASE_URL}/staffs/${staffId}`,
  // update /loan/staff-apply cards
};

export default ENDPOINTS;
