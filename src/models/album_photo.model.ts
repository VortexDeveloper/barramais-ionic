export class AlbumPhotoModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  user_id: number;
  photo: string;
  photo_url: string;

  constructor(public params?:any){
    params = params || {}
    this.id = params.id || null;
    this.createdAt = params.createdAt || "";
    this.updatedAt = params.updatedAt || "";
    this.user_id = params.user_id || 0;
    this.photo = params.photo || "";
    this.photo_url = params.photo_url || "";
  }
}
