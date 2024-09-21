interface User {
  publicId: string;
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string;
  emailVerifiedAt: string | null;
  phoneNumberVerifiedAt: string | null;
  type: string;
  createdAt: string;
}

interface Profile {
  userId: string;
  organizationName: string;
  address: string;
  contact: string;
}

export interface Employer {
  user: User;
  profile: Profile;
}
