import React from 'react'
import styled from 'styled-components';

export default function PaginationScreen({ postsPerPage, totalPosts, paginate }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <PaginationWrapper className="col-12">
            <ul className="pagination justify-content-center">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} href={'#' + number} className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </PaginationWrapper>
    )
}

const PaginationWrapper = styled.div`
    .page-link{
        color: #056676 !important;
    }
`