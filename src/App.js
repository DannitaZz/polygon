import { useReducer } from 'react';
import './App.css';
import pizarra from './img/pizarra.jpg'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import Stack from '@mui/material/Stack';

const logMousePosition = (dispatch) => (e) => {
  const Y = e.clientY
  const X = e.clientX
  dispatch({type:'click', value: [X,Y]})
}

const initialState = {
  points:[],
  lines:[],  
                     }

const reducer = (state, action) => {
  switch (action.type) {
    case 'click':
      let currentPoints = [...state.points]
      currentPoints.push(action.value)

      if(currentPoints.length > 1){
        let currentLines = [...state.lines]
        currentLines.push([currentPoints[currentPoints.length-2],currentPoints[currentPoints.length-1]])
        return {...state, points:currentPoints, lines:currentLines}
      }
      return {...state, points:currentPoints}
      
    case 'clear':
      return initialState
    case 'create': 
    let currentLin = [...state.lines]
    let currentPts = [...state.points]
    if(currentPts.length > 2){
    currentLin.push([currentPts[currentPts.length-1], currentPts[0]])
    return {...state, points: currentPts, lines: currentLin}
    }
    alert('Por favor, dibuje al menos 3 puntos')
    return {...state}
    default:
      return {...state}
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="App" 
         style={{width:'100vw', height:'100vh'}}>
        <svg width='100vw' 
             onClick={logMousePosition(dispatch)} 
             style={{width:'100vw', height:'88vh', backgroundColor:'white', border:'10px solid black', boxSizing: 'border-box', backgroundImage:`url(${pizarra})`, backgroundPosition: 'center' }}>
          {state.points.map((point, i) => {
            return <circle key={i} cx={point[0]} cy={point[1]} r="4" fill="#f4f4f4" />
          })}
          {state.lines.map((line, i) => {
            return <line key={i} x1={line[0][0]} y1={line[0][1]} x2={line[1][0]} y2={line[1][1]} style={{stroke:"#f4f4f4", strokeWidth:"8px"}}/>
          })}
        </svg>
        <Stack direction="row" spacing={2}  sx={{display: 'flex', justifyContent: 'space-evenly', height: '8%', marginTop: '8px'}}>
      <Button variant="outlined" color='secondary' onClick={(e) => dispatch({type: 'create'})} startIcon={<DriveFileRenameOutlineIcon />}>
        Complete
      </Button>
      <Button variant="outlined" color='secondary'  onClick={(e) => dispatch({type: 'clear'})} endIcon={<DeleteIcon />}>
        Clear
      </Button>
    </Stack>
    </div>
  );
}

export default App;