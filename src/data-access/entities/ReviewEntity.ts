import * as fs from "fs";
import { parse } from "csv-parse";
import * as path from "path";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "@entities/UserEntity";
import { HotelEntity } from "./HotelEntity";

@Entity('review')
export class ReviewEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    hotelId: number;

    @ManyToOne(() => HotelEntity, hotel => hotel.reviews)
    hotel: HotelEntity;

    @Column()
    authorId: number;

    @ManyToOne(() => UserEntity, user => user.reviews)
    author: UserEntity;

    @Column()
    mark: number;

    @Column()
    text: string;

    @Column()
    postDate: string;

    constructor(review: Partial<ReviewEntity>) {
        Object.assign(this, review);
    }

    static parseObjectsFromCSV(): Promise<ReviewEntity[]> {
        const csvFilePath = path.resolve(__dirname, "../../../../csv/reviews.csv");
    
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
                    let reviews: ReviewEntity[] = [];
                    for (let review of result) {
                        console.log("Review: ", review);
                        reviews.push(new ReviewEntity(review));
                    }
                    resolve(reviews);
                }
            });
        });
    }
}