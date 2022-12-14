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

// Main Appointments Container 
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
        if (!data.description || !data.date || !data.time || 
            document.getElementById('location-menu').selectedIndex === 0){
            displayAlert(true, 'All fields must be entered', 'danger');
            return;
        } 
        if (checkDateFormat(data.date) === false) {
            displayAlert(true, `Date must be formatted as MM/DD/YYYY`, 'danger')
            return;
        }
        if (checkTimeFormat(data.time) === false) {
            displayAlert(true, `Invalid time format, eg. 12:30pm`, 'danger')
            return;
        }

        else if (isEditing) {
            // Edit Appointment
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
            // Create New Appointment
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
  
    // Helper Functions
    const displayAlert = (display=false, message='', type='') => {
        setAlert({display, message, type});
    }

    const setDataHandler = (e) => { 
        setData(prevData => ({ ...prevData, [e.target.name]: e.target.value, 
            id: new Date().getTime().toString()}))
    };

    const removeItem = (id) => {
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

    const checkDateFormat = (input) => {
        const re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
        if(input !== '' && !input.match(re)) {
            return false;
        }
        return true;
    }

    const checkTimeFormat = (input) => {
        const re = /^\d{1,2}:\d{2}([ap]m)?$/;
        if (!input.match(re)) {
            return false;
        }
        if (input.slice(-2) !== 'pm' && input.slice(-2) !== 'am'){
            return false;
        }
        return true;
    };

    // Save list state to local storage
    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list));
      }, [list]);

    return (
        <section className='appointments-container'>
            <h1 id='title'>Appointments</h1>
            <form className='appointment-form' onSubmit={handleSubmit}>
                <div >
                    <a>Description</a>
                    <input
                        value={data.description}
                        name="description"
                        placeholder=''
                        label='description'
                        onChange={setDataHandler}
                        id='description-input'
                    />
                    <a>Date</a>
                    <input
                        value={data.date}
                        name='date'
                        placeholder='dd/mm/yyyy'
                        label='date'
                        onChange={setDataHandler}
                        id='date-input'
                    />
                    <a>Time</a>
                    <input
                        value={data.time}                  
                        name='time'
                        placeholder='eg. 12:30pm'
                        label='time'
                        onChange={setDataHandler}
                        id='time-input'
                    />
                    <a>Location</a>
                    <select id="location-menu" onChange={setDataHandler} name="location"
                     className="select" data-testid='description-input'>
                        <option value="select">Select</option>
                        <option value="San Diego">San Diego</option>
                        <option value="Portland">Portland</option>
                        <option value="Seattle">Seattle</option>
                        <option value="London">London</option>
                        <option value="Orlando">Orlando</option>
                     </select>
                    <button type="submit" className={isEditing ? "update-btn" : "create-btn"}
                     id="create-appointment-btn"> {isEditing ? 'Update' : 'Create'} </button>
                </div>
            </form>
            <div className='table-container'>            
                <AppointmentList appointments={list} removeItem={removeItem} editItem={editItem}/>
                {alert.display && <Alert {...alert} hideAlert={displayAlert}/>}
                <button type="button" className='clear-appointments-btn' onClick={clearList}>Clear Appointments</button>
            </div>
        </section>
    )
};
