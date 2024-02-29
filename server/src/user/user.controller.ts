import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get(":userId")
  findUser(@Param("userId", ParseIntPipe) userId: number) {
    return this.userService.findUser(userId);
  }
}
