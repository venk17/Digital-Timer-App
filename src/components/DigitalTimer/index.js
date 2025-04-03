import React, { Component } from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timerLimitInMinutes: 25,
    timeElapsedInSeconds: 0,
  }

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  incrementTimerLimit = () => {
    const { isTimerRunning } = this.state

    if (!isTimerRunning) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
      }))
    }
  }

  decrementTimerLimit = () => {
    const { isTimerRunning, timerLimitInMinutes } = this.state

    if (!isTimerRunning && timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState({
      isTimerRunning: false,
      timeElapsedInSeconds: 0,
      timerLimitInMinutes: 25,
    })
  }

  getElapsedSecondsInTimeFormat = () => {
    const { timerLimitInMinutes, timeElapsedInSeconds } = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  startOrPauseTimer = () => {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state
    const isTimerComplete = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerComplete) {
      this.setState({ timeElapsedInSeconds: 0 })
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(() => {
        const {
          timerLimitInMinutes: limit,
          timeElapsedInSeconds: elapsed,
        } = this.state
        const isComplete = elapsed === limit * 60

        if (isComplete) {
          this.clearTimerInterval()
          this.setState({ isTimerRunning: false })
        } else {
          this.setState(prevState => ({
            timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
          }))
        }
      }, 1000)
    }
    this.setState(prevState => ({ isTimerRunning: !prevState.isTimerRunning }))
  }

  render() {
    const { isTimerRunning, timerLimitInMinutes } = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'
    const startOrPauseIconUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'
    const timerDisplayText = this.getElapsedSecondsInTimeFormat()

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-container">
          <div className="timer-display-container">
            <div className="elapsed-time-container">
              <h1 className="elapsed-time">{timerDisplayText}</h1>
              <p className="timer-state">{labelText}</p>
            </div>
          </div>
          <div className="controls-container">
            <div className="timer-controller-container">
              <button
                className="timer-controller-btn"
                onClick={this.startOrPauseTimer}
                type="button"
              >
                <img
                  alt={startOrPauseAltText}
                  className="timer-controller-icon"
                  src={startOrPauseIconUrl}
                />
                <p className="timer-controller-label">
                  {isTimerRunning ? 'Pause' : 'Start'}
                </p>
              </button>
              <button
                className="timer-controller-btn"
                onClick={this.onResetTimer}
                type="button"
              >
                <img
                  alt="reset icon"
                  className="timer-controller-icon"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                />
                <p className="timer-controller-label">Reset</p>
              </button>
            </div>
            <div className="timer-limit-controller-container">
              <p className="limit-label">Set Timer limit</p>
              <div className="timer-limit-controller">
                <button
                  className="limit-controller-button"
                  disabled={isTimerRunning}
                  onClick={this.decrementTimerLimit}
                  type="button"
                >
                  -
                </button>
                <div className="limit-label-and-value-container">
                  <p className="limit-value">{timerLimitInMinutes}</p>
                </div>
                <button
                  className="limit-controller-button"
                  disabled={isTimerRunning}
                  onClick={this.incrementTimerLimit}
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
