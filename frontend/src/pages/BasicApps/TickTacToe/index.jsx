import { useDispatch, useSelector } from "react-redux"
import { drawResult, fillSquareWithMark, makeComputerMove, reset, setPlayerMark } from "../../../store/reducers/ticktactoe"
import { useEffect } from "react"

export default function TickTacToe() {
    const dispatch = useDispatch()
    const { infoText, gameState, resultText, board, currentTurn } = useSelector(state => state.ticktactoe)

    const onSquareClick = (i) => {
        if (board[i]) return
        dispatch(fillSquareWithMark(i))
    }

    useEffect(() => {
        let timer = null
        if (gameState === "drawResult") {
            dispatch(drawResult())
        } else if(currentTurn === "computer") {
            timer = setTimeout(() => {
                dispatch(makeComputerMove())
            }, 1200)
        }

        return () => clearTimeout(timer)
    }, [gameState])

    return (
        <div className="content" id="ticktactoe">
            <div className="main">
                <h3>{infoText}</h3>
                {
                    !gameState && <div className="marks">
                        <button
                            onClick={_ => dispatch(setPlayerMark("x"))}
                            style={{ marginRight: "28px" }}
                        >
                            X
                        </button>
                        <button
                            onClick={_ => dispatch(setPlayerMark("o"))}
                        >O</button>
                    </div>
                }

                {
                    ["playing", "drawResult"].includes(gameState) &&
                    <div className="board">
                        {
                            board.map((mark, i) =>
                                <Square key={i} mark={mark} onSquareClick={() => currentTurn === "player" && !mark && onSquareClick(i)} />
                            )
                        }
                    </div>
                }

                {
                    gameState === "end" && <div className="result">
                        <p className="result-text">
                            {resultText}
                        </p>
                        <div className="button-group">
                            <button
                                className="cancel"
                                onClick={_ => dispatch(reset(true))}
                            >
                                <i style={{ marginRight: "20px" }} className="fa-solid fa-circle-arrow-left" />
                                Reset
                            </button>
                            <button
                                className="primary"
                                onClick={_ => dispatch(reset())}
                            >
                                Play Again
                                <i style={{ marginLeft: "20px" }} className="fa-solid fa-rotate" />
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}


function Square({ mark, onSquareClick = () => null }) {
    return (
        <div
            onClick={onSquareClick}
            className={`square ${mark?.toLowerCase()} ${!mark && "clickable"}`}
        >{mark}</div>
    )
}
