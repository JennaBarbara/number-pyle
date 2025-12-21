import { type RouteConfig, index, route } from "@react-router/dev/routes";


export default [  
    index("./modes/number-pyle/number-pyle.tsx"),
    route("number-pyre", "./modes/number-pyre/number-pyre.tsx"),
    route("number-scryer", "./modes/number-scryer/number-scryer.tsx"),
    route("*?", "catchall.tsx"),
] satisfies RouteConfig
