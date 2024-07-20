
export type Transaction = {
    _id: string;
    userId: string;
    employerId: string;
    merchantId: string;
    transactionId: string;
    staffData: StaffData;
    employerData: EmployerData;
    merchantData: MerchantData;
    employerStaffLoanData: EmployerStaffLoanData;
    cardAccountData: CardAccountData;
    transactionAmount: number;
    transactionSourceData: TransactionSourceData;
    transactionStatus: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  
  export type StaffData = {
    publicId: string;
    fullName: string;
    username: string;
    email: string;
    phoneNumber: string;
    emailVerifiedAt: null | string;
    phoneNumberVerifiedAt: null | string;
    type: 'staff';
    employerId: string;
    status: 'approved';
    profile: Profile;
  };
  
  export type EmployerData = {
    publicId: string;
    fullName: string;
    username: string;
    email: string;
    phoneNumber: string;
    emailVerifiedAt: null | string;
    phoneNumberVerifiedAt: null | string;
    type: 'employer';
    profile: EmployerProfile;
  };
  
  export type MerchantData = {
    publicId: string;
    fullName: string;
    username: string;
    email: string;
    phoneNumber: string;
    emailVerifiedAt: null | string;
    phoneNumberVerifiedAt: null | string;
    type: 'merchant';
  };
  
  export type EmployerStaffLoanData = {
    staffLoan: StaffLoan;
    employerLoan: EmployerLoan;
    account: Account;
    cardDetails: CardDetails;
  };
  
  export type StaffLoan = {
    _id: string;
    staffId: string;
    employerLoanId: string;
    loanLimit: number;
    amountSpent: number;
    amountRepaid: number;
    amountReceived: number;
    dueDate: string;
    isFullyRepaid: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    lastTransactionAmount: number;
  };
  
  export type EmployerLoan = {
    _id: string;
    employerId: string;
    totalLoanAmount: number;
    amountRepaid: number;
    repaymentAmount: number;
    amountReceived: number;
    dueDate: string;
    staffLoans: [];
    isFullyRepaid: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  
  export type Account = {
    account: {
      _id: string;
      userId: string;
      balance: number;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  };
  
  export type CardDetails = {
    cardNumber: string;
  };
  
  export type CardAccountData = {
    account: {
      _id: string;
      userId: string;
      balance: number;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  };
  
  export type TransactionSourceData = {
    userId: string;
    cardNumber: string;
    amount: number;
    previousAccountBal: number;
    currentAccountBal: number;
    description: string;
    status: string;
    meta: {
      tax: number;
      discount: number;
      total: number;
    };
    date: string;
  };
  
  export type Profile = {
    userId: string;
    idType: string;
    idFile: string;
    profilePhotoPath: string;
    address: string;
    state: string;
    country: string;
    bvn: string;
    isVerified: boolean;
  };
  
  export type EmployerProfile = {
    _id: string;
    userId: string;
    organizationName: string;
    address: string;
    contact: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  
  export type Meta = {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  
  export type TransactionResponse = {
    transactions: Transaction[];
    meta: Meta;
  };
  
  