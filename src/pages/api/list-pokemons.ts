export default async function handler(req: any, res: any) {
  const result = await fetch("https://pokeapi.co/api/v2/pokemon/")

  res.status(200).json(await result.json())
}
