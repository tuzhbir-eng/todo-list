import { legacy_connect } from 'react-redux'
import { decrement, increment, setStep } from '../store/slices/counterSlice'

function Counter (props) {
  const { count, step, decrementCount, incrementCount, setNewStep } = props

  const decCount = () => decrementCount()
  const incCount = () => incrementCount()

  const stepChangeHandler = ({ target: { value } }) => setNewStep(Number(value))
 
  return (
    <div>
      Count: {count}
      <button onClick={decCount}>-</button>
      <button onClick={incCount}>+</button>
      <input
        type='number'
        placeholder='step'
        value={step}
        onChange={stepChangeHandler}
      />
    </div>
  )
}

const mapStateToProps = state => {
  return state.counter
  //⬆️ те, що потрапить в пропси
}

const mapDispatchToProps = dispatch => {
  return {
    //в dispatch прописаний counterReducer(state, action)
    //ініціюю подію через dispatch
    incrementCount: () => dispatch(increment()),
    decrementCount: () => dispatch(decrement()),
    setNewStep: value => dispatch(setStep(value)) // потрапляє в action.payload
  }
}

//створює HOC, який прокине dispatch в пропси
//перший параметр приймає фуекцію, щоб прокинути в пропси стан
//........................Щоб зчтати дані зі store⬇️
const withAccessToStore = legacy_connect(mapStateToProps, mapDispatchToProps)
//............................................СТАН⬆️..........ОБРОБНИК⬆️....//
export default withAccessToStore(Counter)
