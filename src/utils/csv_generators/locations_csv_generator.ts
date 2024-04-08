import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';

interface Location {
    id: number;
    latitude: number;
    longitude: number;
}


async function generateLocationsCSV(number: number): Promise<void> {
    const csvWriter = createCsvWriter({
        path: 'csv/locations.csv',
        header: [
            {id: 'id', title: 'id'},
            {id: 'latitude', title: 'latitude'},
            {id: 'longitude', title: 'longitude'}
        ]
    });

    const locations: Location[] = Array.from({ length: number }, (_, i) => ({
        id: i + 1,
        latitude: parseFloat((Math.random() * 180 - 90).toFixed(6)),
        longitude: parseFloat((Math.random() * 360 - 180).toFixed(6))
    }));

    return await csvWriter.writeRecords(locations)
        .then(() => console.log('The locations.csv file was written successfully'));
}

export default generateLocationsCSV;
