export interface BvnData {
  first_name: string;
  last_name: string;
  middle_name: string | null;
  phone_number: string;
  phone_number_2: string | null;
  email: string | null;
  gender: string;
  state_of_origin: string;
  bvn: string;
  nin: string | null;
  registration_date: string;
  lga_of_origin: string;
  lga_of_Residence: string;
  marital_status: string;
  watch_listed: boolean;
  dob: string;
  photoId: string | null;
}

export interface IStaff {
  _id: string;
  publicId: string;
  fullName: string;
  username: string;
  email: string;
  emailVerifiedAt: string | null;
  phoneNumber: string;
  phoneNumberVerifiedAt: string | null;
  password: string;
  type: string;
  status: string;
  employerId: string;
  bvn: string | null;
  bvnVerifiedAt: string | null;
  createdAt: Date;
  updatedAt: string;
  __v: number;
  bvnData: BvnData | null;
}

class StaffModel implements IStaff {
  _id: string;
  id: string;
  fullName: string;
  publicId: string;
  createdAt: Date;
  phoneNumber: string;
  state: string;
  community: string;
  status: string;
  bvn: string;
  username: string;
  email: string;
  emailVerifiedAt: string | null;
  phoneNumberVerifiedAt: string | null;
  password: string;
  type: string;
  employerId: string;
  bvnVerifiedAt: string | null;
  updatedAt: string;
  __v: number;
  bvnData: BvnData | null;

  constructor(data: IStaff) {
    this.id = data._id || "";
    this.fullName = data.fullName || "";
    this.publicId = data.publicId || "";
    this.createdAt = data.createdAt;
    this.phoneNumber = data.phoneNumber || "";
    this.status = data.status || "";
    this.username = data.username || "";
    this.email = data.email || "";
    this.type = data.type || "";
    this.employerId = data.employerId || "";
    this.bvnData = data.bvnData || null;
  }
   
  getFormattedDate(): string {
    const date = new Date(this.createdAt);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }

  getFullPhoneNumber(): string {
    return `+234${this.phoneNumber}`;
  }
}

export default StaffModel;
