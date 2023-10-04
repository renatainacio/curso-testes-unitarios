import { faker } from "@faker-js/faker";

import { createOrder, getOrderByProtocol } from "../../src/order-service";
import * as orderRepository from "../../src/order-repository";
import { OrderInput } from "../../src/validator";

jest
  .spyOn(orderRepository, "create")
  .mockImplementation(() : any => {});

jest
  .spyOn(orderRepository, "getByProtocol")
  .mockImplementation(() : any => {});

describe("Order Service Tests", () => {
  it("should create an order", async () => {
    const order = {      
      client: "teste",
      description: "teste"
    }
    await createOrder(order);
    expect(orderRepository.create).toBeCalledWith(order);
  });

  it("should return an order based on the protocol", async () => {
    const protocol = "123456"
    await getOrderByProtocol(protocol);
    expect(orderRepository.getByProtocol).toBeCalledWith(protocol);
  });

  it("should return status INVALID when protocol doesn't exists", async () => {
    const protocol = "123456"
    const order = await getOrderByProtocol(protocol);
    expect(order.status).toBe('INVALID');
  });
});