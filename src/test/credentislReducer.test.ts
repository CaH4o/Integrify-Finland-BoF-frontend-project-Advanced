import createStore from "./shared/mockStore";

let store = createStore();

beforeEach(function () {
  store = createStore();
});

describe("Suite Credantioal reducer", function () {
  test("Credential reducer / blanck", function () {
    expect(0).toBe(0);
  });
});
