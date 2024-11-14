import { Navigate } from "react-router-dom";
import React from "react";
import DashboardCard from "../semis-ui/components/dashboardCard/dashboardCard";

export default function RouteList() {
    return [
        {
            path: "/",
            component: () => <Navigate to="/cards" replace />
        },

        {
            path: "/cards",
            component: () => <DashboardCard />
        },
    ]
}
