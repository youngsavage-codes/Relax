import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function PaginationDemo({ currentPage, totalRepos, reposPerPage, onPageChange }: any) {
  const totalPages = Math.ceil(totalRepos / reposPerPage);
  const visiblePages = 3; // Number of pages to show at once

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Calculate the range of pages to display
  const getPageRange = () => {
    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    // Adjust if the range overflows beyond totalPages
    const adjustedStartPage = Math.max(1, endPage - visiblePages + 1);
    return { startPage: adjustedStartPage, endPage };
  };

  const { startPage, endPage } = getPageRange();

  return (
    <div className="w-full py-5">
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage - 1);
            }}
            className={currentPage === 1 ? 'disabled-class' : ''}
          />
        </PaginationItem>

        {/* Render the calculated range of pages */}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <PaginationItem key={startPage + index}>
            <PaginationLink
              href="#"
              isActive={startPage + index === currentPage}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(startPage + index);
              }}
            >
              {startPage + index}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage + 1);
            }}
            className={currentPage === totalPages ? 'disabled-class' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
    </div>
  );
}
