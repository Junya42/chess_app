/**
 * Enum representing directions for piece movement or pinning.
 */
export enum DIRECTION {
    /**
     * No pin - piece can move freely in any direction.
     */
    CLEAR = 0,

    /**
     * Can only move vertically.
     */
    VERTICAL = 1,

    /**
     * Can only move horizontally.
     */
    HORIZONTAL = 2,

    /**
     * Can only move between topleft and botright diagonally.
     */
    DIAG_00_77 = 3,

    /**
     * Can only move between botleft and topright diagonally.
     */
    DIAG_70_07 = 4
}