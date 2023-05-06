//* Random code generator

export const generateCode = () => {
  let code = (Math.random() + 1).toString(36).substring(2, 10);
  return code;
}