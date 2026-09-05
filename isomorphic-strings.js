/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isIsomorphic = function (s, t) {
  const sCharsMappings = new Map();

  for (let i = 0; i < s.length; i++) {
    const sCharMapping = sCharsMappings.get(s[i]);

    if (sCharMapping) {
      if (sCharMapping !== t[i]) {
        return false;
      }
    } else {
      const sCharsMappingsValues = new Set(sCharsMappings.values());
      if (!sCharsMappingsValues.has(t[i])) {
        sCharsMappings.set(s[i], t[i]);
      } else {
        return false;
      }
    }
  }

  return true;
};
