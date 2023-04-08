import { Cookies } from "react-cookie";
import { CartItem } from "models/cart";

export const COOKIE_NAME_CART = "sessionCart";

const cookies = new Cookies();

class Cookie {
  public set(name: string, value: any) {
    cookies.set(name, value, {
      path: "/",
      httpOnly: false,
      sameSite: true,
      secure: true,
    });
  }

  public setCartContent(cartItems: CartItem[]) {
    const cartContent = JSON.stringify(cartItems);
    cookies.set(COOKIE_NAME_CART, cartContent, {
      path: "/",
      httpOnly: false,
      sameSite: true,
      secure: true,
    });
  }

  public getCartContent(): CartItem[] {
    const cartContent = cookies.get(COOKIE_NAME_CART);
    if (cartContent) {
      const serializedCartItems = cartContent;
      return serializedCartItems;
    }
    return [];
  }

  public get(name: string) {
    return cookies.get(name);
  }

  public remove(name: string) {
    cookies.remove(name, { path: "/" });
  }
}

export default new Cookie();
