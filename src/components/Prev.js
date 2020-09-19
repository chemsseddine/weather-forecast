import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import { ArrowBack } from '@material-ui/icons';

import { getPreviousChunk } from '../store/actions';

function Prev() {
    const dispatch = useDispatch();
    const pageIndex = useSelector(state => state.pageIndex)
    const handlePrevClick = () => dispatch(getPreviousChunk(pageIndex))
    return (
        <IconButton
            style={{ opacity: +!!pageIndex }}
            onClick={handlePrevClick}
            disabled={!pageIndex}>
            <ArrowBack />
        </IconButton>
    )
}

export default Prev
