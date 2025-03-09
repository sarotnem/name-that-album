import { GAME_CONFIG } from '@/lib/config';
import { useGameStore } from '@/providers/game-store-provider';
import HintButton from './HintButton';

export default function HintsSection() {
  const updatePixelation = useGameStore(state => state.updatePixelation);
  const pixelation = useGameStore(state => state.pixelation);

  const hasUsedSharpenHint = GAME_CONFIG.INIT_PIXELATION > pixelation;

  return (
    <>
      <HintButton title="Sharpen Image" cost="20" onClick={() => updatePixelation(GAME_CONFIG.INIT_PIXELATION / 2)} disabled={hasUsedSharpenHint} />
      <HintButton title="50/50" cost="40" onClick={() => {}} />
    </>
  );
}
