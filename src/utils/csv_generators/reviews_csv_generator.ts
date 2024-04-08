import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';

interface Review {
    id: number;
    hotelId: number;
    authorId: number;
    mark: number;
    text: string;
    postDate: string;
}

async function generateReviewsCSV(number: number): Promise<void> {
    const csvWriter = createCsvWriter({
        path: 'csv/reviews.csv',
        header: [
            {id: 'id', title: 'id'},
            {id: 'hotelId', title: 'hotelId'},
            {id: 'authorId', title: 'authorId'},
            {id: 'mark', title: 'mark'},
            {id: 'text', title: 'text'},
            {id: 'postDate', title: 'postDate'}
        ]
    });

    const reviews: Review[] = Array.from({ length: number }, (_, i) => ({
        id: i + 1,
        hotelId: Math.floor(Math.random() * number) + 1,
        authorId: Math.floor(Math.random() * number) + 1,
        mark: Math.floor(Math.random() * 5) + 1,
        text: `This is a review text ${i + 1}`,
        postDate: `2024-04-0${Math.floor(Math.random() * 9) + 1}`
    }));

    return await csvWriter.writeRecords(reviews)
        .then(() => console.log('The reviews.csv file was written successfully'));
}

export default generateReviewsCSV;
