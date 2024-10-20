import React from "react";

// Function to assign a color based on the rank
function getColorByRank(rank: number) {
  switch (rank) {
    case 1:
      return "bg-green-500"; // Highest
    case 2:
      return "bg-blue-500";
    case 3:
      return "bg-orange-500";
    default:
      return "bg-red-500"; // Lowest
  }
}

interface LanguageListProps {
  languages: Record<string, number> | null;
  limit?: number; // Optional limit prop
}

export const LanguageList: React.FC<LanguageListProps> = ({ languages, limit }) => {
  const sortedLanguages = languages
    ? Object.entries(languages).sort(([, bytesA], [, bytesB]) => bytesB - bytesA)
    : [];

  // If limit is specified, slice the array to show only the number of languages defined by the limit
  const limitedLanguages = limit ? sortedLanguages.slice(0, limit) : sortedLanguages;

  return (
    <div>
      {limitedLanguages.length > 0 ? (
        <ul className="text-xs flex flex-col space-y-1">
          {limitedLanguages.map(([lang, bytes], index) => (
            <li key={lang} className="flex items-center font-mono">
              {/* Colored dot indicating language rank */}
              <span
                className={`inline-block w-2 h-2 mr-2 rounded-full ${getColorByRank(index + 1)}`}
                title={`${lang} - ${bytes.toLocaleString()} bytes`}
              ></span>
              {/* Language and byte count */}
              <span>
                {lang}: {bytes.toLocaleString()} bytes
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs">No languages found</p>
      )}
    </div>
  );
};
