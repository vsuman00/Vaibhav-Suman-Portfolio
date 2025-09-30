import type { StructureResolver } from 'sanity/structure'

// Simplified Studio structure without blog types
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...S.documentTypeListItems(),
    ])
