export class GroupModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  //Group informartion
  user_id: integer;
  name: string;
  about: string;

  constructor(public params?:any) {
    params = params || {}
    this.id = params.id || null;
    this.createdAt = params.created_at || "";
    this.updatedAt = params.updated_at || 0;

    this.user_id = params.user_id || 0;
    this.name = params.name || null;
    this.about = params.about || null;

  }
}
