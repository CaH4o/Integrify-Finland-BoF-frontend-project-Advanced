import createStore from "./shared/mockStore";
import {
  cartProductRemove,
  cartProductAdd,
  cartUpdateNoProducts,
} from "../redux/reducers/cart";
import { IUserProduct } from "../types/ICartState";

let store = createStore();

beforeEach(function () {
  store = createStore();
});

describe("Suite Carts reducer", function () {
  test("Carts reducer / init", function () {
    expect(store.getState().cartReducer.carts.length).toBe(0);
    expect(store.getState().cartReducer.noProducts).toBe(0);
  });

  test("Carts reducer / add product to the cart", function () {
    const cart1: IUserProduct = {
      product: {
        id: 1,
        title: "product1",
        price: 10,
        description: "discription1",
        category: { id: 0, name: "category1", image: "img1" },
        images: [],
        favorite: false,
        count: 1,
      },
      userEmail: "user1",
    };
    store.dispatch(cartProductAdd(cart1));
    expect(store.getState().cartReducer.carts.length).toBe(1);
    expect(store.getState().cartReducer.carts[0].product.length).toBe(1);
    expect(store.getState().cartReducer.carts[0].product[0].count).toBe(1);
    store.dispatch(cartUpdateNoProducts("user1"));
    expect(store.getState().cartReducer.noProducts).toBe(1);
    store.dispatch(cartProductAdd(cart1));
    expect(store.getState().cartReducer.carts.length).toBe(1);
    expect(store.getState().cartReducer.carts[0].product.length).toBe(1);
    expect(store.getState().cartReducer.carts[0].product[0].count).toBe(2);
    store.dispatch(cartUpdateNoProducts("user1"));
    expect(store.getState().cartReducer.noProducts).toBe(1);
    const cart2: IUserProduct = {
      product: {
        id: 2,
        title: "product2",
        price: 20,
        description: "discription2",
        category: { id: 0, name: "category2", image: "img2" },
        images: [],
        favorite: false,
        count: 1,
      },
      userEmail: "user1",
    };
    store.dispatch(cartProductAdd(cart2));
    expect(store.getState().cartReducer.carts.length).toBe(1);
    expect(store.getState().cartReducer.carts[0].product.length).toBe(2);
    expect(store.getState().cartReducer.carts[0].product[0].count).toBe(2);
    expect(store.getState().cartReducer.carts[0].product[1].count).toBe(1);
    store.dispatch(cartUpdateNoProducts("user1"));
    expect(store.getState().cartReducer.noProducts).toBe(2);
    const cart3: IUserProduct = {
      product: {
        id: 2,
        title: "product2",
        price: 20,
        description: "discription2",
        category: { id: 0, name: "category2", image: "img2" },
        images: [],
        favorite: false,
        count: 1,
      },
      userEmail: "user2",
    };
    store.dispatch(cartProductAdd(cart3));
    expect(store.getState().cartReducer.carts.length).toBe(2);
    expect(store.getState().cartReducer.carts[0].product.length).toBe(2);
    expect(store.getState().cartReducer.carts[0].product[0].count).toBe(2);
    expect(store.getState().cartReducer.carts[0].product[1].count).toBe(1);
    expect(store.getState().cartReducer.carts[1].product.length).toBe(1);
    expect(store.getState().cartReducer.carts[1].product[0].count).toBe(1);
    store.dispatch(cartUpdateNoProducts("user1"));
    expect(store.getState().cartReducer.noProducts).toBe(2);
    store.dispatch(cartUpdateNoProducts("user2"));
    expect(store.getState().cartReducer.noProducts).toBe(1);
  });

  test("Carts reducer / remove product to the cart", function () {
    const cart1: IUserProduct = {
      product: {
        id: 1,
        title: "product1",
        price: 10,
        description: "discription1",
        category: { id: 0, name: "category1", image: "img1" },
        images: [],
        favorite: false,
        count: 1,
      },
      userEmail: "user1",
    };
    const cart2: IUserProduct = {
      product: {
        id: 2,
        title: "product2",
        price: 20,
        description: "discription2",
        category: { id: 0, name: "category2", image: "img2" },
        images: [],
        favorite: false,
        count: 1,
      },
      userEmail: "user1",
    };
    const cart3: IUserProduct = {
      product: {
        id: 2,
        title: "product2",
        price: 20,
        description: "discription2",
        category: { id: 0, name: "category2", image: "img2" },
        images: [],
        favorite: false,
        count: 1,
      },
      userEmail: "user2",
    };
    store.dispatch(cartProductAdd(cart1));
    store.dispatch(cartProductAdd(cart1));
    store.dispatch(cartProductAdd(cart2));
    store.dispatch(cartProductAdd(cart3));
    expect(store.getState().cartReducer.carts.length).toBe(2);
    expect(store.getState().cartReducer.carts[0].product.length).toBe(2);
    expect(store.getState().cartReducer.carts[0].product[0].count).toBe(2);
    expect(store.getState().cartReducer.carts[0].product[1].count).toBe(1);
    expect(store.getState().cartReducer.carts[1].product.length).toBe(1);
    expect(store.getState().cartReducer.carts[1].product[0].count).toBe(1);
    store.dispatch(cartUpdateNoProducts("user1"));
    expect(store.getState().cartReducer.noProducts).toBe(2);
    store.dispatch(cartUpdateNoProducts("user2"));
    expect(store.getState().cartReducer.noProducts).toBe(1);
    store.dispatch(cartProductRemove(cart1));
    expect(store.getState().cartReducer.carts[0].product[0].count).toBe(1);
    store.dispatch(cartProductRemove(cart1));
    expect(store.getState().cartReducer.carts[0].product.length).toBe(1);
    store.dispatch(cartUpdateNoProducts("user1"));
    expect(store.getState().cartReducer.noProducts).toBe(1);
    store.dispatch(cartProductRemove(cart1));
    store.dispatch(cartProductRemove(cart3));
    store.dispatch(cartUpdateNoProducts("user2"));
    expect(store.getState().cartReducer.noProducts).toBe(0);
    store.dispatch(cartUpdateNoProducts("user1"));
    expect(store.getState().cartReducer.noProducts).toBe(1);
    store.dispatch(cartProductAdd(cart2));
    expect(store.getState().cartReducer.carts.length).toBe(2);
    expect(store.getState().cartReducer.carts[0].product.length).toBe(1);
    expect(store.getState().cartReducer.carts[0].product[0].count).toBe(2);
    store.dispatch(cartUpdateNoProducts("user1"));
    expect(store.getState().cartReducer.noProducts).toBe(1);
  });
});
