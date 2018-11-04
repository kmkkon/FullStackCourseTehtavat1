import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            counter: 0,
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
    }

    hyvapalaute = () => {
        this.setState((prevState) => ({
            hyva: prevState.hyva + 1
          }));
    }

    neutraalipalaute = () => {
        this.setState((prevState) => ({
            neutraali: prevState.neutraali + 1
          }));
    }

    huonopalaute = () => {
        this.setState((prevState) => ({
            huono: prevState.huono + 1
          }));
    }

    render(){
        return (
            <div>
              <h1>Anna palautetta</h1>
              <div>
              <Button
                handleClick={this.hyvapalaute}
                text="Hyvä"
              />
              <Button
                handleClick={this.neutraalipalaute}
                text="Neutraali"
              />
              <Button
                handleClick={this.huonopalaute}
                text="Huono"
              />
              </div>
              <Statistics state = {this.state} />
            </div>
          )
    }            
}

const Statistics = (props) => {
    if (props.state.hyva + props.state.neutraali + props.state.huono === 0){
        return (
            <div>
                <h1> Statistics </h1>
                    <p>Ei ol äänii annettu</p>
            </div>
          )
          }

        return (
      <div>
          <h1> Statistics </h1>
          <table>
              <tbody>
                <Statistic name="Hyvä" value={props.state.hyva} />
                <Statistic name="Neutraali" value={props.state.neutraali} />
                <Statistic name="Huono" value={props.state.huono} />
                <Statistic name="Keskiarvo" value={(props.state.hyva - props.state.huono)/(props.state.hyva + props.state.neutraali + props.state.huono)} />
                <Statistic name="Positiivisia" value={props.state.hyva / (props.state.hyva + props.state.neutraali + props.state.huono) * 100} endtext=" %"/>
              </tbody>
          </table>
      </div>
    )
  }

  const Statistic = (props) => {
    return (
          <tr>
              <td>{props.name}</td>
              <td>{props.value} {props.endtext}</td>
          </tr>
    )
  }

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )

ReactDOM.render(
  <App />,
  document.getElementById('root')
)