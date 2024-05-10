import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import {
  PaginationPrevious,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationContent,
  Pagination,
} from "@/components/ui/pagination";
import { MattersDataProps } from "../../types/matterTypes";
import { MatterForm } from "./MatterForm";


export const MattersTable = ({ mattersData, clients, lawyers, onPageChange, onAddMatter }: MattersDataProps) => {
  const { currentPage = 1, totalPages = 1, data } = mattersData;

  const renderPagination = () => {
    let paginationItems = [];
    for (let page = 1; page <= totalPages; page++) {
      paginationItems.push(
        <PaginationItem key={page}>
          <PaginationLink href="#" onClick={() => onPageChange(page)}>
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return paginationItems;
  };

  return (
    <div>
        <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">All Matters</h2>
        <MatterForm clients={clients} lawyers={lawyers} onAddMatter={(e) => onAddMatter(e)} />
        </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client Name</TableHead>
            <TableHead>Matter Type</TableHead>
            <TableHead>Responsible Attorney</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.client.name}</TableCell>
              <TableCell>{row.matter_type}</TableCell>
              <TableCell>{row.lawyer.name}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end mt-4">
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => onPageChange(currentPage - 1)}
                />
              </PaginationItem>
            )}
            {renderPagination()}
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => onPageChange(currentPage + 1)}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
