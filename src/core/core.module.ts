import { Module } from "@nestjs/common"
import { CatModule } from "../cats"

@Module({
  imports: [CatModule],
  exports: [CatModule]
})
export class CoreModule {}
