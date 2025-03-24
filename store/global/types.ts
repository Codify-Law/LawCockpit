export type Profile = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  country: string;
};

export interface GlobalState {
  /** The user profile object or null if not logged in */
  profile: Profile | null;

  /** Function to set the current user profile */
  setProfile: (profile: GlobalState["profile"]) => void;

  /** Function to clear the current user profile */
  clearProfile: () => void;

  /** Function to sign out the user */
  signOut: () => void;
}
