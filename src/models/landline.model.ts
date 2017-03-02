export class LandlineModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  number: string;
  advertiser_id: number;

  constructor(public params?:any){
    params = params || {}
    this.id = params.id || null;
    this.createdAt = params.created_at || "";
    this.updatedAt = params.updated_at || 0;
    this.number = params.number || "";
    this.advertiser_id = params.advertiser_id || null;
  }
}
