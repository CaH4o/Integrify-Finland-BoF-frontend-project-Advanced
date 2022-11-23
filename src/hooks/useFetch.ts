export async function useFetch<Type>(url: string): Promise<Type> {
  return await fetch(url)
    .then((res) => res.json())
    .then((data: Type) => data)
}
