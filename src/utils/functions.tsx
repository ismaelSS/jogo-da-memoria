import { emojis } from "@/data/emojis";


export function getRandomEmojis(unitsNumber: number): { emoji: string, index: number }[] {
  let selectedNumber = unitsNumber

  if (unitsNumber > emojis.length) {
    selectedNumber = emojis.length
  }
  if(unitsNumber < 2) {
    selectedNumber = 2
  }
  const shuffledEmojis = [...emojis].sort(() => 0.5 - Math.random());
  
  const selectedEmojis = shuffledEmojis.slice(0, selectedNumber);
  
  const duplicatedEmojis = [...selectedEmojis, ...selectedEmojis];
  
  const shuffledDuplicatedEmojis = duplicatedEmojis.sort(() => 0.5 - Math.random());

  return shuffledDuplicatedEmojis.map((emoji, index) => ({ emoji, index }));
}
