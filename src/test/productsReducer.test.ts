import createStore from "./shared/mockStore";
import {
  categoriesGet,
  productsGet,
  productsPost,
  productsPut,
} from "../api/productsWorker";
import { IProduct, IProductCreate, IProductUpdate } from "../types/IProduct";
import {
  productFavoritAddRemove,
  productReset,
  productUpdatePresent,
  productsSearch,
  productsSelectCategories,
  productsSetPage,
  productsToggleFavorite,
} from "../redux/reducers/products";

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
    expect(store.getState().productsReducer.categories.length).toBeGreaterThan(
      0
    );
    expect(store.getState().productsReducer.loading).toBe(false);
    expect(store.getState().productsReducer.error).toBe(false);
  });

  test("Products reducer / fetch a single product", async function () {
    await store.dispatch(productsGet(""));
    const id: number = store.getState().productsReducer.backUp[0].id;
    await store.dispatch(productsGet(id.toString()));
    expect(store.getState().productsReducer.single.id).toBe(id);
    expect(store.getState().productsReducer.loading).toBe(false);
    expect(store.getState().productsReducer.error).toBe(false);
  });

  test("Products reducer / post a single product", async function () {
    const product: IProductCreate = {
      title: "New product",
      price: 2000,
      description: "New test product",
      categoryId: 1,
      images: [
        "https://www.readersdigest.ca/wp-content/uploads/2017/10/funny-photos-jen-st-louis-owl.jpg?w=750",
      ],
    };
    await store.dispatch(productsPost(product));
    expect(store.getState().productsReducer.single.id).toBeGreaterThan(0);
    expect(store.getState().productsReducer.single.title).toBe("New product");
    expect(store.getState().productsReducer.single.price).toBe(2000);
    expect(store.getState().productsReducer.single.description).toBe(
      "New test product"
    );
    expect(store.getState().productsReducer.single.category.id).toBe(1);
    expect(store.getState().productsReducer.single.images.length).toBe(1);
  });

  test("Products reducer / put a single product", async function () {
    const productCreted: IProductCreate = {
      title: "New product",
      price: 2000,
      description: "New test product",
      categoryId: 1,
      images: [
        "https://www.readersdigest.ca/wp-content/uploads/2017/10/funny-photos-jen-st-louis-owl.jpg?w=750",
      ],
    };
    await store.dispatch(productsPost(productCreted));
    const id: number = store.getState().productsReducer.single.id;
    const producUpdate: IProductUpdate = {
      id,
      title: "Updated product",
      price: 54321,
      description: "Updated test product",
      images: [
        "https://www.readersdigest.ca/wp-content/uploads/2017/10/funny-photos-jen-st-louis-owl.jpg?w=750",
        "https://www.readersdigest.ca/wp-content/uploads/2017/10/funny-photos-jen-st-louis-owl.jpg?w=750",
      ],
    };
    await store.dispatch(productsPut(producUpdate));
    expect(store.getState().productsReducer.single.id).toBeGreaterThan(0);
    expect(store.getState().productsReducer.single.title).toBe(
      "Updated product"
    );
    expect(store.getState().productsReducer.single.price).toBe(54321);
    expect(store.getState().productsReducer.single.description).toBe(
      "Updated test product"
    );
    expect(store.getState().productsReducer.single.images.length).toBe(2);
  });

  test("Products reducer / add remove favorit", async function () {
    await store.dispatch(productsGet(""));
    expect(store.getState().productsReducer.backUp[0].favorite).toBe(false);
    const id: number = store.getState().productsReducer.backUp[0].id;
    await store.dispatch(productFavoritAddRemove(id));
    expect(store.getState().productsReducer.backUp[0].favorite).toBe(true);
    await store.dispatch(productFavoritAddRemove(id));
    expect(store.getState().productsReducer.backUp[0].favorite).toBe(false);
  });

  test("Products reducer / change page", function () {
    expect(store.getState().productsReducer.page).toBe(1);
    store.dispatch(productsSetPage(2));
    expect(store.getState().productsReducer.page).toBe(2);
    store.dispatch(productsSetPage(3));
    expect(store.getState().productsReducer.page).toBe(3);
  });

  test("Products reducer / change search", function () {
    expect(store.getState().productsReducer.filters.search).toBe("");
    store.dispatch(productsSearch("abs"));
    expect(store.getState().productsReducer.filters.search).toBe("abs");
    store.dispatch(productsSearch("New product"));
    expect(store.getState().productsReducer.filters.search).toBe("New product");
  });

  test("Products reducer / change category", async function () {
    await store.dispatch(categoriesGet());
    const id: number = store.getState().productsReducer.categories[0].id;
    expect(
      store
        .getState()
        .productsReducer.filters.categories.some((c) => c.checked === true)
    ).toBe(false);
    store.dispatch(productsSelectCategories(id));
    expect(
      store
        .getState()
        .productsReducer.filters.categories.some((c) => c.checked === true)
    ).toBe(true);
    store.dispatch(productsSelectCategories(id));
    expect(
      store
        .getState()
        .productsReducer.filters.categories.some((c) => c.checked === true)
    ).toBe(false);
  });

  test("Products reducer / toggle favorit", function () {
    expect(store.getState().productsReducer.filters.favorite).toBe("off");
    store.dispatch(productsToggleFavorite());
    expect(store.getState().productsReducer.filters.favorite).toBe("on");
    store.dispatch(productsToggleFavorite());
    expect(store.getState().productsReducer.filters.favorite).toBe("off");
  });

  test("Products reducer / set reset present products", async function () {
    await store.dispatch(productsGet(""));
    await store.dispatch(categoriesGet());
    store.dispatch(productsSearch("New product"));
    store.dispatch(productUpdatePresent());
    expect(
      store.getState().productsReducer.present.every((p) => {
        return (
          p.title +
          "|" +
          p.description +
          "|" +
          p.price.toString() +
          "|" +
          p.category.name
        )
          .toLocaleLowerCase()
          .includes("New product".toLocaleLowerCase());
      })
    ).toBe(true);
    store.dispatch(productReset());
    expect(store.getState().productsReducer.present.length).toBe(
      store.getState().productsReducer.backUp.length
    );
  });
});
