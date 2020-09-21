import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import { ArrowForward } from '@material-ui/icons';

import { getNextChunk } from '../store/actions';
import { isNextEnabledSelector } from '../store/selectors';

function Next() {
    const dispatch = useDispatch();
    const isNextEnabled = useSelector(isNextEnabledSelector)
    const handleNextClick = () => dispatch(getNextChunk())
    return (
        <IconButton
            style={{ opacity: +isNextEnabled }}
            onClick={handleNextClick}
            disabled={!isNextEnabled}>
            <ArrowForward />
        </IconButton>
    )
}

export default Next
