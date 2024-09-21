export interface Admin {
  publicId: string;
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string;
  emailVerifiedAt: string | null;
  phoneNumberVerifiedAt: string | null;
  createdAt: Date;
}


export interface Merchant {
  publicId: string;
  fullName: string;
  storeName: string;
  email: string;
  phoneNumber: string;
  address: string;
  createdAt: Date;
}

interface Staff {
  publicId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  bvn: string;
}

export class AdminModel {
  publicId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  createdAt: Date;

  constructor(data: Admin) {
    this.publicId = data.publicId;
    this.fullName = data.fullName;
    this.email = data.email;
    this.phoneNumber = data.phoneNumber;
    this.createdAt = data.createdAt;
  }
}

export interface Employer {
  publicId: string;
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string;
  emailVerifiedAt: string | null;
  phoneNumberVerifiedAt: string | null;
  type: string;
  organizationName: string;
  address: string;
  contact: string;
}

export class EmployerModel {
  publicId: string;
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string;
  emailVerifiedAt: string | null;
  phoneNumberVerifiedAt: string | null;
  type: string;
  organizationName: string;
  address: string;
  contact: string;

  constructor(data: Employer) {
    this.publicId = data.publicId;
    this.fullName = data.fullName;
    this.username = data.username;
    this.email = data.email;
    this.phoneNumber = data.phoneNumber;
    this.emailVerifiedAt = data.emailVerifiedAt;
    this.phoneNumberVerifiedAt = data.phoneNumberVerifiedAt;
    this.type = data.type;
    this.organizationName = data.organizationName;
    this.address = data.address;
    this.contact = data.contact;
  }
}


export class MerchantModel {
  publicId: string;
  fullName: string;
  storeName: string;
  email: string;
  phoneNumber: string;
  address: string;
  createdAt: Date;

  constructor(data: Merchant) {
    this.publicId = data.publicId;
    this.fullName = data.fullName;
    this.storeName = data.storeName;
    this.email = data.email;
    this.phoneNumber = data.phoneNumber;
    this.address = data.address;
    this.createdAt = data.createdAt;
  }
}

class StaffModel {
  publicId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  bvn: string;

  constructor(data: Staff) {
    this.publicId = data.publicId;
    this.fullName = data.fullName;
    this.email = data.email;
    this.phoneNumber = data.phoneNumber;
    this.bvn = data.bvn;
  }
}

// export default { AdminModel, MerchantModel, EmployerModel };
