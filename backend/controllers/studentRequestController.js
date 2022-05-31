const StudentRequest = require("../models/StudentRequests")

// @desc create student request to supervisor or co-supervisor
// @route POST /api/v1/requests/newRequest
// @access Private
const createRequest = async (req, res) => {
    const { group, staffMember } = req.body

    try {
        const newRequest = await StudentRequest.create({
            group,
            staffMember
        })

        if(newRequest)
            res.status(201).json(newRequest)
        
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}

// @desc get student requests made to a certain staff member
// @route GET /api/v1/requests/getRequestByStaffId/:staffId
// @access Private
const getRequestByStaffMember = async (req, res) => {
    const staffId = req.params.staffId

    try {
        const request = await StudentRequest.find({staffMember: staffId})
        if(request)
            res.status(200).json(request)
    } catch (error) {
        res.status(500).json({
            ERR_CODE: error.code,
            message: "Could not find the request"
        })
    }
}

// @desc get student requests made by a certain group
// @route GET /api/v1/requests/getRequestByGroup/:groupId
// @access Private
const getRequestByGroup = async (req, res) => {
    const groupId = req.params.groupId

    try {
        const request = await StudentRequest.find({group: groupId})
        if(request)
            res.status(200).json(request)
    } catch (error) {
        res.status(500).json({
            ERR_CODE: error.code,
            message: "Could not find the request"
        })
    }
}

// @desc delete student request
// @route DELETE /api/v1/requests/deleteRequest/:id
// @access Private
const deleteRequest = async (req, res) => {
    const id = req.params.id

    try {
        const deletionInfo = await StudentRequest.deleteOne({_id: id})
        if(deletionInfo)
            res.status(200).json(deletionInfo)
    } catch (error) {
        res.status(500).json({
            ERR_CODE: error.code,
            message: "Could not find the request"
        })
    }
}

module.exports = { createRequest, getRequestByGroup, getRequestByStaffMember, deleteRequest }