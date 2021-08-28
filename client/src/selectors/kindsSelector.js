import { createSelector } from 'reselect';

const getKindsCurrentPage = ( state ) => state.kind.currentPage;
const getKinsPagesCount = ( state ) => state.kind.pagesCount;
const getKinds = ( state ) => state.kind.data;
export const getKindsError = ( state ) => state.kind.errors;

export const getKindsInfo = createSelector(
    getKindsCurrentPage,
    getKinsPagesCount,
    getKinds,
    //( currentPage, pagesCount, kinds ) => ( { currentPage, pagesCount, kinds } )
    ( currentPage, pagesCount, kinds ) => {
        console.log( 888888888 );
        return { currentPage, pagesCount, kinds };
    }
);
