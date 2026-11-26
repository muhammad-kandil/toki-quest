/** Single entry point the engine reads. Do not add logic here. */
export { RESOURCES } from './resources';
export { LOCATIONS } from './campus';
export { ADVENTURES } from './adventures';
import { RESOURCES } from './resources';
import { ADVENTURES } from './adventures';
export const getResource = (id: string) => RESOURCES.find((r) => r.id === id);
export const getAdventure = (id: string) => ADVENTURES.find((a) => a.id === id);
