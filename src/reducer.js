export default function reducer (state /*: State /, action /: Action */) {
    switch (action.type) {
    case 'UPDATE_PIECE':
        return updatePiece(state, action)
    default:
        return state
    }
  }


 
  

  export function updatePiece (state, action) {
    return {
    
    
    
    
        ...state,
    educations: [
    ...state.educations.slice(0, action.index),
    { ...state.educations[action.index], ...action.payload },
    ...state.educations.slice(action.index + 1)
    ]
    }
  }



  