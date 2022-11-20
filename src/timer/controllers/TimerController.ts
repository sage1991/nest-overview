import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common"

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
