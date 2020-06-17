import { RefMeta } from "../types";

type External = { [id in string]?: [string, string] };

export class RefMap extends Map<string, RefMeta> {
  registerExternal(external: External) {
    for (const [id, [name, path]] of Object.entries(external)) {
      this.set(id, { isExternal: true, name, path });
    }
  }

  unregisterExternal(external: External) {
    for (const id of Object.keys(external)) {
      this.delete(id);
    }
  }
}
