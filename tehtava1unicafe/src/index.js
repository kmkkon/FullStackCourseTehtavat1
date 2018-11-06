import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            counter: 0,
            hyva: 0,
            neutraali: 0,
            huono: 0,
            selected: 0,
            votes: {
              0: 0,
              1: 0,
              2: 0,
              3: 0,
              4: 0,
              5: 0,
            },
            mostvotes: 0
        }
    }
    

    palaute = (tapa) => () => {
        this.setState((prevState) => ({
            [tapa]: prevState[tapa] + 1
          }));
    }

    nextAnecdote = () => {
      console.log("Next Anecdote")
      this.setState({
        selected: Math.floor(Math.random() * 6)
      });
    }

    voteAnecdote = () => {
      const copyvotes = {...this.state.votes}
      copyvotes[this.state.selected]+=1
      let numberofvotes = 0
      let most = 0
      for (var i=0; i< 6;i++){
        if (copyvotes[i]>numberofvotes){
          most = i
          numberofvotes = copyvotes[i]
        }
      }
      this.setState({
          votes: copyvotes,
          mostvotes: most
        });
    }

    render(){
        return (
            <div>
              <h1>Anna palautetta</h1>
              <div>
              <Button
                handleClick={this.palaute("hyva")}
                text="Hyvä"
              />
              <Button
                handleClick={this.palaute("neutraali")}
                text="Neutraali"
              />
              <Button
                handleClick={this.palaute("huono")}
                text="Huono"
              />
              </div>
              <Statistics state = {this.state} />
              <div>
              <h1>Anecdotes</h1>
              <p>{this.props.anecdotes[this.state.selected]}</p>
              <p>This anecdote has {this.state.votes[this.state.selected]} votes</p> 
              <button onClick={this.voteAnecdote}>Vote</button><button onClick={this.nextAnecdote}>Next Anecdote</button>
              <h2>Anecdote with most votes is: </h2>
              <p>{this.props.anecdotes[this.state.mostvotes]} ({this.state.mostvotes} votes)</p>

      </div>
            </div>
          )
    }            
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


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
  <App anecdotes={anecdotes}/>,
  document.getElementById('root')
)