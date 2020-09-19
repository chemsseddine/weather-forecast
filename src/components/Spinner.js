import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";

const Loader = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
`;

export default function Spinner() {
    return (
        <Loader>
            <CircularProgress disableShrink />
        </Loader>
    );
}