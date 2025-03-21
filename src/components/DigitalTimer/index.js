import React, {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isActive: false,
    isPaused: false,
    timerLimit: 25 * 60, // 25 minutes in seconds
    seconds: 25 * 60,
  }

  componentDidMount() {
    this.interval = null
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  startTimer = () => {
    if (!this.state.isActive) {
      this.setState({isActive: true, isPaused: false})
      this.interval = setInterval(() => {
        this.setState(prevState => {
          if (prevState.seconds > 0) {
            return {seconds: prevState.seconds - 1}
          } else {
            clearInterval(this.interval)
            return {isActive: false, isPaused: false, seconds: 0}
          }
        })
      }, 1000)
    } else if (this.state.isPaused) {
      this.setState({isPaused: false})
      this.interval = setInterval(() => {
        this.setState(prevState => {
          if (prevState.seconds > 0) {
            return {seconds: prevState.seconds - 1}
          } else {
            clearInterval(this.interval)
            return {isActive: false, isPaused: false, seconds: 0}
          }
        })
      }, 1000)
    }
  }

  pauseTimer = () => {
    this.setState({isActive: false, isPaused: true})
    clearInterval(this.interval)
  }

  resetTimer = () => {
    this.setState({
      isActive: false,
      isPaused: false,
      seconds: this.state.timerLimit,
    })
    clearInterval(this.interval)
  }

  incrementTimer = () => {
    if (!this.state.isActive) {
      this.setState(prevState => {
        const newLimit = prevState.timerLimit + 60
        return {timerLimit: newLimit, seconds: newLimit}
      })
    }
  }

  decrementTimer = () => {
    if (!this.state.isActive) {
      this.setState(prevState => {
        const newLimit = Math.max(prevState.timerLimit - 60, 0)
        return {timerLimit: newLimit, seconds: newLimit}
      })
    }
  }

  formatTime = seconds => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds,
    ).padStart(2, '0')}`
  }

  render() {
    const {isActive, isPaused, seconds, timerLimit} = this.state
    const timerStatus = isActive ? 'Running' : isPaused ? 'Paused' : 'Paused'
    const buttonText = isActive ? 'Pause' : 'Start'
    const playPauseIcon = isActive
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    return (
      <div className="digital-timer">
        <h1>Digital Timer</h1>
        <h2 className="timer">{this.formatTime(seconds)}</h2>
        <p className="status">{timerStatus}</p>
        <img src={playPauseIcon} alt={isActive ? 'pause icon' : 'play icon'} />
        <button className="control-button" onClick={this.startTimer}>
          {buttonText}
        </button>
        <img
          src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
          alt="reset icon"
        />
        <button className="control-button" onClick={this.resetTimer}>
          Reset
        </button>
        <p>Set Timer limit</p>
        <p>{Math.floor(timerLimit / 60)}</p>
        <button className="control-button" onClick={this.incrementTimer}>
          +
        </button>
        <button className="control-button" onClick={this.decrementTimer}>
          -
        </button>
      </div>
    )
  }
}

export default DigitalTimer
