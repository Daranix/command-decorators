import "reflect-metadata";
import { ICommandParameter } from "../interfaces";
import { METADATAKEY } from "../symbols/metadatasymbols";

// https://www.typescriptlang.org/docs/handbook/decorators.html#parameter-decorators

export function CmdParam({ name, required = true, description, customType = false }: { name?: string, required?: boolean, description?: string, customType?: boolean } = {}) {
      return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
            const params: Array<ICommandParameter> = Reflect.getOwnMetadata(METADATAKEY.PARAMETER, target, propertyKey) || [];
            const type = Reflect.getOwnMetadata("design:paramtypes", target, propertyKey)[parameterIndex];
            const paramData: ICommandParameter = {
                  name,
                  description,
                  index: parameterIndex,
                  type,
                  required,
                  customType
            };
            params[parameterIndex] = paramData;
            Reflect.defineMetadata(METADATAKEY.PARAMETER, params, target, propertyKey);
      }
}

