export class EventModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  //Event informartion
  user_id: number;
  name: string;
  event_date: Date;
  address_id: number;

  constructor(public params?:any) {
    params = params || {}
    this.id = params.id || null;
    this.createdAt = params.created_at || "";
    this.updatedAt = params.updated_at || 0;

    this.user_id = params.user_id || 0;
    this.address_id = params.address_id || 0;
    this.event_date = params.event_date || 0;
    this.name = params.name || null;

  }
}
