export interface CarVersion {
  version: string;
  price: number;
  transmission: string;
  traction: string;
}

export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  type: 'sedan' | 'suv' | 'pickup' | 'hatchback' | 'minivan' | 'wagon';
  fuel: 'gasolina' | 'diesel' | 'electrico' | 'hibrido' | 'hibrido_enchufable';
  seats: number;
  price: number;
  transmission: 'manual' | 'automatica';
  traction: '4x2' | '4x4' | 'awd';
  image_url: string;
  description: string;
  origin: string;
  versions: CarVersion[];
}

export interface Filters {
  brand: string[];
  type: string[];
  fuel: string[];
  seats: number[];
  priceRange: [number, number];
  transmission: string[];
  traction: string[];
}

export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export interface DocumentVersion {
  id: number;
  document_type: 'privacy_policy' | 'responsibility_declaration';
  version: string;
  content: string;
  hash_sha256: string;
  effective_date: string;
  is_active: boolean;
}

export interface DocumentSignature {
  id: number;
  user_id: string;
  document_type: string;
  document_version: string;
  signature_hash: string;
  signed_at: string;
  ip_address: string;
}

export interface Favorite {
  id: number;
  user_id: string;
  car_id: number;
  created_at: string;
}
