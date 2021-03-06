export const cookieParser = (cookieString?: string) => {
  const cookies: { [key: string]: string } = {};

  if (cookieString) {
    const items = cookieString?.split(/\s*;\s*/);
    items.forEach((pairs) => {
      const [key, value] = pairs.split(/\s*=\s*/);
      cookies[key] = value;
    });
  }

  return cookies;
};

export const getNumber = (string: string) => {
  const numbers = string.match(/\d/g)?.join("");

  if (numbers) return Number(numbers);

  return null;
};
