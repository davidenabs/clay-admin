export type Staff = {
  user: User;
  profile: Profile;
};

export type User = {
  publicId: string;
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string;
  emailVerifiedAt: null | string;
  phoneNumberVerifiedAt: null | string;
  type: "staff";
  employerId: string;
  status: "approved" | "pending";
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

export type StaffResponse = {
  staffs: Staff[];
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
};
