import React from "react";
import Button from "./button";

function Row(props) {
    const first = props.first;
    const second = props.second;
    const third = props.third;
    if (third) {
        return <Row3 first={first} second={second} third={third}/>;
    }
    if (second) {
        return <Row2 first={first} second={second}/>;
    }
    return <Row1 first={first}/>;
}

function Row1(props) {
    return (
        <tr style={{width: '100%', height: '100%'}}>
            <td style={{width: '100%', height: '100%'}} colSpan="12">
                <Button button={props.first}/>
            </td>
        </tr>
    );
}

function Row2(props) {
    return (
        <tr style={{width: '100%', height: '100%'}}>
            <td style={{width: '100%', height: '100%'}} colSpan="6">
                <Button button={props.first}/>
            </td>
            <td style={{width: '100%', height: '100%'}} colSpan="6">
                <Button button={props.second}/>
            </td>
        </tr>
    );
}

function Row3(props) {
    return (
        <tr style={{width: '100%', height: '100%'}}>
            <td style={{width: '100%', height: '100%'}} colSpan="4">
                <Button button={props.first}/>
            </td>
            <td style={{width: '100%', height: '100%'}} colSpan="4">
                <Button button={props.second}/>
            </td>
            <td style={{width: '100%', height: '100%'}} colSpan="4">
                <Button button={props.third}/>
            </td>
        </tr>
    );
}

export default Row;