import createStore from "./shared/mockStore";

let store = createStore();

beforeEach(function () {
  store = createStore();
});

describe("Suite Products reducer", function () {
  test("Products reducer / blanck", function () {
    expect(0).toBe(0);
  });
});
