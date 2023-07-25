/** implementation only supports flat values **/
export function isSubobject(sup: any, sub: any) {
  for(const key in sub) {
    if(sup[key] !== sub[key])
      return false;
  };
  return true;
}
