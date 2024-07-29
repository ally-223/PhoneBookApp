

const Note = ({ id, name, num, deleteItem }) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <li>{name}: {num}</li>
          </div>
        <div>
        <button onClick={() => deleteItem(id)}>delete</button>
        </div>
        </div>
      
    )
  }
  
  export default Note
  