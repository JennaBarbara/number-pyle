import { type RouteConfig, index, route, prefix } from "@react-router/dev/routes";


export default [ 
    ...prefix("number-pyle", [
        index("./modes/number-pyle/number-pyle.tsx"),
        route("number-pyre", "./modes/number-pyre/number-pyre.tsx"),
        route("number-scryer", "./modes/number-scryer/number-scryer.tsx"),
    ]),
    route("*?", "catchall.tsx"),
] satisfies RouteConfig