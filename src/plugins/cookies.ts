export const Cookies = {
  get(name: string): string | undefined {
    const regex = new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)");
    const matches = document.cookie.match(regex);
    return matches ? decodeURIComponent(matches[1]) : undefined;
  },

  set(name: string, value: string, expireHours: number) {
    const hour = expireHours * 1000 * 3600
    const expireDate = new Date(Date.now() + hour).toUTCString();

    const options: Record<string, any> = {
      path: "/",
      secure: false,
      expires: expireDate,
    };

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let key in options) {
      updatedCookie += "; " + key;
      let option = options[key];
      if (option !== true) {
        updatedCookie += "=" + option;
      }
    }

    document.cookie = updatedCookie;
  },

  remove(name: string) {
    this.set(name, "", -1)
  },
}