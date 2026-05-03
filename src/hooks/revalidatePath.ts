import type { GlobalAfterChangeHook, CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath } from 'next/cache'

export const revalidatePaths = (paths: string[]) => {
  for (const path of paths) {
    revalidatePath(path)
  }
}

export const revalidateGlobal =
  (paths: string[]): GlobalAfterChangeHook =>
  ({ doc }) => {
    revalidatePaths(paths)
    return doc
  }

export const revalidateCollectionAfterChange =
  (paths: string[]): CollectionAfterChangeHook =>
  ({ doc }) => {
    revalidatePaths(paths)
    return doc
  }

export const revalidateCollectionAfterDelete =
  (paths: string[]): CollectionAfterDeleteHook =>
  ({ doc }) => {
    revalidatePaths(paths)
    return doc
  }
