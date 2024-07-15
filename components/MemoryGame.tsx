import React, { useState, useEffect } from "react";
import styles from "./MemoryGame.module.css";
import Brand from "./Brand";

// Array of emoji characters used in the game
const emojis = ["🌈", "🌺", "🎨", "🚀", "🍕", "🎸", "🐱", "🦄"];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame: React.FC = () => {
  // State to store all cards
  const [cards, setCards] = useState<Card[]>([]);
  // State to keep track of currently flipped cards
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  // State to count matched pairs
  const [matchedPairs, setMatchedPairs] = useState(0);
  // State to determine if the game is won
  const [isWin, setIsWin] = useState(false);

  // Initialize the game when the component mounts
  useEffect(() => {
    initializeGame();
  }, []);

  // Function to initialize or restart the game
  const initializeGame = () => {
    // Create a shuffled array of cards with duplicates
    const shuffledCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setIsWin(false);
  };

  // Function to handle card flipping
  const flipCard = (id: number) => {
    // Check if the card can be flipped
    if (
      flippedCards.length < 2 &&
      !cards[id].isFlipped &&
      !cards[id].isMatched
    ) {
      setFlippedCards([...flippedCards, id]);
      setCards(
        cards.map((card) =>
          card.id === id ? { ...card, isFlipped: true } : card
        )
      );
    }
  };

  // Effect to check for matches when two cards are flipped
  useEffect(() => {
    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }, [flippedCards]);

  // Function to check if flipped cards match
  const checkMatch = () => {
    const [firstId, secondId] = flippedCards;
    if (cards[firstId].emoji === cards[secondId].emoji) {
      // If cards match, mark them as matched
      setCards(
        cards.map((card) =>
          card.id === firstId || card.id === secondId
            ? { ...card, isMatched: true }
            : card
        )
      );
      setMatchedPairs((prev) => prev + 1);
      // Check if all pairs are matched
      if (matchedPairs + 1 === emojis.length) {
        setIsWin(true);
      }
    } else {
      // If cards don't match, flip them back
      setCards(
        cards.map((card) =>
          card.id === firstId || card.id === secondId
            ? { ...card, isFlipped: false }
            : card
        )
      );
    }
    // Reset flipped cards
    setFlippedCards([]);
  };

  return (
    <div className={styles.gameContainer}>
      <h1 className={styles.gameTitle}>Emoji Memory Game</h1>
      <p className={styles.gameDescription}>Made for hazzeldorn ✨</p>
      <div className="mb-12">
        <Brand />
      </div>

      {/* Display win message when the game is won */}
      {isWin && (
        <div className={styles.winMessage}>Congratulations! You won! ✨</div>
      )}

      <div className={styles.gameBoard}>
        {/* Render each card */}
        {cards.map((card) => (
          <div
            key={card.id}
            className={`${styles.card} ${
              card.isFlipped || card.isMatched ? styles.flipped : ""
            }`}
            onClick={() => flipCard(card.id)}
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
    </div>
  );
};

export default MemoryGame;
