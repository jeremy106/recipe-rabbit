
interface RemoveButtonProps {
  onClick: () => void,
}

function RemoveButton({onClick}: RemoveButtonProps){
  return (
    <button type="button" onClick={onClick} className="remove-button">
      <span className="material-symbols-outlined">delete</span>
    </button>
  )
}

export default RemoveButton