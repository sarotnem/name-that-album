type HintButtonProps = {
  title: string;
  cost: string | number;
  disabled?: boolean;
  onClick?: () => void;
};

export default function HintButton({ title, cost, disabled = false, onClick }: HintButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        flex justify-center items-center bg-gray-700 hover:bg-gray-600 text-white px-6 py-3
        rounded-lg text-lg font-semibold transition cursor-pointer
        disabled:cursor-not-allowed disabled:bg-gray-700/30 disabled:text-white/30
      "
    >
      { title }
      <span className="text-sm text-white/40 ml-2">
        (-
        {cost}
        {' '}
        points)
      </span>
    </button>
  );
}
