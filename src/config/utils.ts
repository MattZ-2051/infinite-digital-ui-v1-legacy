/**
 * Pull variables from environment.
 *
 * @param name Name of the environment variable
 * @param required If required, throw an error when missing.
 */
export const getEnvVar = (name: string, required = false): string => {
  const value = process.env[name];
  if (!value) {
    const message = `environment variable ${name} not found.`;
    if (required) {
      console.error(`getEnvVar: Required ${message}`);
      throw new Error(`Required ${message}`);
    } else {
      console.log(`getEnvVar: Optional ${message}`);
    }
  }
  return value || '';
};
