//ПРОСТИЙ ПРИКЛАД СИНТАКСИЗУ
// СТАРИЙ МЕТОД

//початковий стан(state)
const initialState = {
  count: 0,
  step: 1
}

//reducer - чиста функція (state, action) =>(повертає) state
//action - {type: 'increment', payload} -jsobject з обов'язк
function counterReducer (state = initialState, action) {
  const { type } = action
  switch (type) {
    case 'increment': {
      const { count, step } = state
      return { ...state, count: count + step }
    }
    case 'decrement': {
      const { count, step } = state
      return { ...state, count: count - step }
    }

    case 'setStep': {
      const { value } = action
      return { ...state, step: value }
    }

    default:
      return state
  }
}

export default counterReducer
