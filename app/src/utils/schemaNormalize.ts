/**
 * Transform an object in camel case to an object in snake case to be used in with the supabase API.
 * @param schema The object to be transformed.
 */
export const schemaNormalize = <T>(schema: T) => {
  const normalizedSchema = {} as Record<string, any>

  for (const key in schema) {
    const newKey = key.replace(/([A-Z])/g, '_$1').toLowerCase()
    normalizedSchema[newKey] = schema[key]
  }

  return normalizedSchema
}
