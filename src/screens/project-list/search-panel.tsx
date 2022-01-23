export interface Users {
  id: string; 
  name: string;
  personId: string;
}

export interface Project {
  id: string;
  name: string;
  personId: string;
  // organization: string;
  // created: number;
}

interface SearchPanelProps {
  users: Users[],
  param: { name: string, personId: string },
  setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return <form>
    <div>
      <input type="text" value={param.name} onChange={ event => setParam({
        ...param,
        name: event.target.value
      })} />

      <select value={param.personId} onChange={ event => setParam({
        ...param,
        personId: event.target.value
      })}>
        <option value={''}>负责人</option>
        {
          users.map( user => <option key={user.id} value={user.id}>{user.name}</option>)
        }
      </select>
    </div>
  </form>
}