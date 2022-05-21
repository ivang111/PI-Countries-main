import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities } from '../../Redux/Actions/actions.js';
import NavBar from '../NavBar/NavBar.js';
import "./Activities.css"

function Activities() {
  const dispatch = useDispatch();
  const activity = useSelector((state) => state.activities);
  
  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);
  
  console.log("ACTIVIDADES:", activity)
  return (
    <div className='containerActivity'>
     <NavBar />
     <div>
       <h1>hola</h1>
      <h1>{activity.name}</h1>
      {/* {activities.map(d => <CardActivity
          key={d.id}
          name={d.name}
          dificulty={d.dificulty} 
          duration={d.duration}
          season={d.season}
          countries={d.countries}
        />)} */}
     </div>
    </div>
  )
}

export default Activities
