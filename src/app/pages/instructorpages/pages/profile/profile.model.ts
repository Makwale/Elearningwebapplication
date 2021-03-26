export class ProfileModel {
  id:string;
  email:string;
  firstname: string;
  lastname: string;
  gender: string;
  phone: string;
  imageURL: string;
  boi: string;
  address: string;

  constructor(
  _id:string,  _e:string,_fn:string,  _ln:string,
  _g:string,  _ph:string,_img:string,  _boi:string,
  _ad:string){
    this.id = _id;
    this.email = _e;
    this.firstname = _fn;
    this.lastname = _ln;
    this.gender = _g;
    this.phone = _ph;
    this.imageURL = _img;
    this.boi = _boi;
    this.address = _ad;
  }
}
