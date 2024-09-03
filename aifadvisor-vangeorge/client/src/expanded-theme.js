import { createPalette } from "@mui/material/styles";

const extendPalette = (palette) => {
    palette.tertiary = {};
    return palette;
};

const palette = createPalette();
const extendedPalette = extendPalette(palette);

export default extendedPalette;