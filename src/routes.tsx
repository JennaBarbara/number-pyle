import { type RouteConfig, route } from "@react-router/dev/routes";


export default [  
    route("number-pyle", "./modes/number-pyle/number-pyle.tsx"),
    route("number-pyle/number-pyre", "./modes/number-pyre/number-pyre.tsx"),
    route("number-pyle/number-scryer", "./modes/number-scryer/number-scryer.tsx"),
] satisfies RouteConfig