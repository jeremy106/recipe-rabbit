import '../styles/App.css'
import { getRecipes } from '../api/recipes'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
  const { data, isPending, isError } = useQuery({
    queryKey: ['recipes'],
    queryFn: () => getRecipes(),
  })

  if (isPending) {
    return <p>Loading</p>
  }

  if (isError) {
    return <p>Error</p>
  }

  console.log(data)

  return (
    <>
      <h1>Recipe Rabbit</h1>
      <p>{data.body[0].name}</p>
    </>
  )
}
