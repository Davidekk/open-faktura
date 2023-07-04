import React, {useEffect} from 'react';
import {Document, Font, Page, PDFDownloadLink, PDFViewer, StyleSheet} from '@react-pdf/renderer';
import font from '../../assets/fonts/RobotoCondensed-Regular.ttf';
import {useAppContext} from '../../context/AppContext';
import {Basic} from './templates/index';

Font.register({
    family: 'Oswald',
    src: font,
});

function Invoice() {
    const {
        invoiceToAdd,
        user,
        street,
        city,
        ZIP: zip,
        getProfile,
        activeClient,
        taxID,
        businessID,
        addInvoiceToDB,
        swift,
        iban
    } = useAppContext();

    const invoice = {
        user: {
            name: user.name,
            lastName: user.lastName,
            city,
            zip,
            street,
            taxID,
            businessID,
            iban,
            swift
        },
        activeClient,
        invoiceToAdd: invoiceToAdd,
    };


    useEffect(() => {
        getProfile();
    }, []);


    const handleAdd = async () => {
        await addInvoiceToDB(invoice)
    }


    return (
        <div className="pdf-view">
            {/* Zobrazenie PDF */}
            <PDFViewer >
                <Basic invoice={invoice}/>
            </PDFViewer>

            <button type={"button"} className="btn btn-hero" onClick={handleAdd}>Pridať fakúru</button>

            {/*/!* Stiahnutie PDF *!/*/}
            {/*<PDFDownloadLink document={<Basic invoice={invoice}/>} fileName="somename.pdf">*/}
            {/*    {({blob, url, loading, error}) => (loading ? 'Loading document...' : 'Download now!')}*/}
            {/*</PDFDownloadLink>*/}
        </div>
    );
}

export default Invoice;
