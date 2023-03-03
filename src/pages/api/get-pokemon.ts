export default async function handler(req: any, res: any) {
  console.log('req: ', req)
  const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${req.params.name}`)

  res.status(200).json(await result.json())
}
