export class UserModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  //Account informartion
  avatar: string;
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

  constructor(public params?:any) {
    if(params) {
      this.id = params.id || null;
      this.createdAt = params.created_at || "";
      this.updatedAt = params.updated_at || 0;
      this.avatar = params.avatar || null;
      this.email = params.email || null;
      this.first_name = params.first_name || null;
      this.last_name = params.last_name || null;
      this.sex = params.sex || null;
      this.birthday = params.birthday || null;
      this.cellphone = params.cellphone || "";
      this.about = params.about || "";
      this.academic_profile = params.academic_profile || "";
      this.nautical_professional = params.nautical_professional || false;
      this.relationship = params.relationship || 0;
      this.has_embarcation = params.has_embarcation || false;
      this.nautical_work = params.nautical_work || "";
      this.naval_service = params.naval_service || "";
    }
  }
}
