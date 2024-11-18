import { Navigate } from "react-router-dom";
import React from "react";
import DashboardCard from "../semis-ui/components/dashboardCard/dashboardCard";
import TestRulesEngine from "../components/programRules/TestRulesEngine";

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

        {
            path: "/rulesEngine",
            component: () => <TestRulesEngine />
        },
    ]
}
