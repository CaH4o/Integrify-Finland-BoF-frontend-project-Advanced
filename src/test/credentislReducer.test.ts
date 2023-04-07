import createStore from "./shared/mockStore";
import { logOut } from "../redux/reducers/credenital";
import { createUser, userPut } from "../api/usersWorker";
import { credentialPostGet } from "../api/credenitalWorker";
import { IUser, IUserUpdate } from "../types/IUser";
import { IUserCredential } from "../types/ICredential";

let store = createStore();

beforeEach(function () {
  store = createStore();
});

jest.setTimeout(50000);

describe("Suite Credantioal reducer", function () {
  test("Credential reducer / init", function () {
    expect(store.getState().credenitalsReducer.user).toBe(undefined);
    expect(store.getState().credenitalsReducer.rights.user.openProfile).toBe(
      false
    );
    expect(store.getState().credenitalsReducer.rights.user.update).toBe(false);
    expect(store.getState().credenitalsReducer.error).toBe(false);
    expect(store.getState().credenitalsReducer.loading).toBe(false);
  });

  test("Credential reducer / get cridantials", async function () {
    const cradentoal: IUserCredential = {
      email: "maria@mail.com",
      password: "12345",
    };
    await store.dispatch(credentialPostGet(cradentoal));
    expect(store.getState().credenitalsReducer.user!.id).toBe(2);
    expect(store.getState().credenitalsReducer.user!.name).toBe("Maria");
    expect(store.getState().credenitalsReducer.rights.user.openProfile).toBe(
      true
    );
    expect(store.getState().credenitalsReducer.rights.user.update).toBe(true);
    expect(store.getState().credenitalsReducer.error).toBe(false);
    expect(store.getState().credenitalsReducer.loading).toBe(false);
  });

  test("Credential reducer / reset cridantials", async function () {
    const cradentoal: IUserCredential = {
      email: "maria@mail.com",
      password: "12345",
    };
    await store.dispatch(credentialPostGet(cradentoal));
    await store.dispatch(logOut());
    expect(store.getState().credenitalsReducer.user).toBe(undefined);
    expect(store.getState().credenitalsReducer.rights.user.openProfile).toBe(
      false
    );
    expect(store.getState().credenitalsReducer.rights.user.update).toBe(false);
    expect(store.getState().credenitalsReducer.error).toBe(false);
    expect(store.getState().credenitalsReducer.loading).toBe(false);
  });

  test("Credential reducer / put user", async function () {
    const newUser: IUser = {
      id: 0,
      email: "new@mail.com",
      name: "New",
      password: "NewPassword",
      avatar:
        "https://www.rd.com/wp-content/uploads/2019/09/GettyImages-621924830-scaled.jpg?resize=768,549",
      role: "customer",
    };
    await createUser(newUser);
    const cradentoal: IUserCredential = {
      email: "new@mail.com",
      password: "NewPassword",
    };
    await store.dispatch(credentialPostGet(cradentoal));
    const id: number = store.getState().credenitalsReducer.user!.id;
    const updateUser: IUserUpdate = {
      id,
      name: "Updated",
      email: "updated2@mail.com",
      password: "UpdatePassw0rd",
    };
    await store.dispatch(userPut(updateUser));
    expect(store.getState().credenitalsReducer.user!.id).toBe(id);
    expect(store.getState().credenitalsReducer.user!.name).toBe("Updated");
    expect(store.getState().credenitalsReducer.rights.user.openProfile).toBe(
      true
    );
    expect(store.getState().credenitalsReducer.rights.user.update).toBe(true);
    expect(store.getState().credenitalsReducer.error).toBe(false);
    expect(store.getState().credenitalsReducer.loading).toBe(false);
  });
});
