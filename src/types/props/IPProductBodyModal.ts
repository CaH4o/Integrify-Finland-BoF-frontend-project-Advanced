export type tModeProduct = "update" | "create";

export interface IPProductBodyModal {
  option: tModeProduct;
  handleClose?: () => void;
}
