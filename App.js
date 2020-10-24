import React, { Component } from "react";
import {
  View,
  Text,
  StyleS heet,
  Dimensions,
  TouchableOpacity
} from "react-native";

const { width, height } = Dimensions.get('window');

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      bottom: (height / 2) - 50,
      left: (width / 2) - 50,
      score: 0,
      gameOver: false
    }
    this.timer = 0;
  }

  componentDidMount = () => {
    this.timer = setInterval(() => {
      this.interval()
      },20);
  }
  interval = () => {
    this.setState({
      bottom: this.state.bottom - 5
      })
  }

interval = () => {
  if ( this.state.bottom > 0 ) {
  if ( this.state.bottom > height ) {
    this.setState({
      bottom: height - 100
      })
  } else {
    this.setState({
      bottom: this.state.bottom - 5
      })
  }

  } else {
    this.gameOver();
  }
}

gameOver = () => {
  clearInterval(this.timer);
  this.setState({
    gameOver: true
    })
}

upBall = () => {
  const random = Math.floor(Math.random() * (width - 200)) + 100;
  this.setState({
    score: this.state.score + 1,
    bottom: this.state.bottom + 100,
    left: random
    })
}

again = () => {
  this.setState({
    bottom: (height / 2) - 50,
    left: (width / 2) - 50,
    score: 0,
    gameOver: false
    });
    this.timer = setInterval(() => {
      this.interval()
      },20);
}

  render() {
  return (
    <TouchableOpacity onPress={() => this.upBall()} activeOpacity={1} style={styles.container}>
        <View style={styles.scoreView}>
            <Text style={styles.scoreText}>{this.state.score}</Text>
        </View>
        <View style={[styles.ball, {bottom: this.state.bottom, left: this.state.left}]} />
        { this.state.gameOver && (
          <View style={styles.gameOverView}>
              <Text style={styles.gameOverText}>Game Over</Text>
              <TouchableOpacity onPress={() => this.again()} style={styles.reGame}>
                <Text style={styles.reGameText}>Try Again</Text>
              </TouchableOpacity>
              <Text  style={styles.gameOverScore}>Your Score İs {this.state.score}</Text>
          </View>
          )}
    </TouchableOpacity>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#f1f1f1',
  },
  ball: {
    width: 100,
    height: 100,
    backgroundColor: 'green',
    borderRadius: 50,
    position: 'absolute',
  },
  scoreView: {
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 50,
  },
  gameOverView: {
    position: 'absolute',
    left: 0,
    width: width,
    height: height,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 30,
    color: '#fff',
  },
  reGame: {
    padding: 15,
    backgroundColor: '#fff',
    paddingVertical: 10,
    marginVertical: 10
  },
  reGameText: {
    fontSize: 20,
  },
  gameOverScore: {
    color: '#fff'
  }
  });
