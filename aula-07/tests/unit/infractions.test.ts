import { Level } from "@prisma/client";
import * as infractionsRepository from "../../src/infractions-repository";
import * as usersRepository from "../../src/users-repository";
import * as infractionsService from "../../src/infractions-service";

describe("Infractions Service Tests", () => {

  jest
    .spyOn(infractionsRepository, "getInfractionsFrom")
    .mockImplementationOnce((): any => {console.log("ola")})

  jest
    .spyOn(usersRepository, "getUserByDocument")
    .mockImplementationOnce((): any => {
      return {
        id: 123,
        firstName: "teste",
        lastName: "teste",
        licenseId: 123
      }
    })

  it("should get infractions from user", async () => {
    const infractions = await infractionsService.getInfractionsFrom("123");
    expect(usersRepository.getUserByDocument).toBeCalled();
    expect(infractionsRepository.getInfractionsFrom).toBeCalled();
  });

  jest
  .spyOn(infractionsRepository, "getInfractionsFrom")
  .mockImplementationOnce((): any => {
    return undefined;
  })

  it("should throw an error when driver license does not exists", () => {
    const infractions = infractionsService.getInfractionsFrom("123");
    expect(infractions).rejects.toEqual({
      type: "NOT_FOUND", message: "Driver not found."
    });
  })
});