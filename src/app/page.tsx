'use client'
import ButtonReset from "@/components/buttonReset";
import CardFlip from "@/components/card";
import ChangeGameMode from "@/components/changeGameMode";
import ConfettiCanvas from "@/components/confetti";
import { gameModes, tGameModesOption } from "@/data/gamemodes";
import { getRandomEmojis } from "@/utils/functions";
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

  const calculateItensPerScreen = (width: number) => {
    return Math.round(width / 97);
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
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [contentList]);

  const resetGame = () => {
    setFindCards([]);
    setCardsCompare([]);
    setIsLockedFlip(false);
    setTimeout(() => {
      setReset(!reset);
    }, 600);
  };

  const changeModeFunction = (mode: tGameModesOption) => {
    setGameMode(mode);
  };

  const WinCheck = () => {
    if (findCards.length + 1 === gameModes[gameMode].cardNumber) {
      setIsWind(true);
    }
  };

  const compareCardsfunction = (content: iCardContent) => {
    if (cardsCompare.length === 0) {
      setCardsCompare([content]);
    } else if (cardsCompare.length === 1) {
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
      }, 800);
    }
  };

  return (
    <>
      <main className="flex flex-col items-center justify-center w-[100vw] max-w-[1480px] h-screen relative">
        <ChangeGameMode actualMode={gameMode} changeGameModeFunction={changeModeFunction} />
        
        <div className="absolute top-2 left-2 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 ">
          <div className="relative">
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
        </div>
      </main>

      {isWin && <ConfettiCanvas />}
      {isWin && <ButtonReset onClick={resetGame} />}
    </>
  );
}
