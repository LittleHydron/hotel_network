import * as fs from "fs";
import { parse } from "csv-parse";
import * as path from "path";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { HotelEntity } from "@entities/HotelEntity";

@Entity('room')
export class RoomEntity {
    @PrimaryColumn()
    id: number;

    @ManyToOne(() => HotelEntity, hotel => hotel.rooms)
    hotel: HotelEntity;

    @Column()
    hotelId: number;

    @Column()
    number: number;

    @Column({ default: true})
    isAvailable: boolean;

    constructor(room: Partial<RoomEntity>) {
        Object.assign(this, room);
    }

    static parseObjectsFromCSV(): Promise<RoomEntity[]> {
        const csvFilePath = path.resolve(__dirname, "../../../../csv/rooms.csv");
    
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
                    let rooms: RoomEntity[] = [];
                    for (let room of result) {
                        rooms.push(new RoomEntity({
                            id: room.id,
                            hotelId: room.hotelId,
                            number: room.number,
                            isAvailable: room.isAvailable === 'true'
                        }));
                    }
                    resolve(rooms);
                }
            });
        });
    }
}