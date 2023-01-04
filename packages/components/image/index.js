import Image from "./src";

Image.install = (app) => {
  app.component(Image.name, Image);
}

export default Image;
