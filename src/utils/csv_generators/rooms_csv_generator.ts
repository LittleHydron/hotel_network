import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';

interface Room {
    id: number;
    hotelId: number;
    number: number;
    isAvailable: boolean;
}

async function generateRoomsCSV(number: number): Promise<void> {
    const csvWriter = createCsvWriter({
        path: 'csv/rooms.csv',
        header: [
            {id: 'id', title: 'id'},
            {id: 'hotelId', title: 'hotelId'},
            {id: 'number', title: 'number'},
            {id: 'isAvailable', title: 'isAvailable'}
        ]
    });

    const rooms: Room[] = Array.from({ length: number }, (_, i) => ({
        id: i + 1,
        hotelId: Math.floor(Math.random() * number) + 1,
        number: i + 1,
        isAvailable: Math.random() < 0.5
    }));

    return await csvWriter.writeRecords(rooms)
        .then(() => console.log('The rooms.csv file was written successfully'));
}

export default generateRoomsCSV;
