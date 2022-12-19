export interface IProfileColumn {
    id: "id" | "name" | "email" | "role";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
  }