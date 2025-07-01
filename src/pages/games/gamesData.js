import { lazy } from "react";

export const gamesData = {
    TypeOne: [
        { id: "1.0", component: lazy(() => import("./types/TypeOne/Game0")) },
        { id: "1.1", component: lazy(() => import("./types/TypeOne/Game1")) },
        { id: "1.2", component: lazy(() => import("./types/TypeOne/Game2")) },
        { id: "1.3", component: lazy(() => import("./types/TypeOne/Game3")) },
        { id: "1.4", component: lazy(() => import("./types/TypeOne/Game4")) },
        { id: "1.5", component: lazy(() => import("./types/TypeOne/Game5")) },
    ],
    TypeTwo: [
        { id: "2.0", component: lazy(() => import("./types/TypeTwo/Game0")) },
        { id: "2.1", component: lazy(() => import("./types/TypeTwo/Game1")) },
        { id: "2.2", component: lazy(() => import("./types/TypeTwo/Game2")) },
        { id: "2.3", component: lazy(() => import("./types/TypeTwo/Game3")) },
        { id: "2.4", component: lazy(() => import("./types/TypeTwo/Game4")) },
    ],
    TypeThree: [
        { id: "3.0", component: lazy(() => import("./types/TypeThree/Game0")) },
        { id: "3.1", component: lazy(() => import("./types/TypeThree/Game1")) },
        { id: "3.2", component: lazy(() => import("./types/TypeThree/Game2")) },
    ],
    TypeFour: [
        { id: "4.0", component: lazy(() => import("./types/TypeFour/Game0")) },
    ],
    TypeFive: [
        { id: "5.0", component: lazy(() => import("./types/TypeFive/Game0")) },
    ],
};