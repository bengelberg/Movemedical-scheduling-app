import React, {useState} from 'react';
import './AppointmentList.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

export const AppointmentList = ({appointments, removeItem, editItem}) => {
    return (
        <div className='appointment-container'>
            <table className="table">
                <thead className='thead-dark'>
                    <tr>
                        <th style={{width: "40%"}}>Description</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Location</th>
                        <th style={{width: "10%"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    
                {appointments.map((appointment) => {
                    const { id, description, date, time, location } = appointment;
                    
                    return (
                        <tr key={id} >
                            <td>{description}</td>
                            <td>{date}</td>
                            <td>{time}</td>
                            <td>{location}</td>
                            <td>
                            <button
                                    type='button'
                                    className='edit-btn'
                                    onClick={() => editItem(id)}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    type='button'
                                    className='delete-btn'
                                    onClick={() => removeItem(id)}
                                >
                                    <FaTrash />
                                </button>
                            </td>                                                 
                        </tr> 
                    )
                })}                    
                </tbody>
            </table>         
        </div>
    )
}



