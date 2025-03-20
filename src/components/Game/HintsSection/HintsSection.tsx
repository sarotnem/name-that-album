'use client';
import { GAME_CONFIG } from '@/lib/config';
import { useGameStore } from '@/providers/game-store-provider';
import HintButton from './HintButton';

const COST_SHARPEN = 20;
const COST_5050 = 40;

export default function HintsSection() {
  const decreaseScore = useGameStore(state => state.decreaseScore);
  const updatePixelation = useGameStore(state => state.updatePixelation);
  const pixelation = useGameStore(state => state.pixelation);
  const updateHasUsed5050 = useGameStore(state => state.updateHasUsed5050);
  const hasUsed5050 = useGameStore(state => state.hasUsed5050);

  const hasUsedSharpenHint = GAME_CONFIG.INIT_PIXELATION > pixelation;

  const handleSharpen = () => {
    decreaseScore(COST_SHARPEN);
    updatePixelation(GAME_CONFIG.INIT_PIXELATION / 2);
  };

  const handle5050 = () => {
    decreaseScore(COST_5050);
    updateHasUsed5050(true);
  };

  return (
    <>
      <HintButton title="Sharpen Image" cost={COST_SHARPEN} onClick={() => handleSharpen()} disabled={hasUsedSharpenHint} />
      <HintButton title="50/50" cost={COST_5050} onClick={() => handle5050()} disabled={hasUsed5050} />
    </>
  );
}
