import { AdvertiserModel } from "./advertiser.model";

export class UserModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  //Account informartion
  avatar: string;
  cover_photo: string;
  avatar_url: string;
  cover_photo_url: string;
  email: string;
  password: string;
  password_confirmation: string;
  current_password: string;
  first_name: string;
  last_name: string;
  nickname: string;

  //Personal information
  sex: string;
  birthday: Date;
  cellphone: string;
  about: string;
  academic_profile: string;
  work: string;

  //Nautical Information
  nautical_professional: boolean;
  relationship: number;
  has_embarcation: number;
  nautical_profession_description: string;
  naval_service: number;
  naval_service_patent: number;
  advertiser: AdvertiserModel;
  nautical_license: number;
  has_nautical_license: number;
  nautical_tour: boolean;
  fishing: boolean;
  own_vessels: Array<any>;
  own_vessels_id: Array<any>;

  constructor(public params?:any) {
    params = params || {}
    this.id = params.id || null;
    this.createdAt = params.created_at || "";
    this.updatedAt = params.updated_at || 0;
    this.avatar = params.avatar || null;
    this.cover_photo = params.cover_photo || null;
    this.avatar_url = params.avatar_url || "";
    this.cover_photo_url = params.cover_photo_url || "";
    this.email = params.email || null;
    this.first_name = params.first_name || null;
    this.last_name = params.last_name || null;
    this.nickname = params.nickname || null;
    this.sex = params.sex || null;
    this.birthday = params.birthday || null;
    this.cellphone = params.cellphone || "";
    this.about = params.about || "";
    this.academic_profile = params.academic_profile || "";
    this.relationship = params.relationship || 0;
    this.has_embarcation = params.has_embarcation || false;
    this.nautical_professional = params.nautical_professional || false;
    this.nautical_profession_description = params.nautical_profession_description || "";
    this.naval_service = params.naval_service || false;
    this.naval_service_patent = params.naval_service_patent || 0;
    this.advertiser = params.advertiser || null;
    this.nautical_license = params.nautical_license || 0;
    this.has_nautical_license = params.has_nautical_license || false;
    this.work = params.work || "";
    this.nautical_tour = params.nautical_tour || false;
    this.fishing = params.fishing || false;
    this.own_vessels = params.own_vessels || [];
    this.own_vessels_id = [];

    for (let i = 0; i < this.own_vessels.length; i++) {
      this.own_vessels_id.push(this.own_vessels[i].id);
    }
  }
}
