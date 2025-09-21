import React from 'react';
import HeaderGameScreen from '../components/GameScreen/HeaderGameScreen';
import QuestionCard from '../components/GameScreen/QuestionCard';
import AnswerCard from '../components/GameScreen/AnswerCard';
import TimeBar from '../components/GameScreen/TimeBar';
// REMOVA isto: import GameMusic from '../components/GameMusic';
// USE isto:
import { GameMusic } from '../components/Audio';  // ← Import correto

function GameScreen() {
  return (
    <div className="game-container">
      <GameMusic />  {/* ← Isso deve funcionar agora */}
      <HeaderGameScreen />
      <QuestionCard />
      <AnswerCard />
      <TimeBar />
    </div>
  );
}

export default GameScreen;