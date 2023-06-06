import * as fs from "fs";

export class Loader {
    saveVersion(content: string, version: string) {
      fs.writeFileSync(this.basePath + "/" + version, content, {encoding: "utf-8"});

    }
    constructor(private basePath: string) {
    }

    getVersions(){
        const dir =  fs.readdirSync(this.basePath);
        return dir;
    }

    getVersion(version: string){
      const fileContent = fs.readFileSync(this.basePath + "/" + version, {encoding: "utf-8"});
      return JSON.parse(fileContent);
    }
}

export const loader = new Loader("./static/versions");

