import createStore from "./shared/mockStore";
import { categoriesGet, productsGet } from "../api/productsWorker";

let store = createStore();

beforeEach(function () {
  store = createStore();
});

describe("Suite Products reducer", function () {
  test("Products reducer / init", function () {
    expect(store.getState().productsReducer.backUp.length).toBe(0);
    expect(store.getState().productsReducer.present.length).toBe(0);
    expect(store.getState().productsReducer.single.id).toBe(0);
    expect(store.getState().productsReducer.categories.length).toBe(0);
    expect(store.getState().productsReducer.loading).toBe(false);
    expect(store.getState().productsReducer.error).toBe(false);
    expect(store.getState().productsReducer.page).toBe(1);
    expect(store.getState().productsReducer.filters.search).toBe("");
    expect(store.getState().productsReducer.filters.categories.length).toBe(0);
  });

  test("Products reducer / fetch all products and categories", async function () {
    await store.dispatch(productsGet(""));
    await store.dispatch(categoriesGet());
    expect(store.getState().productsReducer.backUp.length).toBeGreaterThan(0);
    expect(store.getState().productsReducer.present.length).toBeGreaterThan(0);
    expect(store.getState().productsReducer.single.id).toBe(0);
    expect(store.getState().productsReducer.categories.length).toBeGreaterThan(0);
    expect(store.getState().productsReducer.loading).toBe(false);
    expect(store.getState().productsReducer.error).toBe(false);
  });

  test("Products reducer / fatch single product", async function () {
    await store.dispatch(productsGet(""));
    const id: number = store.getState().productsReducer.backUp[0].id;
    await store.dispatch(productsGet(id.toString()));
    expect(store.getState().productsReducer.single.id).toBe(id);
    expect(store.getState().productsReducer.loading).toBe(false);
    expect(store.getState().productsReducer.error).toBe(false);
  });
});
