export type StackContainerItemPosition =
    "left" |
    "right" |
    "center" |
    "space-between" |
    "space-around";

export function StackContentItemPositionToCSS(position: StackContainerItemPosition) {
    switch (position) {
        case "left":
            return "flex-start";
        case "right":
            return "flex-end";
        case "center":
            return "center";
        case "space-between":
            return "space-between";
        case "space-around":
            return "space-around";
    }
}