import { UserState } from "./user.reducer";
import { CartState } from "./cart.reducer";

export interface RootState {
  user: UserState;
  cart: CartState;
}
