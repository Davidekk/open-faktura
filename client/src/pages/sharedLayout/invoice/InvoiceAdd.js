import React, {useEffect, useState} from 'react';
import Wrapper from "../../../assets/wrappers/FormDashboard";
import DatePicker from "react-datepicker";
import {BsTrash3} from "react-icons/bs"
import "react-datepicker/dist/react-datepicker.css";
import {FormRow, FormRowSelect, FormTextarea} from "../../../components";
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../../../context/AppContext";
import shortid from "shortid";
import Loading from "../../../components/Loading";


const initialState = {
    value: 1,
    payment: 'hod.',
    description: '',
    VAT: 'bez',
    price: 0,
    final: 0,
    setVAT: 'nie',
    startDate: new Date(),
    issueDate: new Date(),
    dueDate: new Date(),
    formOfPayment: 'Hotovost',
    bank: '',
    invoiceNumberOf: '',
    invoiceDescription: '',
    note: ''
}

const invoiceStats = {
    finalPrice: 0, VAT: 0
}

function InvoiceAdd() {
    const {addInvoice, invoiceEdit, isEditing, removeEdit, setActive, getClients, isLoading} = useAppContext()
    const [invoiceValue, setInvoiceValue] = useState(isEditing ? invoiceEdit.invoiceToAdd.invoiceValue : initialState)
    const [invoice, setInvoice] = useState(isEditing ? invoiceEdit.invoiceToAdd.invoice : [])
    const [value, setValue] = useState(isEditing ? invoiceEdit.invoiceToAdd : invoiceStats)
    const [id, setId] = useState(null)
    const navigate = useNavigate()


    const handleChange = (e) => {

        setInvoiceValue({...invoiceValue, [e.target.name]: e.target.value})
    }

    const handleRemove = (idx) => {
        const newArray = [...invoice];
        let deleted = newArray.splice(idx, 1);
        deleted = deleted[0]

        let vatPrice = 0
        if (deleted.VAT !== 'bez') {
            vatPrice = deleted.final / 100 * deleted.VAT
        }

        setValue({
            finalPrice: value.finalPrice - deleted.final, VAT: value.VAT - vatPrice
        })
        setInvoice(newArray);
    }

    const addInvoiceValue = (e) => {
        e.preventDefault()
        let vatPrice = 0
        if (invoiceValue.VAT !== 'bez') {
            vatPrice = invoiceValue.final / 100 * invoiceValue.VAT

        }
        setValue({
            finalPrice: invoiceValue.final + value.finalPrice, VAT: value.VAT + vatPrice

        })
        // invoiceValue.id = shortid.generate()
        setInvoice([...invoice, invoiceValue])

    }

    const handleChangeDate = async (name, e) => {
        await setInvoiceValue({...invoiceValue, [name]: e})
    }

    const addInvoiceFun = async (e) => {
        e.preventDefault()

        const copy = JSON.parse(JSON.stringify(invoiceValue))
        copy['startDate'] = new Date(invoiceValue.startDate)
        copy['issueDate'] = new Date(invoiceValue.issueDate)
        copy['dueDate'] = new Date(invoiceValue.dueDate)
        const invoiceObj = {
            invoiceValue: copy,
            invoice: [...invoice], ...value,
            id
        }
        invoiceObj.invoiceValue.startDate = new Date(invoiceValue.startDate)
        invoiceObj.invoiceValue.issueDate = new Date(invoiceValue.issueDate)
        invoiceObj.invoiceValue.dueDate = new Date(invoiceValue.dueDate)
        await getClients()
        await addInvoice(invoiceObj)
        navigate('invoice')
    }

    useEffect(() => {
        if (isEditing) {
            setInvoiceValue(JSON.parse(JSON.stringify(invoiceValue)))
            setInvoiceValue({...invoiceValue, ['startDate']: new Date(invoiceValue.startDate)})
            setInvoiceValue({...invoiceValue, ['issueDate']: new Date(invoiceValue.issueDate)})
            setInvoiceValue({...invoiceValue, ['dueDate']: new Date(invoiceValue.dueDate)})
            setActive(invoiceEdit.activeClient)
            removeEdit()
            setId(invoiceEdit.invoiceToAdd?.id)
        } else {
            setId(shortid.generate())
        }
    }, [])

    useEffect(() => {
        if (invoiceValue.price === 0 || invoiceValue.value === 0) return

        setInvoiceValue({...invoiceValue, final: invoiceValue.value * invoiceValue.price})
    }, [invoiceValue.value, invoiceValue.price])

    if (isLoading)
        return <Loading/>

    return (<Wrapper>
        <div className='title-invoice'>
            <h4>Pridanie faktúry č.</h4>
            <FormRow value={invoiceValue.invoiceNumberOf} type='number' name="invoiceNumberOf" display
                     handleChange={handleChange}
                     style={{width: '3rem'}}/>
        </div>

        <form className="form" onSubmit={addInvoiceFun}>
            <button type="submit" className="btn  btn-to-right">Pridať faktúru</button>
            <article>
                <div className="date-picker">
                    <div className="title-date">Dátum plnenia:</div>
                    <DatePicker selected={invoiceValue.startDate} onChange={(e) => handleChangeDate("startDate", e)}/>
                </div>
                <div className="date-picker">
                    <div className="title-date">Dátum vystavenia:</div>
                    <DatePicker selected={invoiceValue.issueDate} onChange={(e) => handleChangeDate("issueDate", e)}/>
                </div>
                <div className="date-picker">
                    <div className="title-date">Dátum splatnosti:</div>
                    <DatePicker selected={invoiceValue.dueDate} onChange={(e) => handleChangeDate("dueDate", e)}/>
                </div>
            </article>
            <article>
                <div className="form-center">
                    <FormRowSelect
                        name='formOfPayment'
                        labelText='Spôsob platby'
                        value={invoiceValue.formOfPayment}
                        handleChange={handleChange}
                        list={['Hotovost', 'Bankový prevod']}
                    />
                    <FormRowSelect
                        name='VAT'
                        labelText='sazba DPH'
                        value={invoiceValue.VAT}
                        handleChange={handleChange}
                        list={['bez', '10', '20', 'vlastné']}
                    />
                    <FormRow name="bank" value={invoiceValue.bank}
                             handleChange={handleChange} type="text"
                             labelText="Banka dodávateľa"/>
                </div>
                <FormTextarea labelText="popis" value={invoiceValue.description}
                              handleChange={handleChange} name="description"/>
                <FormRow labelText="poznámka" value={invoiceValue.note}
                         handleChange={handleChange} name="note"/>
                <h5 className="title">Položky faktúry</h5>
                <div className="form-add">
                    <FormRow labelText="počet" value={invoiceValue.value} type="text" name="value"
                             handleChange={handleChange}/>
                    <FormRowSelect
                        name='formOfPayment'
                        labelText='Jednotka'
                        value={invoiceValue.formOfPayment}
                        handleChange={handleChange}
                        list={['hod.', 'ks', 'deň', "kg", 'g', 'm', 'km']}
                    />
                    <FormRow labelText="popis" value={invoiceValue.invoiceDescription} type="text"
                             name="invoiceDescription"
                             handleChange={handleChange}/>
                    <FormRow labelText="cena" value={invoiceValue.price} handleChange={handleChange} name="price"
                             type="text"/>
                    <FormRow labelText="celkom" value={invoiceValue.final} name="final" handleChange={handleChange}
                             type="text"/>
                </div>
            </article>
            <button type="button" className="btn btn-to-right" onClick={addInvoiceValue}>Pridať položku</button>

        </form>
        <hr/>
        {invoice.map((item, idx) => {
            const {
                value, payment, invoiceDescription, VAT, price, final
            } = item

            return <div key={idx} className="invoice-list">
                <div>{value}</div>
                <div>{payment}</div>
                <div>{invoiceDescription}</div>
                <div>{VAT} %</div>
                <div>{price}€</div>
                <div className="invoice-remove">{final}€
                    <button type="button" style={{background: "none", border: 'none', cursor: "pointer"}}
                            onClick={() => handleRemove(idx)}><BsTrash3/></button>
                </div>
            </div>
        })}
        <hr/>

        <div className="invoice-final">
            <div>
                <div>Spolu:</div>
                <div>DPH:</div>
                <div>K úhrade:</div>
            </div>
            <div>
                <div>{value.finalPrice.toFixed(2)} €</div>
                <div>{value.VAT.toFixed(2)} €</div>
                <div>{(value.finalPrice + value.VAT).toFixed(2)} €</div>
            </div>
        </div>
    </Wrapper>);
}

export default InvoiceAdd;