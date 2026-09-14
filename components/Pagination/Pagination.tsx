import css from './Pagination.module.css'
import ReactPaginateModule from "react-paginate"

interface PaginationProps {
  totalPages: number,
  currentPage: number,
  onPageChange: (page: number) => void,
}

export default function Pagination({totalPages , currentPage , onPageChange} : PaginationProps) {
    return(
        <ReactPaginateModule
            breakLabel="..."
            nextLabel=">"
            onPageChange={({ selected }) => onPageChange(selected + 1)}
            forcePage={currentPage - 1}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="<"
            renderOnZeroPageCount={null}
            marginPagesDisplayed={1}
            containerClassName={css.pagination}
            activeClassName={css.active}
          />
    )
}