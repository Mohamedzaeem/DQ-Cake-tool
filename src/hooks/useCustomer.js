// hooks/useIdeas.js

import { useState, useEffect } from 'react';
import { tablesDB } from '../lib/appwrite';
import { ID } from '../lib/appwrite';

const databaseId = '68cedbcf002f3396cecc';
const tableId = 'customers';

export function useCustomer() {
    const [customers, setcustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetch = async () => {
         const promise = tablesDB.listRows({
        databaseId: databaseId,
        tableId: tableId
        });

        promise.then(function (response) {
            console.log(response);
            setcustomers(response.rows);
            setLoading(false);
        }, function (error) {
            console.log(error);
        });
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
