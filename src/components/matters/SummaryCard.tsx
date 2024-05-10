import { SummaryCardsProps } from '../../types/matterTypes';

export const SummaryCard = ({ summary }: SummaryCardsProps) => {
  return (
    <div>
     <h2 className="text-2xl font-bold mb-4">Matter Summary</h2>   
    <div className="grid grid-cols-4 gap-4">
      {summary && summary.map((card, index) => (
        <div
          key={index}
          className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4"
        >
          <h3 className="text-lg font-bold mb-2">{card.type}</h3>
          <p className="text-4xl font-bold">{card.count}</p>
        </div>
      ))}
    </div>
    </div>
  );
};
