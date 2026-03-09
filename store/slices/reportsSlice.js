import { createSlice } from "@reduxjs/toolkit"

const reportsSlice = createSlice({
    name: "reports",
    initialState: [],
    reducers: {
        setReports: (state, action) => {
            return action.payload
        },

        addReport: (state, action) => {
            state.push({
                ...action.payload,
                history: [
                    {
                        from: null,
                        to: "Pendiente",
                        date: new Date().toISOString()
                    }
                ]
            });
        },

        updateReportStatus: (state, action) => {
            const { id, status } = action.payload;
            const report = state.find(r => r.id === id);

            if (!report) return;
            if (report.status === "Resuelto") return;

            const previousStatus = report.status;
            report.status = status;

            if (!report.history) {
                report.history = [];
            }

            report.history.push({
                from: previousStatus,
                to: status,
                date: new Date().toISOString()
            });
        },

        deleteReport: (state, action) => {
            return state.filter(report => report.id !== action.payload);
        }
    }
});

export const { setReports, addReport, updateReportStatus, deleteReport } = reportsSlice.actions;
export default reportsSlice.reducer