// Function gets a styles module, returns a method that sends back a styles string converted by the given module version.
// Input: Module (typeof import styles_module)
// Output: A method which receives a styles-string (seperated with whitespaces) and returns their module version
export const multipleModules =
  (Module: { readonly [key: string]: string }) => (styles: string) =>
    styles
      .split(" ")
      .map((style) => Module[style])
      .join(" ");
