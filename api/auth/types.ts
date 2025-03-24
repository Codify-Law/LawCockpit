export type SignInResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

export type SignInRequest = {
  username: string;
  password: string;
};

export type ProfileResponse = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  country: string;
};
