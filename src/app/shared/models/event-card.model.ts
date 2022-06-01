import {UserModel} from "./user.model";

export interface Product {
  id?:string;
  code?:string;
  name?:string;
  description?:string;
  price?:number;
  quantity?:number;
  inventoryStatus?:string;
  category?:string;
  image?:string;
  rating?:number;
}

export interface EventCardModel {
  isJoined: boolean;
  id: string
  sport: string
  level: string
  location: string;
  price: number;
  maxPlayers: number;
  participants: any;
  createTimestamp: Date;
  updateTimestamp: Date;
  email: string;
  firstName: string;
  lastName: string;
  accepted: boolean;
  rejected: boolean;
  description: string;
  contactEmail: string;
  contactPhone: string;

}

export interface EventPostModel {
  sport: string
  level: string
  contactPhone: string;
  contactEmail: string;
  maxPlayers: number;
  price: number;
  description: string;
  date: string;
  time: string;
  location: string
  }
