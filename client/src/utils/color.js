/* eslint-disable */
export const getDarker = (hex, shade = 20) => {
  const arr = [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)];
  const clr = [0, 0, 0];
  arr.forEach((x, y) => {
    for (let i = 0; i < 2; i+=1) {
      const v =
        x[i] === "A"
          ? 10
          : x[i] === "B"
          ? 11
          : x[i] === "C"
          ? 12
          : x[i] === "D"
          ? 13
          : x[i] === "E"
          ? 14
          : x[i] === "F"
          ? 15
          : parseInt(x[i]);
      clr[y] += v * 16 ** (1 - i);
    }
  });

  const shadeClr = parseInt((255 * shade) / 100, 2);
  const newClr = clr.map((x) => parseInt(Math.max(x - shadeClr, 0), 2));
  // eslint-disable-next-line
  return "RGB(" + newClr[0] + ", " + newClr[1] + ", " + newClr[2] + ")";
};

export const getLighter = (hex, shade = 20) => {
  let arr = [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)];
  let clr = [0, 0, 0];
  arr.forEach((x, y) => {
    for (let i = 0; i < 2; i++) {
      let v =
        x[i] === "A"
          ? 10
          : x[i] === "B"
          ? 11
          : x[i] === "C"
          ? 12
          : x[i] === "D"
          ? 13
          : x[i] === "E"
          ? 14
          : x[i] === "F"
          ? 15
          : parseInt(x[i]);
      clr[y] += v * 16 ** (1 - i);
    }
  });

  let shadeClr = parseInt((255 * shade) / 100);
  let newClr = clr.map((x) => parseInt(Math.min(x + shadeClr, 255)));
  return "RGB(" + newClr[0] + ", " + newClr[1] + ", " + newClr[2] + ")";
};
export const getFader = (hex, opa = 0.2) => {
  let arr = [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)];
  let clr = [0, 0, 0];
  arr.forEach((x, y) => {
    for (let i = 0; i < 2; i++) {
      let v =
        x[i] === "A"
          ? 10
          : x[i] === "B"
          ? 11
          : x[i] === "C"
          ? 12
          : x[i] === "D"
          ? 13
          : x[i] === "E"
          ? 14
          : x[i] === "F"
          ? 15
          : parseInt(x[i]);
      clr[y] += v * 16 ** (1 - i);
    }
  });
  return "RGBA(" + clr[0] + ", " + clr[1] + ", " + clr[2] + ", " + opa + ")";
};
