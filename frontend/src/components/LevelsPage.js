import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../context/GameContext";
import Sound from "react-sound";
import bgMusic from "../assets/sound-effects/main-bg-music.mp3";
import buttonClickSound from "../assets/sound-effects/levels-button-click.mp3";

const LevelsPage = () => {
  const { unlockedLevels } = useContext(GameContext);
  const navigate = useNavigate();
  const [levels, setLevels] = useState([1]);
  const [playBackgroundMusic, setPlayBackgroundMusic] = useState(false);
  const [playButtonSound, setPlayButtonSound] = useState(false);

  useEffect(() => {
    setPlayBackgroundMusic(true);
    setLevels(unlockedLevels?.length ? unlockedLevels : [1]);
  }, [unlockedLevels]);

  const handleLevelClick = (level) => {
    setPlayButtonSound(true);
    if (level === 1 || levels.includes(level)) {
      setTimeout(() => {
        navigate(`/riddle/${level}`);
      }, 500); 
    }
  };

  const renderLevelButton = (level) => {
    const isUnlocked = level === 1 || levels.includes(level);

    return (
      <button
        key={level}
        style={{
          ...styles.levelButton,
          opacity: isUnlocked ? 1 : 0.6,
          cursor: isUnlocked ? "pointer" : "not-allowed",
        }}
        onClick={() => handleLevelClick(level)}
        disabled={!isUnlocked}
      >
        Level {level}
      </button>
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>LEVELS</h1>
      <div style={styles.levelsGrid}>
        {Array.from({ length: 20 }, (_, index) => renderLevelButton(index + 1))}
      </div>
      <Sound
        url={bgMusic}
        playStatus={playBackgroundMusic ? Sound.status.PLAYING : Sound.status.STOPPED}
        loop={true}
        volume={50}
      />
      <Sound
        url={buttonClickSound}
        playStatus={playButtonSound ? Sound.status.PLAYING : Sound.status.STOPPED}
        onFinishedPlaying={() => setPlayButtonSound(false)}
        volume={100}
      />
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#003F66", // Dark Blue
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 20px",
  },
  title: {
    fontSize: "3rem", // Increased font size for better visibility
    color: "#FFD700",
    marginBottom: "40px",
    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
    fontFamily: "'Pirata One', cursive", // Apply Pirata One font
    letterSpacing: "2px", // Add some letter spacing for a pirate vibe
  },
  levelsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", // Reduce from 5 to 3 columns
    gap: "20px",
    maxWidth: "900px",
    width: "100%",
    padding: "20px",
  },
  levelButton: {
    padding: "20px 20px", // Increase width by adding more padding
    fontSize: "1.2rem",
    minWidth: "180px", // Ensure buttons are wider
    borderRadius: "12px",
    backgroundColor: "rgba(139, 69, 19, 0.8)",
    border: "2px solid #FFD700",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    transition: "transform 0.2s ease",
    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
};

export default LevelsPage;