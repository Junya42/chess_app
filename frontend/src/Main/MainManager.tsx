import React from "react";

import Board from "./Board/Board";
import Home from "./Home/Home";
import Ai from "./Ai/Ai";
import Profile from "./Profile/Profile";
import Matchmaking from "./Matchmaking/Matchmaking";

interface Props {
    page: string;
}

interface ComponentsProps {
    [name: string]: any;
}

const Components: ComponentsProps = {
    "Home": Home,
    "Matchmaking": Matchmaking,
    "Ai": Ai,
    "Profile": Profile,
    "Board": Board,
}

export default function MainManager({page}: Props) {

    const Component = Components[page];

    if (!Component) {
        console.error(`Unrecognized page: ${page}`);
        return null;
    }

    return React.createElement(Component);
}