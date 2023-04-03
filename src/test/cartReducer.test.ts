import createStore from "./shared/mockStore";

let store = createStore();

beforeEach(function () {
  store = createStore();
});

describe("Suite Carts reducer", function () {
  test("Carts reducer / blanck", function () {
    expect(0).toBe(0);
  });
});
