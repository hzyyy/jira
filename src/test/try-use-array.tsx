import { useArray, useMount } from 'utils/index'

export const TryUseArray = () => {
  interface P {
    name: string;
    age: number;
  }

  const persons: P[] = [
    { name: 'jack', age: 25 }
  ]

  const { value, clear, removeIndex, add } = useArray(persons)

  
  useMount(() => {
    // console.log(value.abc)

    // console.log(add({ name: 'simon2' }))

    // removeIndex("123")
  });
  
  return (
    <div>
      <button onClick={() => add({ name: 'simon', age: 22 })}>add user</button>
      <button onClick={() => removeIndex(0)}>删除第一行</button>
      <button onClick={() => clear()}>清空</button>
      {
        value.map((person, index) => 
          <div key={index}>
            <span>{index}&nbsp;</span>
            <span>{person.name}&nbsp;</span>
            <span>{person.age}&nbsp;</span>
          </div>
        )
      }
    </div>
  )
}