interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-6 flex justify-center space-x-2">
      {pageNumbers.map((num) => (
        <button
          key={num}
          className={`px-3 py-1 border rounded ${
            num === currentPage ? 'bg-blue-600 text-white' : 'bg-white text-black'
          }`}
          onClick={() => onPageChange(num)}
        >
          {num}
        </button>
      ))}
    </div>
  );
}
