import type { StructureBuilder } from 'sanity/desk'

// Simplified Studio structure without blog types
export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      ...S.documentTypeListItems(),
    ])
