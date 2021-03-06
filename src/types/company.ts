import CompanyPreferences from './companyPreferences';

type Company = {
  id: number;
  name: string;
  bookingPageSlug: string;
  about: string;
  contactEmail: string;
  phoneNumber: string;
  city: string;
  streetName: string;
  isPublic: boolean;
  companyPreferences: CompanyPreferences;
};

export default Company;
