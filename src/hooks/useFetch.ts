export async function useFetch<Type>(url: string): Promise<Type> {
  return await fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log(res);
        throw new Error(res.status + " " + res.statusText);
      }
    })
    .then((data: Type) => data)
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });
}
