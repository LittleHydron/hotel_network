import generateHotelsCSV from './csv_generators/hotels_csv_generator';
import generateHotelsNetworks from './csv_generators/hotelsNetwork_csv_generator';
import generateLocationsCSV from './csv_generators/locations_csv_generator';
import generateReviewsCSV from './csv_generators/reviews_csv_generator';
import generateRoomsCSV from './csv_generators/rooms_csv_generator';
import generateUsersCSV from './csv_generators/users_csv_generator';

const defaultNumberOfRecords = 1000;

const numberOfRecords = parseInt(process.argv[2], 10) || defaultNumberOfRecords;

generateHotelsCSV(numberOfRecords);
generateHotelsNetworks(numberOfRecords);
generateLocationsCSV(numberOfRecords);
generateReviewsCSV(numberOfRecords);
generateRoomsCSV(numberOfRecords);
generateUsersCSV(numberOfRecords);
