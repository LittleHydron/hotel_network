import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';

interface HotelNetwork {
    id: number;
    name: string;
}

async function generateHotelsNetworks(number: number): Promise<void> {
    const csvWriter = createCsvWriter({
        path: 'csv/hotelsNetworks.csv',
        header: [
            {id: 'id', title: 'id'},
            {id: 'name', title: 'name'}
        ]
    });

    const hotelNetworks: HotelNetwork[] = Array.from({ length: number }, (_, i) => ({
        id: i + 1,
        name: `Hotel Network${i + 1}`
    }));

    return await csvWriter.writeRecords(hotelNetworks)
        .then(() => console.log('The hotelNetworks.csv file was written successfully'));
}

export default generateHotelsNetworks;