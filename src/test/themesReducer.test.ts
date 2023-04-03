import createStore from "./shared/mockStore";

import { toggleColorMode } from "../redux/reducers/themes";

let store = createStore();

beforeEach(function () {
  store = createStore();
});

describe("Suite Themes reducer", function () {
  test("Themes reducer / init", function () {
    expect(store.getState().themesReducer.light.mode).toBe("light");
    expect(store.getState().themesReducer.dark.mode).toBe("dark");
    expect(store.getState().themesReducer.mode).toBe("light");
  });

  test("Themes reducer / toggle color mode", function () {
    expect(store.getState().themesReducer.mode).toBe("light");
    store.dispatch(toggleColorMode());
    expect(store.getState().themesReducer.mode).toBe("dark");
    store.dispatch(toggleColorMode());
    expect(store.getState().themesReducer.mode).toBe("light");
  });
});
