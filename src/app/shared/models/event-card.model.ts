

export interface EventCardModel {
  isJoined: boolean;
  id: string
  sport: string
  level: string
  location: string;
  price: number;
  maxPlayers: number;
  participants: any;
  time: string;
  date: string;
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
