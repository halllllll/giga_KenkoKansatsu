export const devFetch = async <T>(url: string): Promise<T> => {
  return await fetch(url).then(async (res) => {
    if (!res.ok) {
      throw new Error(`oh! fetching error occured from ${url}`);
    }

    return await (res.json() as Promise<T>);
  });
};
