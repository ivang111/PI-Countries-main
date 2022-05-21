// import React from 'react'
// import { useEffect, useState }  from 'react'
//  import { useSelector, useDispatch } from 'react-redux'
//  import axios from 'axios'
// import { createActivity } from '../../Redux/Actions/actions.js'
// import NavBar from '../NavBar/NavBar'


// const NewActivity = () => {
//   let [input, setInput] = useState({
//     name: '', 
//     dificulty: '', 
//     duration: '',
//     season: '',
//     selecCountry: []
//   });
  
//   let [error, setError] = React.useState({}); 
//   let countries = useSelector((state) => state.allCountries)
//   let activities = useSelector((state) => state.activities)
//   let dispatch = useDispatch()

//   useEffect(() => {
//     setInput({
//       name: '',
//       dificulty: '',
//       duration: '',
//       season: '',
//       selecCountry: []})
//   }, [activities])

//   function handleSubmit (e) {
//     e.preventDefault();
//     dispatch(createActivity(input))
//     setInput({
//         name: '', 
//         dificulty: '', 
//         duration: '',
//         season: '',
//         selecCountry: []
//     })
//     e.target.reset()
// }
// //input nombre 
// let handleChange = (e) => {
//   setInput({...input, [e.target.name]: e.target.value})
//   //console.log( e)
// };

 
  
//   return (
//     <div>
//         <NavBar/>
//         <div>
//           <h1>Titulo</h1>
//           <form onSubmit={(e)=> handleSubmit(e)}>
//             <div>
//               <label>Nombre</label>
//               <input type={'text'}
//                     name={'name'} 
//                     onChange={(e)=> handleChange(e)}/>
//             </div>
//             <div>
//               <label>Dificultad</label>
//               <p>Facil</p>
//               <p>Extremo</p>
//               <input type="range" min="1" max="5" defaultValue={"0"} name={'dificulty'}  onChange={(e)=> handleChange(e)}/>
//               <span> {input.dificulty} </span>
//             </div>
//             <div>
//               <label>Duracion</label>
//               <input type="range" min="0" max="48" defaultValue={"0"} name={'duration'}  onChange={(e)=> handleChange(e)}/>
//               <span> {input.duration} Horas</span>
//             </div>
//             <div>
//               <label>Temporada</label>
//               <select name="season" onChange={(e)=> handleChange(e)}>
//                 <option>Verano</option>
//                 <option>Otoño</option>
//                 <option>Invierno</option>
//                 <option>Primavera</option>
//                 <option>Todo el Año</option>
//               </select>
//             </div>
//             <div>
//               <label>Paises donde se desarrolla</label>
              
              
//             </div>
//             <div>
//               <button className='createBtn'>Registrar</button>
//             </div>
//           </form>
//         </div>
//     </div>
//   )
// }

// export default NewActivity
