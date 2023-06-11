import {OK} from "http-status-codes";
import {BadRequestError} from "../error/index.js";
import Clients from "../models/Clients.js";
import checkPermission from "../utils/CheckPermission.js";
import BadRequest from "../error/bad-request.js";

const getClients = async (req, res) => {


    const clients = await Clients.find({userId: req.user.userId})


    res.status(OK).json({clients, length: clients.length})

}


const createClient = async (req, res) => {
    const {name, lastName, street, city} = req.body

    if (!name || !lastName || !street || !city)
        throw new BadRequest("Prosím vyplnte všetky hodnoty")

    const client = await Clients.create({userId: req.user.userId, ...req.body})


    res.status(OK).json({client})

}


const deleteClient = async (req, res) => {
    const {id} = req.params

    const client = await Clients.find({_id: id})

    checkPermission(req.user.userId, client[0].userId.toString())
    await Clients.deleteOne({_id: id})


    res.status(OK).json({msg: "deleted"})
}

const updateClient = async (req, res) => {
    const {setActive, setInActive} = req.body

    const active = await Clients.find({_id: setActive})
    if (!active)
        throw new BadRequest(`No client with id: ${setActive}`)

    await Clients.findOneAndUpdate({_id: setActive}, {active: true}, {
        new: true,
        runValidators: true
    })


    if (setInActive) {
        await Clients.findOneAndUpdate({_id: setInActive}, {active: false}, {
            new: true,
            runValidators: true
        })
    }

    res.status(OK).json({msg: "updated"})
}


export {getClients, createClient, deleteClient, updateClient}