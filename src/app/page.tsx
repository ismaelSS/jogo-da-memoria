'use client'
import ButtonReset from "@/components/buttonReset";
import CardFlip from "@/components/card";
import ChangeGameMode from "@/components/changeGameMode";
import ConfettiCanvas from "@/components/confetti";
import { gameModes, tGameModesOption } from "@/data/gamemodes";
import { getRandomEmojis } from "@/utils/functions";
import { transform } from "next/dist/build/swc";
import { useEffect, useState } from "react";

export interface iCardContent {
  emoji: string;
  index: number;
  top: number;
  left: number;
}

export default function Home() {
  const [findCards, setFindCards] = useState<string[]>([]);
  const [cardsCompare, setCardsCompare] = useState<iCardContent[]>([]);
  const [contentList, setContentList] = useState<iCardContent[]>([]);
  const [gameMode, setGameMode] = useState<tGameModesOption>('normal');
  const [isLockedFlip, setIsLockedFlip] = useState(false);
  const [isWin, setIsWind] = useState(false);
  const [reset, setReset] = useState(false);
  const [itensPerScreen, setItensPerScreen] = useState(5);
  const [containerCardsWidth, setContainerCardsWidth] = useState(450)
  const [flipcount, setFlipCount] = useState(0)

  const calculateItensPerScreen = (width: number) => {
    let itensQuantity = Math.round(width / 105)
    if (itensQuantity >= 10) itensQuantity=10;
    return itensQuantity
  };

  useEffect(() => {
    const handleResize = () => {
      setItensPerScreen(calculateItensPerScreen(window.innerWidth));
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isWin) setIsWind(false);
    const initialContentList = getRandomEmojis(gameModes[gameMode].cardNumber).map((content, index) => ({
      ...content,
      top: Math.floor(index / itensPerScreen) * 135,
      left: (index % itensPerScreen) * 90,
    }));
    setContentList(initialContentList);
    setContainerCardsWidth(itensPerScreen * 90)
    console.log(containerCardsWidth);
    
  }, [reset, gameMode, itensPerScreen]);

  useEffect(() => { 
    if (gameModes[gameMode].movement) {
      const interval = setInterval(() => {
        setContentList((prevContentList) => {
          const newContentList = [...prevContentList];

          const index1 = Math.floor(Math.random() * newContentList.length);
          let index2 = Math.floor(Math.random() * newContentList.length);
          while (index1 === index2) {
            index2 = Math.floor(Math.random() * newContentList.length);
          }

          const tempTop = newContentList[index1].top;
          const tempLeft = newContentList[index1].left;
          newContentList[index1].top = newContentList[index2].top;
          newContentList[index1].left = newContentList[index2].left;
          newContentList[index2].top = tempTop;
          newContentList[index2].left = tempLeft;

          return newContentList;
        });
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [contentList]);

  const resetGame = () => {
    setFindCards([]);
    setCardsCompare([]);
    setIsLockedFlip(false);
    setFlipCount(0)
    setTimeout(() => {
      setReset(!reset);
    }, 600);
  };

  const changeModeFunction = (mode: tGameModesOption) => {
    setGameMode(mode);
    resetGame()
  };

  const WinCheck = () => {
    if (findCards.length + 1 === gameModes[gameMode].cardNumber) {
      setIsWind(true);
    }
  };

  const compareCardsfunction = (content: iCardContent) => {
    if (cardsCompare.length === 0) {
      setFlipCount(flipcount + 1)
      setCardsCompare([content]);
    } else if (cardsCompare.length === 1) {
      setFlipCount(flipcount + 1)
      if (cardsCompare[0] === content) return;
      const newCardsCompare = [...cardsCompare, content];
      setCardsCompare(newCardsCompare);
      setIsLockedFlip(true);
      setTimeout(() => {
        if (newCardsCompare[0].emoji === newCardsCompare[1].emoji) {
          setFindCards([...findCards, content.emoji]);
          WinCheck();
        }
        setCardsCompare([]);
        setIsLockedFlip(false);
      }, 900);
    }
  };

  return (
    <>
      <main className="flex w-[100vw] max-w-[900px] h-screen">
        <div className="fixed top-4 right-4 flex flex-col gap-5 items-end z-20">
          <ChangeGameMode actualMode={gameMode} changeGameModeFunction={changeModeFunction} />
          <span className="font-bold text-2xl">{flipcount}</span>
        </div>
        
        
        <div className={`scale-95 relative top-2 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8`}>

            {contentList.map((content, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: content.top,
                  left: content.left,
                  transition: 'top 1.5s ease, left 1.5s ease',
                }}
              >
                <CardFlip
                  clickFunction={compareCardsfunction}
                  contentNumber={content.index}
                  isFlipped={cardsCompare.includes(content) || findCards.includes(content.emoji)}
                  content={content}
                />
              </div>
            ))}

        </div>
      </main>

      {isWin && <ConfettiCanvas />}
      {isWin && <ButtonReset onClick={resetGame} />}
    </>
  );
}
