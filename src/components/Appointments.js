import React, { useState, useEffect } from 'react';
import {AppointmentList} from './AppointmentList';
import './Appointments.css';
import Alert from './Alert';

const getLocalStorage = () => {
    let list = localStorage.getItem('list');
    if (list) {
      return (list = JSON.parse(localStorage.getItem('list')));
    } else {
      return [];
    }
};

export const Appointments = () => {
    const [list, setList] = useState(getLocalStorage());
    const [data, setData] = useState({
        id: '',
        description: '',
        date: '',
        time: '',
        location: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editID, setEditID] = useState(null);
    const [alert, setAlert] = useState({ display: false, message: '', type: '' });

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!data.description || !data.date || !data.time || !data.location){
            console.log(alert)
            displayAlert(true, 'All fields must be entered', 'danger');
        } else if (isEditing) {
            setList(
              list.map((appointment) => {
                if (appointment.id === editID) {
                  return { ...appointment, 
                    description: data.description,
                    date: data.date,
                    time: data.time,
                    location: data.location };
                }          
                return appointment;
              })
            );
            setData({
                id: '',
                description: '',
                date: '',
                time: '',
                location: '',
            });
            setEditID(null);
            setIsEditing(false);
            document.getElementById('location-menu').selectedIndex = 0;
            displayAlert(true, 'Appointment Updated!', 'success');
        } else {
            setList(current => [...current, data]);
            document.getElementById('location-menu').selectedIndex = 0;
            setData({
                id: '',
                description: '',
                date: '',
                time: '',
                location: '',
            });
            displayAlert(true, 'Appointment Added!', 'success');
        }
    };
    // console.log(list)
    // console.log(data)
    const displayAlert = (display=false, message='', type='') => {
        setAlert({display, message, type});
    }

    const setDataHandler = (e) => { 
        setData(prevData => ({ ...prevData, [e.target.name]: e.target.value, id: new Date().getTime().toString()}))
    };

    const removeItem = (id) => {
        // showAlert(true, 'danger', 'item removed');
        setList(list.filter(appointment => {
            return appointment.id !== id
            }       
        ));
        displayAlert(true, 'Appointment Removed', 'danger');
      };
    const clearList = () => {
        setList([]);
        displayAlert(true, 'List Cleared', 'danger');
    }
    const editItem = (id) => {
        const specificAppointment = list.find((appointment) => appointment.id === id);
        setIsEditing(true);
        setEditID(id);
        setData({
            id: specificAppointment.id,
            description: specificAppointment.description,
            date: specificAppointment.date,
            time: specificAppointment.time,
            location: specificAppointment.location,
        });
        switch (specificAppointment.location) {
            case 'San Diego': return document.getElementById('location-menu').selectedIndex = 1;
            case 'Portland': return document.getElementById('location-menu').selectedIndex = 2;
            case 'Seattle': return document.getElementById('location-menu').selectedIndex = 3;
            case 'London': return document.getElementById('location-menu').selectedIndex = 4;
            case 'Orlando': return document.getElementById('location-menu').selectedIndex = 5;
        }
    };

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list));
      }, [list]);

    return (
        <section className='appointments-container'>
            <h1>Appointments</h1>
            <form className='appointment-form' onSubmit={handleSubmit}>
                <div >
                    <input
                        value={data.description}
                        name="description"
                        placeholder='description'
                        label='description'
                        onChange={setDataHandler}
                    />
                    <input
                        value={data.date}
                        name='date'
                        placeholder='date'
                        label='date'
                        onChange={setDataHandler}
                    />
                    <input
                        value={data.time}                  
                        name='time'
                        placeholder='time'
                        label='time'
                        onChange={setDataHandler}
                    />
                    <select id="location-menu" onChange={setDataHandler} name="location">
                        <option value="select" disabled selected>Select Location</option>
                        <option value="San Diego">San Diego</option>
                        <option value="Portland">Portland</option>
                        <option value="Seattle">Seattle</option>
                        <option value="London">London</option>
                        <option value="Orlando">Orlando</option>
                     </select>
                    <button type="submit" className={isEditing ? "update-btn" : "create-btn"} id="create-appointment-btn"> {isEditing ? 'UPDATE' : 'CREATE'} </button>
                </div>
            </form>
        <div className='footer-container'>
            
            <AppointmentList appointments={list} removeItem={removeItem} editItem={editItem}/>
            {alert.display && <Alert {...alert} hideAlert={displayAlert}/>}
            <button type="button" className='clear-btn' onClick={clearList}>Clear Appointments</button>
            
        </div>
        </section>
    );
}
