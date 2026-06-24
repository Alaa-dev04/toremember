import z from 'zod';
import { Editeusershema } from './usereditform';
import { Createusershema } from './usersform';

export type Update = z.infer<typeof Editeusershema>;
export type Create = z.infer<typeof Createusershema>;
