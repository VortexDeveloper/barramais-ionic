export class AdvertiserModel{
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  document_type: number;
  document_number: string;
  email: string;
  website: string;
  facebook: string;
  instagram: string;

  constructor(public params?:any){
    params = params || {}
    this.id = params.id || null;
    this.createdAt = params.created_at || "";
    this.updatedAt = params.updated_at || 0;
    this.name = params.name || "";
    this.document_type = params.document_type || 0;
    this.document_number = params.document_number || "";
    this.email = params.email || "";
    this.website = params.website || "";
    this.facebook = params.facebook || "";
    this.instagram = params.instagram || "";
  }
}
