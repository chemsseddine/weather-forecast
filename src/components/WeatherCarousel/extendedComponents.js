import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    text-align: left;
`;

export const ExtraInfo = styled.li`
    align-items: center;
`;

export const Img = styled.img`
    width: 20px;
    height: 30px;
`;

export const DateRow = styled.div`
    width: 100%;
    margin-left: 20px;
`;

export const CurrentDate = styled.h2`
    margin: 0;
`;

export const WeatherType = styled.h3`
    margin: 0;
    font-weight: normal;
    text-transform: capitalize;
`;

export const Weather = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    i {
        font-size: 35px;
    }
`;

export const Temperature = styled.h1`
    font-size: 50px;
`;

export const Daily = styled.ul`
    list-style: none;
    width: 30%;
    display: flex;
    flex-direction: column;
    li {
        display: flex;
        justify-content: space-between;
    }
    p {
        margin: 5px 0;
        font-size: 18px;
    }
`;