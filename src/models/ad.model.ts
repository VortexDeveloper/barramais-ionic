export class AdModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  photo: string;
  photo_url: string;
  area: number;

  constructor(public params?:any){
    params = params || {}
    this.id = params.id || null;
    this.createdAt = params.createdAt || "";
    this.updatedAt = params.updatedAt || "";
    this.description = params.description || "";
    this.photo = params.photo || "";
    this.photo_url = params.photo_url || "";
    this.area = params.area || null;
  }
}
