export class PhoneModel {
  type: number;
  number: string;

  constructor(public params?:any) {
    params = params || {}
    this.type = params.type || 0;
    this.number = params.number || "";
  }
}
