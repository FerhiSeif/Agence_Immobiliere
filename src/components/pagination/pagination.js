import React from "react";
import {
  MDBPagination,
  MDBPageItem,
  MDBPageNav,
  MDBCol,
  MDBRow
} from "mdbreact";

import "./pagination.css";

const SimplePagination = props => {
  return (
    <MDBRow className="pagination-container" style={{ cursor: "pointer" }}>
      <MDBCol>
        <MDBPagination className="mb-5">
          <MDBPageItem disabled={props.currentPage === 1}>
            <MDBPageNav
              aria-label="Previous"
              onClick={() => props.onPrevPaginationClick()}
            >
              <span aria-hidden="true">Previous</span>
            </MDBPageNav>
          </MDBPageItem>

          {[...Array(props.collectionLength)].map((el, i) => {
            return props.currentPage === i + 1 ? (
              <MDBPageItem active>
                <MDBPageNav>
                  {i + 1} <span className="sr-only">(current)</span>
                </MDBPageNav>
              </MDBPageItem>
            ) : (
              <MDBPageItem onClick={() => props.onSelectedPageClick(i + 1)}>
                <MDBPageNav>{i + 1}</MDBPageNav>
              </MDBPageItem>
            );
          })}

          <MDBPageItem disabled={props.currentPage === props.collectionLength}>
            <MDBPageNav
              aria-label="Previous"
              onClick={() => props.onNextPaginationClick()}
            >
              <span aria-hidden="true">Next</span>
            </MDBPageNav>
          </MDBPageItem>
        </MDBPagination>
      </MDBCol>
    </MDBRow>
  );
};

export default SimplePagination;
