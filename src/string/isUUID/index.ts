// Returns a regex for validating an RFC 9562/4122 UUID.
// Source: https://github.com/colinhacks/zod/blob/main/packages/zod/src/v4/core/regexes.ts
function uuid(version?: number | undefined): RegExp {
  if (!version)
    return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
  return new RegExp(
    `^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`
  );
}

export const isUUID = (value: string, version?: number | undefined) =>
  uuid(version).test(value);
