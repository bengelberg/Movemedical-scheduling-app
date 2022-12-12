import { getValue } from '@testing-library/user-event/dist/utils';
import React, { useEffect } from 'react';
import './Alert.css';

const Alert = ({ type, message, hideAlert, list }) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            hideAlert()
        }, 2000)
        return () => clearTimeout(timeout)
    }, [])
    return (
        <p className={`alert alert-${type}`}>{message}</p>
    )
}

export default Alert;