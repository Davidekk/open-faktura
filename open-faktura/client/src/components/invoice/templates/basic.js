import React from 'react';
import {Document, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import {printFormat} from 'iban'

// Definícia farieb
const colors = {
    primary: '#283593', // Hlavná farba
    secondary: '#ECEFF1', // Sekundárna farba
};

const styles = StyleSheet.create({
    page: {
        display: 'flex', flexDirection: 'column', backgroundColor: '#E4E4E4', fontFamily: 'Oswald'
    }, title: {
        fontSize: "20", padding: 10
    }, section: {
        display: 'flex', flexDirection: 'row', margin: 5, backgroundColor: 'white',
    }, left: {
        flexGrow: 1, flexShrink: 1, flexBasis: 200,
    }, right: {
        padding: 1, flexShrink: 1, flexGrow: 2,
    }, column: {
        flexDirection: 'column', margin: 5, padding: 5, backgroundColor: 'white',
    }, subtitle: {
        fontSize: 12, marginBottom: 5,
    }, text: {
        fontSize: 10, marginBottom: 2,
    }, line: {
        borderBottomWidth: 1, borderBottomColor: 'black', marginTop: 5, marginBottom: 5,
    }, background: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 30,
        backgroundColor: 'white',
        paddingRight: 30
    }, left75: {
        flexGrow: 1, flexShrink: 1, flexBasis: 200,
    }, right75: {
        padding: 1, flexShrink: 2, flexGrow: 20,
    }, description: {
        fontSize: "12", padding: 10
    }, item: {
        fontSize: "8", padding: 1
    }, row: {
        flexDirection: "row", width: "100%", fontSize: "9"
    }, titleInvoice: {
        padding: 0, margin: 0, flexDirection: "row", fontSize: "9"
    }, totalAmount: {
        fontSize: "15", padding: 10
    }, left65: {
        flexGrow: 1, flexShrink: 1, flexBasis: 200,
    }, right65: {
        padding: 1, flexShrink: 2, flexGrow: 3,
    },
});

const formatDate = (date) => {
    let day = date?.getDate()
    let moth = date?.getMonth() + 1
    let year = date?.getFullYear()

    return `${day}.${moth}.${year}`;

}

