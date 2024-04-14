import * as fs from "fs";
import { parse } from "csv-parse";
import * as path from "path";
import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { HotelEntity } from "./HotelEntity";

@Entity('location')
export class LocationEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @OneToMany(() => HotelEntity, hotel => hotel.location)
    hotels: HotelEntity[];

    constructor(location: Partial<LocationEntity>) {
        Object.assign(this, location);
    }

    static parseObjectsFromCSV(): Promise<LocationEntity[]> {
        const csvFilePath = path.resolve(__dirname, "../../../../csv/locations.csv");
    
        const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
        
        return new Promise((resolve, reject) => {
            parse(fileContent, {
                delimiter: ',',
                columns: true,
                cast: true,
                cast_date: false,
            }, (error, result: any[]) => {
                if (error) {
                    console.error("Error parsing CSV:", error);
                    reject(error);
                } else {
                    let locations: LocationEntity[] = [];
                    for (let location of result) {
                        locations.push(new LocationEntity(location));
                    }
                    resolve(locations);
                }
            });
        });
    }

    static getFields(): string[] {
        return ['latitude', 'longitude'];
    }
}