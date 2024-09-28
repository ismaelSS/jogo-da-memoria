export default function ButtonReset({onClick}: {onClick: () => void}){
  return(
    <button className="w-24 h-10 bg-orange-500 z-30 absolute top-1/2 bottom-1/2 rounded-sm tex" onClick={onClick}>
      Reiniciar
    </button>
  )
}