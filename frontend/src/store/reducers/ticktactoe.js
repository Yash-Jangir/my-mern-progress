import { createSlice } from "@reduxjs/toolkit";

// helper functions
const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const isWinConditionMeet = (board, mark) => {
    return winCondition.some(
        ([a, b, c]) => (
            (mark ? board[a] === mark : board[a]) &&
            board[a] === board[b] &&
            board[a] === board[c]
        )
    )

}

const isWinnableConditionAboutToMet = (board, emptySpots, mark) => {
    for (let i = 0; i < emptySpots.length; i++) {
        const tmp = [...board]
        tmp[emptySpots[i]] = mark
        if (isWinConditionMeet(tmp)) return emptySpots[i]
    }

    return false
}
const getEmptySpots = (board) => board.map((mark, i) => !mark && String(i)).filter(value => Boolean(value))


// initial state
const initialState = {
    gameState: false,
    board: Array.from({ length: 9 }, () => null),
    playerMark: null,
    computerMark: null,
    resultText: null,
    currentTurn: "player",
    infoText: "Select Your Mark",
}

// create slice
const tickTacToeSlice = createSlice({
    name: "ticktactoe",
    initialState,
    reducers: {
        reset: (state, { payload }) => {
            if (payload) {
                Object.assign(state, initialState)
            } else {
                Object.assign(state, {
                    resultText: null,
                    board: Array.from({ length: 9 }, () => null),
                    gameState: "playing",
                })
            }
        },
        setPlayerMark(state, { payload }) {
            state.playerMark = payload
            state.computerMark = payload === "x" ? "o" : "x"
            state.gameState = "playing"
            state.infoText = "Select Your Square"
        },
        fillSquareWithMark: (state, { payload }) => {
            state.board[payload] = state.playerMark
            state.currentTurn = "computer"
            state.infoText = "Computer's Turn..."
            state.gameState = "drawResult"
        },
        makeComputerMove: (state) => {
            const emptySpots = getEmptySpots(state.board)
            const randomSpot = Math.floor(Math.random() * emptySpots.length)

            let computerMoveIndex = isWinnableConditionAboutToMet(state.board, emptySpots, state.computerMark) ||
                isWinnableConditionAboutToMet(state.board, emptySpots, state.playerMark) ||
                emptySpots[randomSpot]

            state.board[+computerMoveIndex] = state.computerMark
            state.currentTurn = "player"
            state.infoText = "Select Your Square"
            state.gameState = "drawResult"
        },
        drawResult: (state) => {
            if (isWinConditionMeet(state.board, state.playerMark)) {
                state.resultText = "Congrats! You Win the Game"
                state.gameState = "end"
            } else if (isWinConditionMeet(state.board, state.computerMark)) {
                state.resultText = "Oops! Computer Wins the Game"
                state.gameState = "end"
            } else if (getEmptySpots(state.board).length === 0) {
                state.resultText = "Game Drawn"
                state.gameState = "end"
            } else {
                state.gameState = "playing"
            }
        }
    },
})

export const { reset, setPlayerMark, fillSquareWithMark, makeComputerMove, drawResult } = tickTacToeSlice.actions
export default tickTacToeSlice.reducer
