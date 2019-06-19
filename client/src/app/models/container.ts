export interface Container {
  id: string;
  names: string[];
  image: string;
  ports: Port[];
  state: string;
  status: string;
}

export interface Port {
  IP: string;
  PrivatePort: number;
  PublicPort: number;
  Type: string;
}
