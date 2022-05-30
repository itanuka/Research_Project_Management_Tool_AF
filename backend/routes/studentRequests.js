const express = require("express")
const { getRequestByStaffMember, getRequestByGroup, createRequest, deleteRequest } = require("../controllers/studentRequestController")
const studentRequestsRouter = express.Router()


studentRequestsRouter.get('/getRequestByStaffId/:staffId', getRequestByStaffMember)
studentRequestsRouter.get('/getRequestByGroup/:groupId', getRequestByGroup)
studentRequestsRouter.post('/newRequest', createRequest)
studentRequestsRouter.delete('/deleteRequest/:id', deleteRequest)

module.exports = studentRequestsRouter