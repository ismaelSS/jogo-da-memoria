'use client'
import { gameModeOptions, tGameModesOption } from "@/data/gamemodes";
import { useState } from "react";

interface iChangeGameMode {
  actualMode:tGameModesOption
  changeGameModeFunction: (mode: tGameModesOption) => void
}

export default function ChangeGameMode({actualMode, changeGameModeFunction}:iChangeGameMode) {
  const [isExpanded, setIsExpanded] = useState(true)

  const expand = () => {
    if(isExpanded == false ){
      setIsExpanded(true)
    }
  }

  return(
    <div className={`z-20 bg-sky-500 rounded-sm overflow-hidden items-center justify-center pl-2 pr-2 ${isExpanded && 'pr-6 pb-2'}`} onClick={() => expand()}>
      
      {
        isExpanded ?
          <>
            <button onClick={() => setIsExpanded(false)} className="absolute top-1 right-2">X</button>
            <div className="flex flex-col gap-2 pt-6">
              {gameModeOptions.map((mode, index) => (
                <span key={index} className="flex gap-1 items-center">
                  <div 
                    className={`cursor-pointer w-4 h-4 rounded-sm border-2 border-white ${actualMode === mode && 'bg-white'}`}
                    onClick={() => changeGameModeFunction(mode)}
                  /> 
                  {mode}
                </span>
              ))}
            </div>
          </>
        :
          <>
            <p className="cursor-pointer">Modos de jogo</p>
          </>
      }
    </div>
  )
}