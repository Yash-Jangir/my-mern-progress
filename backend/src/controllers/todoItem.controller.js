import TodoCollection from "../models/todoCollection.model.js";
import TodoItem from "../models/todoItem.model.js";
import asyncExceptionWrapper from "../utils/asyncExceptionWrapper.js";

const create = asyncExceptionWrapper(
    async (req, res, next) => {
        const user = req.user
        const { todo, collectionId, status } = req.body
        const collection = await TodoCollection.findOne({ _id: collectionId, userId: user._id })

        if (!collection) {
            return next({
                status: 401,
                message: "Unauthorized"
            })
        }

        const todoItem = await TodoItem.create({ todo, status, collectionId, userId: user._id })

        return res.status(201).json({
            data: todoItem,
            status: true,
            message: "Todo created successfully"
        })
    }
)

const show = asyncExceptionWrapper(
    async (req, res, next) => {
        const user = req.user
        const { id } = req.params

        const todo = await TodoItem.findOne({ _id: id, userId: user._id, deletedAt: null })
        if (!todo) {
            return next({
                status: 404,
                message: "Todo not found"
            })
        }

        return res.status(200).json({
            data: todo,
            status: true,
            message: "Todo fetched successfully"
        })
    }
)

const update = asyncExceptionWrapper(
    async (req, res, next) => {
        const user = req.user
        const { id } = req.params

        const todo = await TodoItem.findOne({ _id: id, userId: user._id, deletedAt: null })
        if (!todo) {
            return next({
                status: 404,
                message: "Todo not found"
            })
        }

        const {
            todo: newTodo = todo.todo,
            status = todo.status
        } = req.body

        todo.todo = newTodo
        todo.status = status
        await todo.save()

        return res.status(200).json({
            data: todo,
            status: true,
            message: "Todo updated successfully"
        })
    }
)

const remove = asyncExceptionWrapper(
    async (req, res, next) => {
        const user = req.user
        const { id } = req.params

        const todo = await TodoItem.findOne({ _id: id, userId: user._id, deletedAt: null })
        if (!todo) {
            return next({
                status: 404,
                message: "Todo not found"
            })
        }

        await todo.updateOne({ deletedAt: new Date() })

        return res.status(200).json({
            status: true,
            message: "Todo deleted successfully"
        })
    }
)

const toggleStatus = asyncExceptionWrapper(
    async (req, res, next) => {
        const user = req.user
        const { id } = req.params

        const todo = await TodoItem.findOne({ _id: id, userId: user._id, deletedAt: null })
        if (!todo) {
            return next({
                status: 404,
                message: "Todo not found"
            })
        }

        await todo.updateOne({ status: !todo.status })

        return res.status(200).json({
            status: true,
            data: {
                status: !todo.status
            },
            message: "Todo deleted successfully"
        })
    }
)

export default {
    create,
    show,
    update,
    remove,
    toggleStatus
}
