import { Ability } from '@casl/ability';

import { PermissionAction } from './constants/permission-action';

export type Constructor<T, Arguments extends unknown[] = undefined[]> = new (
    ...arguments_: Arguments
) => T;

export type Plain<T> = T;
export type Optional<T> = T | undefined;
export type Nullable<T> = T | null;

export type PermissionObjectType = any;
export type AppAbility = Ability<[PermissionAction, PermissionObjectType]>;

export type RequiredPermission = [PermissionAction, PermissionObjectType];
