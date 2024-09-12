import { Types } from "mongoose";
import TodoCollection from "../models/todoCollection.model.js";
import asyncExceptionWrapper from "../utils/asyncExceptionWrapper.js";
import TodoItem from "../models/todoItem.model.js";
const { ObjectId } = Types

const index = asyncExceptionWrapper(
    async (req, res, next) => {
        const user = req.user

        const collections = await TodoCollection.aggregate([
            {
                $match: {
                    userId: user._id,
                    deletedAt: null
                }
            },
            {
                $lookup: {
                    from: "todoitems",
                    localField: "_id",
                    foreignField: "collectionId",
                    as: "todoItems",
                    pipeline: [
                        {
                            $match: {
                                deletedAt: null
                            }
                        },
                        {
                            $project: {
                                id: "$_id",
                                todo: 1,
                                status: 1,
                                createdAt: 1,
                                updatedAt: 1,
                                collectionId: 1,
                                _id: 0,
                            }
                        }
                    ]
                }
            },
            {
                $project: {
                    id: "$_id",
                    title: 1,
                    color: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    todoItems: 1,
                    _id: 0,
                }
            }
        ])

        return res.status(200).json({
            data: collections,
            status: true,
            message: "Todo Collections fetched successfully"
        })
    }
)

const create = asyncExceptionWrapper(
    async (req, res, next) => {
        const user = req.user
        const { title, color } = req.body

        const collections = await TodoCollection.find({ userId: user._id, deletedAt: null })
        if (collections.length >= 4) {
            return next({
                status: 400,
                message: "Maximum 4 collections allowed"
            })
        }

        const collection = await TodoCollection.create({ title, color, userId: user._id })

        return res.status(201).json({
            data: collection,
            status: true,
            message: "Collection created successfully"
        })
    }
)

const show = asyncExceptionWrapper(
    async (req, res, next) => {
        const user = req.user
        const { id } = req.params

        const collection = await TodoCollection.aggregate([
            {
                $match: {
                    _id: ObjectId(id),
                    userId: user._id,
                    deletedAt: null
                }
            },
            {
                $lookup: {
                    from: "todoitems",
                    localField: "_id",
                    foreignField: "collectionId",
                    as: "todoItems",
                    pipeline: [
                        {
                            $project: {
                                id: "$_id",
                                todo: 1,
                                status: 1,
                                createdAt: 1,
                                updatedAt: 1,
                                collectionId: 1,
                                _id: 0,
                            }
                        }
                    ]
                }
            },
            {
                $project: {
                    id: "$_id",
                    title: 1,
                    color: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    todoItems: 1,
                    _id: 0,
                }
            }
        ])
        if (!collection.length) {
            return next({
                status: 404,
                message: "Collection not found"
            })
        }

        return res.status(200).json({
            data: collection[0],
            status: true,
            message: "Collection fetched successfully"
        })
    }
)

const update = asyncExceptionWrapper(
    async (req, res, next) => {
        const user = req.user
        const { id } = req.params

        const collection = await TodoCollection.findOne({ _id: id, userId: user._id, deletedAt: null })
        if (!collection) {
            return next({
                status: 404,
                message: "Collection not found"
            })
        }

        const {
            title = collection.title,
            color = collection.color
        } = req.body

        await collection.updateOne({ title, color })

        return res.status(200).json({
            data: collection,
            status: true,
            message: "Collection updated successfully"
        })
    }
)

const remove = asyncExceptionWrapper(
    async (req, res, next) => {
        const user = req.user
        const { id } = req.params

        const collection = await TodoCollection.findOne({ _id: id, userId: user._id, deletedAt: null })
        if (!collection) {
            return next({
                status: 404,
                message: "Collection not found"
            })
        }

        await collection.updateOne({ deletedAt: new Date() })
        await TodoItem.updateMany({ collectionId: collection._id }, { deletedAt: new Date() })

        return res.status(200).json({
            status: true,
            message: "Collection deleted successfully"
        })
    }
)

export default {
    index,
    create,
    show,
    update,
    remove
}
