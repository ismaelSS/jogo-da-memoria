import { iCardContent } from "@/app/page";
import "./styles.css";
import Image from "next/image";
import fundoCarta from '@/app/assets/images/cardback.png'
import CardContent from "../cardContent";

interface iCardFlip{
  content:iCardContent
  isFlipped:boolean
  clickFunction: (content:iCardContent) => void
  contentNumber:number
  inDisassembleList: boolean
}

export default function CardFlip({isFlipped, content, clickFunction, inDisassembleList}:iCardFlip) {
  

  return (
    <div className="flex flex-col gap-6 items-center cursor-pointer">
      <div
        className="perspective w-20 h-[7.73rem] relative "
        onClick={() => clickFunction(content)}
      >
        <div className={`square-item ${isFlipped ? "flipped" : ""}`}>
          <div className="square-side rounded-sm bg-blue-600 front flex items-center justify-center overflow-hidden">
            <Image
              alt='fundo de carta'
              src={fundoCarta}
              height={123}
              width={80}
              className="h-full "
            />
          </div>

            <div className="square-side rounded-sm bg-white back flex items-center justify-center">
              {(inDisassembleList || isFlipped)&& 
                <CardContent content={content.emoji}/>
              }
            </div>
        </div>
      </div>
    </div>
  );
}
