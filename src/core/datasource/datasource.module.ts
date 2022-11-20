import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule, ConfigService } from "@nestjs/config"

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: "mysql",
        host: config.get("DATABASE_HOST"),
        port: config.get("DATABASE_PORT"),
        username: config.get("DATABASE_USER"),
        password: config.get("DATABASE_PASSWORD"),
        database: config.get("DATABASE_NAME"),
        autoLoadEntities: true,
        synchronize: true,
        ssl: false,
        allowPublicKeyRetrieval: true
      }),
      inject: [ConfigService]
    })
  ]
})
export class DataSourceModule {}
