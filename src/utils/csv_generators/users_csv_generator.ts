import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';

interface User {
    id: number;
    firstName: string;
    lastName: string;
}

async function generateUsersCSV(number: number): Promise<void> {
    const csvWriter = createCsvWriter({
        path: 'csv/users.csv',
        header: [
            {id: 'id', title: 'id'},
            {id: 'firstName', title: 'firstName'},
            {id: 'lastName', title: 'lastName'}
        ]
    });

    const users: User[] = Array.from({ length: number }, (_, i) => ({
        id: i + 1,
        firstName: `FirstName${i + 1}`,
        lastName: `LastName${i + 1}`
    }));

    return await csvWriter.writeRecords(users)
        .then(() => console.log('The users.csv file was written successfully'));
}

export default generateUsersCSV;
