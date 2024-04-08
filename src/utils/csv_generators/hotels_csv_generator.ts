import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';

interface Hotel {
    id: number;
    hotelsNetworkId: number;
    name: string;
    locationId: number;
}

async function generateHotelsCSV(number: number): Promise<void> {
    const csvWriter = createCsvWriter({
        path: 'csv/hotels.csv',
        header: [
            {id: 'id', title: 'id'},
            {id: 'hotelsNetworkId', title: 'hotelsNetworkId'},
            {id: 'name', title: 'name'},
            {id: 'locationId', title: 'locationId'}
        ]
    });

    const hotels: Hotel[] = Array.from({ length: number }, (_, i) => ({
        id: i + 1,
        hotelsNetworkId: Math.floor(Math.random() * number) + 1,
        name: `Hotel${i + 1}`,
        locationId: Math.floor(Math.random() * number) + 1
    }));

    return await csvWriter.writeRecords(hotels)
        .then(() => console.log('The hotels.csv file was written successfully'));
}

export default generateHotelsCSV;
