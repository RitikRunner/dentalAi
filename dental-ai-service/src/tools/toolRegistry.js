import {
    bookAppointment,
    cancelAppointment,
    rescheduleAppointment,
} from "./appointmentTool.js";

import { checkAvailableSlots } from "./availabilityTool.js";

export const tools = {
    checkAvailableSlots,
    bookAppointment,
    cancelAppointment,
    rescheduleAppointment,
};
