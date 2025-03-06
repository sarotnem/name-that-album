type DetailValueProps = {
  value?: string | string[] | number;
};

export default function DetailValue({ value }: DetailValueProps) {
  return (
    <>
      {Array.isArray(value)
        ? (
            <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1 animate-fadein mt-2">
              {value.map((item, idx) => (
                <span
                  key={`detail_value_${item}_${idx}`}
                  className="inline-flex items-center rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-700"
                >
                  {item}
                </span>
              ))}
            </div>
          )
        : (
            <span className="text-xl font-bold text-white animate-fadein">
              {value}
            </span>
          )}
    </>
  );
}
