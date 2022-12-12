import React, { useState, useEffect } from 'react';
import {AppointmentList} from './AppointmentList';
import './Appointments.css';

export const Appointments = () => {
    const [list, setList] = useState([]);
    const [data, setData] = useState({
        id: '',
        description: '',
        date: '',
        time: '',
        location: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editID, setEditID] = useState(null);
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!data.description || !data.date || !data.time || !data.location){
            //display alert
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
            } else {
                
                    // setDateHandler();
                    setList(current => [...current, data]);
                
                // else {
                //     // throw Error ("All fields must be complete");
                //     alert('All fields must be entered')
                // }
                document.getElementById('location-menu').selectedIndex = 0;
                setData({
                    id: '',
                    description: '',
                    date: '',
                    time: '',
                    location: '',
                });
            }
    }
    console.log(list)
    console.log(data)
    const setDataHandler = (e) => { 
        setData(prevData => ({ ...prevData, [e.target.name]: e.target.value, id: new Date().getTime().toString()}))
    };

    const removeItem = (id) => {
        // showAlert(true, 'danger', 'item removed');
        setList(list.filter(appointment => {
            return appointment.id !== id
            }       
        ));
      };
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
    };

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
        <div >
            <div>
            <AppointmentList appointments={list} removeItem={removeItem} editItem={editItem}/>
            <button type="button" className='clear-btn' onClick={()=>setList([])}>Clear Appointments</button>
            </div>

        </div>
        </section>
    );
}
    // const locations = [
    //     {value: '', text: 'Select Location'},
    //     {value: 'Los Angeles', text: 'Los Angeles'},
    //     {value: 'New York', text: 'New York'},
    //     {value: 'Paris', text: 'Paris'},
    //     {value: 'Venice', text: 'Venice'},
    // ];