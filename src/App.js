import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Snake from './snake';
import Food from './food';

const getRandomCordinates = () => {
  let x = Math.floor((Math.random()*49.5))*2;
  let y =  Math.floor((Math.random()*49.5))*2;
  return [x,y]
}

const initialState = {
  food : getRandomCordinates(),
  speed: 200,
  direction:'RIGHT',
  snakeDots : [[0, 0], [0, 2], [0, 4]]
}
class App extends Component {
  state = initialState;

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed)
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate(){
    this.checkIfOutOfBorder();
    this.checkIfCollapse();
    this.checkIfEat();
  }
  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({direction: 'UP'});
        break;
      case 40:
        this.setState({direction: 'DOWN'});
        break;
      case 37:
        this.setState({direction: 'LEFT'});
        break;
      case 39:
        this.setState({direction: 'RIGHT'});
        break;
      default:
        break;
    }
  } 

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1]; /// unccessary

    switch (this.state.direction) {
      case 'RIGHT' :
        head = [head[0] + 2, head[1]]
        break;
      case "LEFT" : 
        head = [head[0] - 2, head[1]]
        break;
      case "UP" :
        head = [head[0], head[1] - 2]
        break;
      case "DOWN" :
        head = [head[0], head[1] + 2]
        break;
      default:
        break;
    }
    dots.push(head)
    dots.shift();
    this.setState({snakeDots : dots})
  }

  checkIfOutOfBorder(){
    const { snakeDots } = this.state;
    const head = snakeDots[snakeDots.length-1]
    console.log(head)
    if(head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0){
      this.onGameOver()
    }
  }
  
  checkIfCollapse(){
    const snake = [...this.state.snakeDots];
    const head = snake[snake.length-1];
    snake.pop()
    snake.forEach(dot => {
      if(head[0] === dot[0] && head[1] === dot[1]){
        this.onGameOver()
      }
    })
  }
  onGameOver(){
    alert(`Game Over. Snake length is ${this.state.snakeDots.length}`);
    this.setState(initialState);
  }

  checkIfEat(){
    const { snakeDots, food } = this.state;
    const head = snakeDots[snakeDots.length-1];
    if(head[0] === food[0] && head[1] === food[1]){
      this.setState({
        food:getRandomCordinates()
      })
      this.enlargeSnake();
    }
  }

  enlargeSnake(){
    const newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots:newSnake
    })
    this.increaseSpeed()
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10
      })
    }
  }

  render() {

    const {snakeDots, food} = this.state
    return (
      <div className="game-area">
        <Snake snakeDots={snakeDots} />
        <Food dot={food}/>
      </div>
    );
  }
}

export default App;
