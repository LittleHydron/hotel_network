import * as fs from "fs";
import { parse } from "csv-parse";
import * as path from "path";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { RoomEntity } from "@entities/RoomEntity";
import { ReviewEntity } from "./ReviewEntity";
import { LocationEntity } from "./LocationEntity";
import { HotelEntity } from "./HotelEntity";

@Entity('hotelsNetwork')
export class HotelsNetworkEntity {
    @PrimaryColumn()
    id: number;
    
    @Column()
    name: string;

    @OneToMany(() => HotelEntity, hotel => hotel.hotelsNetwork)
    hotels: HotelEntity[];

    constructor(hotelsNetwork: Partial<HotelsNetworkEntity>) {
        Object.assign(this, hotelsNetwork);
    }

    static parseObjectsFromCSV(): Promise<HotelsNetworkEntity[]> {
        const csvFilePath = path.resolve(__dirname, "../../../../csv/hotelsNetworks.csv");
    
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
                    let hotelsNetworks: HotelsNetworkEntity[] = [];
                    for (let hotelsNetwork of result) {
                        hotelsNetworks.push(new HotelsNetworkEntity(hotelsNetwork));
                    }
                    resolve(hotelsNetworks);
                }
            });
        });
    }
}