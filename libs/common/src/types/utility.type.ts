import { QuestionType } from '../enums';

export type PartialKey<T extends object, Key extends keyof T> = {
  [K in keyof T]: K extends Key ? Partial<T[K]> : T[K];
};

export type ConvertToMetaType<T extends object> = {
  [P in keyof T]: {
    [K in keyof T[P]]: QuestionType;
  };
};
