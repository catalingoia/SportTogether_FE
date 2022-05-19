import {UserModel} from "./user.model";



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

export interface EventCardModelPost {
  sport: string
  level: string
  location: string
  price: number;
  maxPlayers: number;
  participants: UserModel[];
  createTimestamp: Date;
  updateTimestamp: Date;
  email: string;
  accepted: boolean;
  rejected: boolean
  description: string;
  contactEmail: string;
  contactPhone: string;
}
