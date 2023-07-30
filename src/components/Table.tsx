import { SortBy, User } from '../models/models'

interface Props {
  users: User[] | undefined
  color: boolean | null
  handleDelete: (user: User) => void
  setSort: React.Dispatch<React.SetStateAction<SortBy>>
}

export function Table({ users, color, handleDelete, setSort }: Props) {
  return (
    <table className='w-10/12 my-4 mx-auto rounded'>
      <thead className='flex justify-around w-full rounded py-2'>
        <tr>
          <th>Foto</th>
        </tr>
        <tr>
          <th onClick={() => setSort(SortBy.NAME)} className='cursor-pointer'>
            Nombre
          </th>
        </tr>
        <tr>
          <th onClick={() => setSort(SortBy.LAST)} className='cursor-pointer'>
            Apellido
          </th>
        </tr>
        <tr>
          <th onClick={() => setSort(SortBy.COUNTRY)} className='cursor-pointer'>
            País
          </th>
        </tr>
        <tr>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr
            key={user.login.uuid}
            className={`flex justify-around items-center min-h-[3rem] py-1 odd:border-y odd:border-y-[#1a1a1a] rounded ${
              color ? 'odd:bg-gray even:bg-[#181818]' : ''
            }`}
          >
            <td className='w-fit'>
              <img
                src={user.picture.thumbnail}
                alt={user.name.first}
                className='min-w-[32px] max-w-[32px] min-h-[32px] object-cover rounded-full'
              />
            </td>
            <td className='text-left w-[3.5rem] whitespace-nowrap'>{user.name.first}</td>
            <td className='text-left w-[3.5rem] whitespace-nowrap'>{user.name.last}</td>
            <td className='text-left w-[3.5rem] whitespace-nowrap'>{user.location.country}</td>
            <td className='text-left w-[3.5rem] whitespace-nowrap'>
              <button
                className='bg-brand dark:text-white py-3 px-5 rounded text-xs tracking-wide hover:bg-red-500 transition'
                onClick={() => handleDelete(user)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
