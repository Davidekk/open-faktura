import React from 'react';
import {Document, Page, StyleSheet, Text, View} from '@react-pdf/renderer';

// Definícia farieb
const colors = {
    primary: '#283593', // Hlavná farba
    secondary: '#ECEFF1', // Sekundárna farba
};


const styles = StyleSheet.create({
    page: {
        display: 'flex',
        flexDirection: "column",
        backgroundColor: '#E4E4E4',
        fontFamily: 'Oswald'
    },
    section: {
        display: 'flex',
        flexDirection: "row",
        margin: 10,
        padding: 10,
        backgroundColor: 'white'
    }, left: {
        display: "flex",
        flexDirection: 'column',
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 200,
    },

    right: {
        padding: 5,
        // width: '66%', //<- working alternative
        flexShrink: 1,
        flexGrow: 2,
    },
});


// Komponent faktúry
const Invoice = ({invoice}) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Faktúra č. </Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.left}>Dodávateľ / Auftragnehmer:</Text>
                <Text style={styles.right}>Odoberateľ / Auftraggeber:</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.left}>
                        <Text style={styles.subtitle}>Odberateľ:</Text>
                        <Text style={styles.text}>nazov</Text>
                        <Text style={styles.text}>adresa</Text>
                        <Text style={styles.text}>dic</Text>
                        <Text style={styles.text}>ico</Text>
                </Text>
                <Text style={styles.right}>
                    <Text style={styles.subtitle}>Odberateľ:</Text>
                    <Text style={styles.text}>nazov</Text>
                    <Text style={styles.text}>adresa</Text>
                    <Text style={styles.text}>dic</Text>
                    <Text style={styles.text}>ico</Text>

                </Text>
            </View>
            <View style={styles.tableContainer}>
                <Text style={styles.subtitle}>Polozky faktúry:</Text>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableCol}>Názov</Text>
                    <Text style={styles.tableCol}>Množstvo</Text>
                    <Text style={styles.tableCol}>Cena</Text>
                    <Text style={styles.tableCol}>Celkom</Text>
                </View>
                {/*{invoice.polozky.map((polozka, index) => (*/}
                {/*    <View key={index} style={styles.tableRow}>*/}
                {/*        <Text style={styles.tableCol}>polozka</Text>*/}
                {/*        <Text style={styles.tableCol}>mnozstvo</Text>*/}
                {/*        <Text style={styles.tableCol}>cena</Text>*/}
                {/*        <Text style={styles.tableCol}>final</Text>*/}
                {/*    </View>*/}
                {/*))}*/}
            </View>

            <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Celková suma:</Text>
                <Text style={styles.totalAmount}>celkova suma</Text>
            </View>
        </Page>
    </Document>
);


export default Invoice;
