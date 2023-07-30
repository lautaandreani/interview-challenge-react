import { useEffect, useMemo, useRef, useState } from 'react'
import { RootUser, SortBy, User } from './models/models'
import { Table } from './components/Table'
import { Button } from './components/Button'

const BASE_URL = 'https://randomuser.me/api'

function App() {
  const [users, setUsers] = useState<User[]>()
  const [color, setColor] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [sort, setSort] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  const originalUsers = useRef<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const users = await fetch(`${BASE_URL}/?results=100`)
        if (!users.ok) throw new Error('Error fetching users')
        const { results }: RootUser = await users.json()
        setUsers(results)
        originalUsers.current = results
      } catch (error) {
        if (error instanceof Error) {
          setError(true)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const handleDelete = (user: User) => {
    setUsers(users?.filter((us) => us.login.uuid !== user.login.uuid))
  }

  const filteredUsers = useMemo(() => {
    return typeof filterCountry === 'string'
      ? users?.filter((user) => user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
      : users
  }, [users, filterCountry])

  const sortedUser = useMemo(() => {
    if (sort === SortBy.NAME) return filteredUsers?.toSorted((a, b) => a.name.first.localeCompare(b.name.first))
    if (sort === SortBy.LAST) return filteredUsers?.toSorted((a, b) => a.name.last.localeCompare(b.name.last))
    if (sort === SortBy.COUNTRY) return filteredUsers?.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
    return filteredUsers
  }, [sort, filteredUsers])

  const toggleSortCountry = () => (sort === SortBy.COUNTRY ? setSort(SortBy.NONE) : setSort(SortBy.COUNTRY))

  if (loading) return <p>Obteniendo usuarios....</p>
  if (error) return <p>Ocurrió un error al obtener los usuarios</p>

  return (
    <>
      <h1 className='text-3xl text-white font-bold'>Tabla de usuarios</h1>
      <section className='my-4 flex items-center justify-center gap-2'>
        <Button event={() => setColor(!color)} active={color}>
          {color ? 'Restaurar color' : 'Colorear tabla'}
        </Button>
        <Button event={() => setUsers(originalUsers.current)}>Restaurar tabla</Button>
        <Button event={toggleSortCountry} active={sort}>
          {sort === SortBy.COUNTRY ? 'No ordenar por país' : 'Ordenar por país'}
        </Button>
        <input
          type='text'
          onChange={(e) => setFilterCountry(e.target.value)}
          className='bg-gray border border-[#222] p-1 rounded outline-none placeholder:text-soft_gray placeholder:text-sm'
          placeholder='Argentina'
        />
      </section>
      {users && users?.length > 1 ? (
        <Table users={sortedUser} color={color} handleDelete={handleDelete} setSort={setSort} />
      ) : (
        'No hay usuarios'
      )}
    </>
  )
}

export default App
