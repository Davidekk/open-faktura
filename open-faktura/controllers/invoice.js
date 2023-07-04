import Invoice from "../models/Invoice.js";
import {OK} from "http-status-codes";
import badRequest from "../error/bad-request.js";
import shortid from "shortid";


const addInvoice = async (req, res) => {
    const {invoiceToAdd, user, activeClient} = req.body.invoiceObj

    if (!invoiceToAdd || !user || !activeClient)
        throw new badRequest("Zlé hodnoty, skúste znova!")

    const invoice = await Invoice.findOne({createdBy: req.user.userId})

    if (invoice) {
        let exist = invoice.invoices.filter(val => val.invoiceToAdd.id === invoiceToAdd.id)
        if (exist) {
            let update = invoice.invoices.filter(val => val.invoiceToAdd.id !== invoiceToAdd.id)
            await Invoice.findOneAndUpdate({createdBy: req.user.userId}, {
                invoices: [...update, {
                    invoiceToAdd,
                    user,
                    activeClient
                }]
            })

        } else {
            await Invoice.findOneAndUpdate({createdBy: req.user.userId}, {
                invoices: [...invoice.invoices, {
                    invoiceToAdd,
                    user,
                    activeClient
                }]
            })
        }

    } else {
        await Invoice.create({createdBy: req.user.userId, invoices: [{invoiceToAdd, user, activeClient}]})
    }

    res.status(OK).json({msg: "created!"})
}

const getInvoice = async (req, res) => {

    const invoices = await Invoice.findOne({createdBy: req.user.userId})

    res.status(OK).json({invoices, length: invoices.length})
}

const copyInvoice = async (req, res) => {
    const {invoiceId} = req.body
    const invoices = await Invoice.findOne({createdBy: req.user.userId})

    if (!invoices)
        throw new badRequest("Zlé id, skúste znova!")

    let copy = await invoices.invoices.filter(value => value.invoiceToAdd.id === invoiceId)

    if (copy) {
        const deepCopy = JSON.parse(JSON.stringify(copy[0]));
        deepCopy.invoiceToAdd.id = shortid.generate()
        await Invoice.findOneAndUpdate({createdBy: req.user.userId}, {
            invoices: [...invoices.invoices, deepCopy]
        })
    }
    res.status(OK).json({msg: "invoice"})
}

const deleteInvoice = async (req, res) => {
    const {id} = req.params
    const invoices = await Invoice.findOne({createdBy: req.user.userId})

    if (!invoices)
        throw new badRequest("Zlé id, skúste znova!")

    let copy = await invoices.invoices.filter(value => value.invoiceToAdd.id !== id)

    await Invoice.findOneAndUpdate({createdBy: req.user.userId}, {
        invoices: copy
    })
    res.status(OK).json({msg: "invoice"})
}


export {addInvoice, getInvoice, copyInvoice, deleteInvoice}