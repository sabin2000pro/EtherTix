import { Cookies } from "react-cookie";
import { CartItem } from "models/cart";

const cookies = new Cookies();

class Cookie {
  public set(name: string, value: any) {
    cookies.set(name, value, { path: "/", httpOnly: false, sameSite: true, secure: true });
  }

  public setCartContent(cartItems: CartItem[]) {
    const serializedCartItems = cartItems.map(item => JSON.stringify(item));
    const cartContent = JSON.stringify(serializedCartItems);
    cookies.set("cartContent", cartContent, { path: "/", httpOnly: false, sameSite: true, secure: true });
  }

  public getCartContent(): CartItem[] {
    const cartContent = cookies.get("cartContent");
    if (cartContent) {
      const serializedCartItems = JSON.parse(cartContent);
      return serializedCartItems.map((item: any) => JSON.parse(item));
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