// Komponent faktúry
const Invoice = ({invoice}) => {
    return (<Document>
    <Page size="A4" style={styles.page}>
        <View style={styles.section}>
            <Text style={styles.title}>Faktúra č. {invoice.invoiceToAdd.invoiceValue.invoiceNumberOf} </Text>
        </View>
        <View style={styles.section}>
            <View style={[styles.left, styles.column]}>
                <Text style={styles.subtitle}>Dodávateľ / Auftragnehmer:</Text>
                <Text style={styles.text}>{invoice?.user.name} {invoice?.user?.lastName}</Text>
                <Text style={styles.text}>{invoice?.user.street}</Text>
                <Text style={styles.text}>{invoice?.user.city} {invoice?.user?.zip}</Text>
                <Text style={styles.text}>{invoice?.user.taxID}</Text>
                <Text style={styles.text}>{invoice?.user.businessID}</Text>
                <View style={styles.line}/> {/* Pridaná čiara */}
            </View>
            <View style={[styles.right, styles.column]}>
                <Text style={styles.subtitle}>Odoberateľ / Auftraggeber:</Text>
                <Text style={styles.text}>{invoice?.activeClient?.name} {invoice?.activeClient?.lastName}</Text>
                <Text style={styles.text}>{invoice?.activeClient?.street} </Text>
                <Text style={styles.text}>{invoice?.activeClient?.city} {invoice?.activeClient?.zip} </Text>
                <Text style={styles.text}>DIC: {invoice?.activeClient?.taxID}</Text>
                <Text style={styles.text}>ICO: {invoice?.activeClient?.businessID}</Text>
                <View style={styles.line}/> {/* Pridaná čiara */}
            </View>
        </View>
        <View style={styles.section}>
            <View style={[styles.left75, styles.column]}>
                <Text style={styles.text}>Dátum plnenia / Leistungsdatum: </Text>
                <Text style={styles.text}>Dátum vystavenia / Austellungsdatum: </Text>
                <Text style={styles.text}>Dátum splatnosti / Fälligkeitsdatum: </Text>
            </View>
            <View style={[styles.right75, styles.column]}>
                <Text style={styles.text}>{formatDate(invoice?.invoiceToAdd.invoiceValue.startDate) || "25.25.25"} </Text>
                <Text style={styles.text}>{formatDate(invoice?.invoiceToAdd.invoiceValue.issueDate) || "25.25.25"}</Text>
                <Text style={styles.text}>{formatDate(invoice?.invoiceToAdd.invoiceValue.dueDate) || "25.25.25"}</Text>
            </View>
        </View>
        <View style={styles.section}>
            <View style={styles.column}>
                <Text style={styles.text}>Forma úhrady /
                    Zahlungsform: {invoice?.invoiceToAdd.invoiceValue.formOfPayment}</Text>
                <Text style={styles.text}>Banka dodávateľa / Bank des
                    Auftragnehmers: {invoice?.invoiceToAdd.invoiceValue.bank}</Text>
                <Text style={styles.text}>IBAN: {printFormat(invoice?.user.iban)} SWIFT/BIC: {invoice?.user.swift}</Text>
            </View>
            <View style={styles.line}/> {/* Pridaná čiara */}
        </View>
        <View style={styles.section}>
            <View style={styles.column}>
                <View style={styles.line}/> {/* Pridaná čiara */}
                <Text style={styles.description}>{invoice.invoiceToAdd.invoiceValue.description}</Text>
                <View style={styles.line}/> {/* Pridaná čiara */}
            </View>
        </View>
        <View style={styles.section}>
            <View style={styles.column}>
                <Text style={styles.subtitle}>Polozky faktúry:</Text>
                <View style={styles.titleInvoice}>
                    <Text style={{width: "5%"}}>Počet</Text>
                    <Text style={{width: "8%"}}>Jednotka</Text>
                    <Text style={{width: "50%"}}>Názov a popis produktu</Text>
                    <Text style={{width: "5%"}}>DPH</Text>
                    <Text style={{width: "20%"}}>Jednotková cena €</Text>
                    <Text style={{width: "15%"}}>Celkom €</Text>
                </View>
                <View style={styles.titleInvoice}>
                    <Text style={{width: "5%"}}>Anzahl</Text>
                    <Text style={{width: "8%"}}>Einheit</Text>
                    <Text style={{width: "50%"}}>Name und Beschreibung des Artikels</Text>
                    <Text style={{width: "5%"}}>MwSt.</Text>
                    <Text style={{width: "20%"}}>Einheitspreis €</Text>
                    <Text style={{width: "15%"}}>Gesamt €</Text>
                </View>
                <View style={styles.line}/> {/* Pridaná čiara */}
                {invoice?.invoiceToAdd?.invoice?.map(val => {
                    const {
                        value, invoiceDescription, final, formOfPayment, price, VAT
                    } = val

                    return <View style={styles.row} key={invoice.invoiceToAdd.id}>
                        <Text style={{width: "5%"}}>{value}</Text>
                        <Text style={{width: "8%"}}>{formOfPayment}</Text>
                        <Text style={{width: "50%"}}>{invoiceDescription}</Text>
                        <Text style={{width: "10%"}}>{VAT} €</Text>
                        <Text style={{width: "10%"}}>{price} €</Text>
                        <Text style={{width: "15%"}}>{final} €</Text>
                    </View>
                })}
                <View style={styles.line}/> {/* Pridaná čiara */}
            </View>
        </View>


        <View style={styles.section}>
            <View style={[styles.right65, styles.column]}>
                <Text style={styles.subtitle}>Faktúru vystavil: {invoice.user.name} {invoice.user.lastName}</Text>
            </View>
            <View style={[styles.left65, styles.column]}>
                <Text
                    style={styles.totalAmount}>DPH: {invoice?.invoiceToAdd.VAT === 0 || invoice?.invoiceToAdd.VAT === undefined ? "Nie som platcom DPH" : invoice?.invoiceToAdd?.VAT?.toFixed(2) + "%"}</Text>
                <Text style={styles.totalAmount}>Celková fakturovaná
                    suma: {invoice?.invoiceToAdd?.finalPrice?.toFixed(2)} €</Text>
            </View>
        </View>
    </Page>
</Document>)};

export default Invoice;
