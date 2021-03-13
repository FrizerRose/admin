import CompanyPreferences from './companyPreferences';
import Payment from './payment';

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
  payments: Payment[];
};

export default Company;
