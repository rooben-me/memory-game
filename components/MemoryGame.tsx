import React, { useState, useEffect } from "react";
import styles from "./MemoryGame.module.css";

const emojis = ["🎨", "🚀", "🌈", "🍕", "🎸", "🌺", "🐱", "🦄"];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
}

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji, isFlipped: false }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setIsWin(false);
  };

  const flipCard = (id: number) => {
    if (flippedCards.length < 2) {
      const newCards = cards.map((card) =>
        card.id === id ? { ...card, isFlipped: true } : card
      );
      setCards(newCards);
      const flippedCard = newCards.find((card) => card.id === id);
      if (flippedCard) {
        setFlippedCards([...flippedCards, flippedCard]);
      }

      if (flippedCards.length === 1) {
        setTimeout(checkMatch, 1000);
      }
    }
  };

  const checkMatch = () => {
    const [card1, card2] = flippedCards;
    if (card1 && card2) {
      if (card1.emoji === card2.emoji) {
        setMatchedPairs((prev) => prev + 1);
        if (matchedPairs + 1 === emojis.length) {
          setIsWin(true);
        }
      } else {
        const newCards = cards.map((card) =>
          card.id === card1.id || card.id === card2.id
            ? { ...card, isFlipped: false }
            : card
        );
        setCards(newCards);
      }
    }
    setFlippedCards([]);
  };

  return (
    <div className={styles.gameContainer}>
      <h1 className={styles.gameTitle}>Emoji Memory</h1>
      <div className={styles.gameBoard}>
        {cards.map((card) => (
          <div
            key={card.id}
            className={`${styles.card} ${card.isFlipped ? styles.flipped : ""}`}
            onClick={() => !card.isFlipped && flipCard(card.id)}
          >
            <div className={`${styles.cardFace} ${styles.cardFront}`}>
              {card.emoji}
            </div>
            <div className={`${styles.cardFace} ${styles.cardBack}`}></div>
          </div>
        ))}
      </div>
      <button className={styles.restartButton} onClick={initializeGame}>
        Restart Game
      </button>
      {isWin && (
        <div className={styles.winMessage}>Congratulations! You won! ✨</div>
      )}
    </div>
  );
};

export default MemoryGame;
