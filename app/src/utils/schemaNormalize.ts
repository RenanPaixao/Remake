/**
 * Transform an object in camel case to an object in snake case to be used in with the supabase API.
 * @param schema The object to be transformed.
 */
export const schemaNormalize = <T extends Record<string, any>>(schema: T): T => {
  type Types = {
    [k in keyof T]: any
  }
  const normalizedSchema = {} as Types

  for (const key in schema) {
    const newKey = key.replace(/([A-Z])/g, '_$1').toLowerCase()
    normalizedSchema[newKey] = schema[key]
  }

  return normalizedSchema
}
