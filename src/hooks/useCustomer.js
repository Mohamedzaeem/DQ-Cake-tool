// hooks/useIdeas.js

import { useState, useEffect } from 'react';
import { tablesDB } from '../lib/appwrite';
import { ID } from '../lib/appwrite';
import { Query } from "appwrite";

const databaseId = '68cedbcf002f3396cecc';
const tableId = 'customers';

export function useCustomer() {
    const [customers, setcustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetch = async () => {
    let allRows = [];
    let cursor = null;

    try {
        while (true) {
            const response = await tablesDB.listRows({
                databaseId,
                tableId,
                queries: [
                    Query.limit(100),
                    ...(cursor ? [Query.cursorAfter(cursor)] : [])
                ]
            });

            allRows = [...allRows, ...response.rows];

            if (response.rows.length < 100) break; // no more rows
            cursor = response.rows[response.rows.length - 1].$id;
        }

        setcustomers(allRows);
        setLoading(false);
    } catch (error) {
        console.log(error);
    }
};

    const add = (firstName, lastName, email, phone, DateOrdered, description) => {
        const promise = tablesDB.createRow({
            databaseId: databaseId,
            tableId: tableId,
            rowId: ID.unique(),
            data: {
                FirstName:firstName,
                LastName:lastName,
                PhoneNumber:phone,
                Email:email,
                DateOrdered: DateOrdered,
                Description: description
            }
        });
        promise.then(function (response) {
             setcustomers((prev) => [...prev, response]);
        }, function (error) {
            console.log(error);
        });
    }


    useEffect(() => {
        fetch();
    }, []);

    return {
        customers,
        loading,
        fetch,
        add
    };
}
