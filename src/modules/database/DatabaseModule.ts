import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (ConfigService: ConfigService) => ({
                type: 'mysql',
                host: ConfigService.getOrThrow('DB_HOST'),
                port: ConfigService.getOrThrow('DB_PORT'),
                username: ConfigService.getOrThrow('DB_USERNAME'),
                password: ConfigService.getOrThrow('DB_PASSWORD'),
                database: ConfigService.getOrThrow('DB_NAME'),
                entities: [__dirname + '/../**/*Entity{.ts,.js}'],
                autoLoadEntities: true,
                synchronize: true,
            }),
            inject: [ConfigService],
        })
    ],
})
export class DatabaseModule {}
