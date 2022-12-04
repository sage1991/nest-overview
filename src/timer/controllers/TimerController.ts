import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common"

import { Public } from "../../core"

@Public()
@Controller("timer")
export class TimerController {
  @Get(":timeout")
  async resolve(@Param("timeout", ParseIntPipe) timeout: number) {
    await sleep(timeout)
    return null
  }
}

const sleep = (timeout: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, timeout)
  })
