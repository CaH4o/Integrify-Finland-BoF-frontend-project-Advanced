import { usersGet } from "../api/usersWorker";
import createStore from "./shared/mockStore";

let store = createStore();

beforeEach(function () {
  store = createStore();
});

describe("Suite Users reducer", function () {
  test("Users reducer / init", function () {
    expect(store.getState().usersReducer.error).toBe(false);
    expect(store.getState().usersReducer.loading).toBe(false);
    expect(store.getState().usersReducer.users.length).toBe(0);
  });

  test("Users reducer / fetch all users", async function () {
    await store.dispatch(usersGet());
    expect(store.getState().usersReducer.error).toBe(false);
    expect(store.getState().usersReducer.loading).toBe(false);
    expect(store.getState().usersReducer.users.length).toBeGreaterThan(0);
  });
});
