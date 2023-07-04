import React, {useEffect} from 'react';
import {useAppContext} from "../../../context/AppContext";
import Wrapper from "../../../assets/wrappers/InvoiceContainer";
import {useNavigate} from "react-router-dom";
import {LuCopy, LuDownload, LuEdit} from 'react-icons/lu'
import {TiDocumentDelete} from 'react-icons/ti'
import Loading from "../../../components/Loading";
import {Basic} from "../../../components/invoice/templates";
import {PDFDownloadLink} from "@react-pdf/renderer";

function InvoiceAll() {
    const {getInvoices, invoices, editInvoice, handleInvoice, isLoading} = useAppContext()
    const navigate = useNavigate()

    useEffect(() => {
        getInvoices()
    }, [])

    const handleClick = (invoice) => {
        editInvoice(invoice)
        navigate('/add-job')
    }


    const formatDate = (date) => {
        let day = date.getDate()
        let moth = date.getMonth() + 1
        let year = date.getFullYear()

        return `${day}.${moth}.${year}`;

    }

    const handleDownload = (invoice) => {
        invoice.invoiceToAdd.invoiceValue.startDate = new Date(invoice.invoiceToAdd.invoiceValue.startDate)
        invoice.invoiceToAdd.invoiceValue.issueDate = new Date(invoice.invoiceToAdd.invoiceValue.issueDate)
        invoice.invoiceToAdd.invoiceValue.dueDate = new Date(invoice.invoiceToAdd.invoiceValue.dueDate)

        return invoice
    }

    if (isLoading) {
        return <Loading/>
    }


    return (<Wrapper>
        {invoices?.invoices?.map(invoice => {
            return <div className="invoices" key={invoice.invoiceToAdd.id}>
                <div className="invoice"><span>Faktúra č. {invoice.invoiceToAdd.invoiceValue.invoiceNumberOf}</span>
                    <span> {invoice.invoiceToAdd.invoiceValue.note || invoice.invoiceToAdd.invoiceValue.description.substring(0, 17)}...</span>
                    <span>{invoice.invoiceToAdd.finalPrice} €</span></div>
                <div className="invoice">
                    <span>{formatDate(new Date(invoice.invoiceToAdd.invoiceValue.startDate))}</span>
                    <div className="invoice-icons" >

                        <PDFDownloadLink document={<Basic invoice={handleDownload(invoice)}/>} key={invoice.invoiceToAdd.id}
                                         fileName={`Faktúra č.${invoice.invoiceToAdd.invoiceValue.invoiceNumberOf} ${invoice.user.name} ${invoice.user.lastName.substring(0, 1)}.pdf`}>
                            {({blob, url, loading, error}) => (loading ? 'Loading document...' :
                                <LuDownload style={{fontSize: "2rem", cursor: "pointer"}}/>)}
                        </PDFDownloadLink>
                        <LuEdit onClick={() => handleClick(invoice)} style={{fontSize: "2rem", cursor: "pointer"}}/>
                        <LuCopy onClick={() => handleInvoice(invoice.invoiceToAdd.id)}
                                style={{fontSize: "2rem", cursor: "pointer"}}/>
                        <TiDocumentDelete onClick={() => handleInvoice(invoice.invoiceToAdd.id, true)}
                                          style={{fontSize: "2.2rem", color: "#e63946", cursor: "pointer"}}/>
                    </div>
                </div>
            </div>
        })}</Wrapper>);
}

export default InvoiceAll;