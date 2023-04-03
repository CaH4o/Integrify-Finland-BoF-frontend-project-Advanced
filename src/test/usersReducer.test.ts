import createStore from "./shared/mockStore";

let store = createStore();

beforeEach(function () {
  store = createStore();
});

describe("Suite Users reducer", function () {
  test("Users reducer / blanck", function () {
    expect(0).toBe(0);
  });
});
