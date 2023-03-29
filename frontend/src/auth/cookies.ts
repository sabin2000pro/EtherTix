import { Cookies } from "react-cookie";

const cookies = new Cookies();

class Cookie {
  public set(name: string, value: any) {
    cookies.set(name, value, { path: "/", httpOnly: false, sameSite: true });
  }

  public get(name: string) {
    return cookies.get(name);
  }

  public remove(name: string) {
    cookies.remove(name, { path: "/" });
  }
}

export default new Cookie();
