import * as fs from "fs";
import { parse } from "csv-parse";
import * as path from "path";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { RoomEntity } from "@entities/RoomEntity";
import { ReviewEntity } from "@entities/ReviewEntity";
import { LocationEntity } from "@entities/LocationEntity";
import { HotelsNetworkEntity } from "@entities/HotelsNetworkEntity";

@Entity('hotel')
export class HotelEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    hotelsNetworkId: number;

    @ManyToOne(() => HotelsNetworkEntity, hotelsNetwork => hotelsNetwork.hotels)
    hotelsNetwork: HotelsNetworkEntity;

    @Column()
    name: string;

    @Column()
    locationId: number;

    @ManyToOne(() => LocationEntity, location => location.hotels)
    location: LocationEntity;

    @OneToMany(() => RoomEntity, room => room.hotel)
    rooms: RoomEntity[];

    @OneToMany(() => ReviewEntity, review => review.hotel)
    reviews: ReviewEntity[];

    constructor(hotel: Partial<HotelEntity>) {
        Object.assign(this, hotel);
    }

    static parseObjectsFromCSV(): Promise<HotelEntity[]> {
        const csvFilePath = path.resolve(__dirname, "../../../../csv/hotels.csv");
    
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
                    let hotels: HotelEntity[] = [];
                    for (let hotel of result) {
                        hotels.push(new HotelEntity(hotel));
                    }
                    resolve(hotels);
                }
            });
        });
    }
}