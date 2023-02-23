import React from 'react';
import { usePagination, DOTS } from './usePagination';
const Pagination = props => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        last_page
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    console.log("paginationRangehi",paginationRange);
    
    return (
        <ul
            className={`pagination m-0`}
        >
            {(currentPage !== 1) &&
                <li
                    className='page-item'
                    onClick={onPrevious}
                >
                    <a className="page-link" href='#'>Prev</a>
                </li>
            }
            {paginationRange.map(pageNumber => {
                if (pageNumber === DOTS) {
                    return <li className="page-item dots">&#8230;</li>;
                }

                return (
                    <li
                        className='page-item'
                        onClick={() => onPageChange(pageNumber)}
                        key={pageNumber}
                    >
                        <a href='JavaScript:void(0)' className={`page-link ${(pageNumber === currentPage) ? "active" : ""}`}>
                            {pageNumber}
                        </a>
                    </li>
                );
            })}
            {(currentPage !== last_page) &&
                <li
                    className='pagination-item'
                    onClick={onNext}
                >
                    <a className="page-link" href='JavaScript:void(0)'>Next</a>
                </li>
            }
        </ul>
    );
};

export default Pagination;