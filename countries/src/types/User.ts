interface Name {
  title: string;
  first: string;
  last: string;
}

interface Street {
  number: number,
  name: string;
}

interface LatLng {
  latitude: string;
  longitude: string;
}

interface TimeZone { 
  offset: string;
  description: string;
}

interface Location {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: number;
  coordinates: LatLng;
  timezone: TimeZone;
}

interface Login {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

interface CreatedAt {
  date: string;
  age: number
}

interface UserId {
  name: string;
  value: string | null;
}

interface ProfilePicture {
  large: string;
  medium: string;
  thumbnail: string;
}



export default interface User {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  login: Login;
  dob: CreatedAt;
  registered: CreatedAt;
  phone: string;
  cell: string;
  id: UserId;
  picture: ProfilePicture;
  nat: string;
}