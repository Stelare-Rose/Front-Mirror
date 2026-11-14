// To parse this data:
//
//   import { Convert, Products } from "./file";
//
//   const products = Convert.toProducts(json);

export interface Products {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: Gender;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: Crypto;
  role: Role;
}

export interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: Country;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export type Country = "United States";

export interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

export interface Company {
  department: string;
  name: string;
  title: string;
  address: Address;
}

export interface Crypto {
  coin: Coin;
  wallet: Wallet;
  network: Network;
}

export type Coin = "Bitcoin";

export type Network = "Ethereum (ERC20)";

export type Wallet = "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a";

export type Gender = "female" | "male";

export interface Hair {
  color: string;
  type: Type;
}

export type Type = "Curly" | "Straight" | "Wavy" | "Kinky";

export type Role = "admin" | "moderator" | "user";

// Converts JSON strings to/from your types
export class Convert {
  public static toProducts(json: string): Products {
    return JSON.parse(json);
  }

  public static productsToJson(value: Products): string {
    return JSON.stringify(value);
  }
}
