import * as fs from "fs";
import { parse } from "csv-parse";
import * as path from "path";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ReviewEntity } from "@entities/ReviewEntity";

@Entity('user')
export class UserEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @OneToMany(() => ReviewEntity, review => review.author)
    reviews: ReviewEntity[];

    constructor(user: Partial<UserEntity>) {
        Object.assign(this, user);
    }

    static parseObjectsFromCSV(): Promise<UserEntity[]> {
        const csvFilePath = path.resolve(__dirname, "../../../../csv/users.csv");
    
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
                    let users: UserEntity[] = [];
                    for (let user of result) {
                        users.push(new UserEntity(user));
                    }
                    resolve(users);
                }
            });
        });
    }
}