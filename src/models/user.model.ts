export class UserModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  //Account informartion
  email: string;
  password: string;
  password_confirmation: string;
  first_name: string;
  last_name: string;

  //Personal information
  sex: string;
  birthday: Date;
  cellphone: string;
  about: string;
  academic_profile: string;

  //Nautical Information
  nautical_professional: number;
  relationship: number;
  has_embarcation: number;
  nautical_work: string;
  naval_service: string;

}
