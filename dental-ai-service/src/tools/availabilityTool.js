// Get available slots
// Check doctor's schedule
// Get clinic timings

export async function checkAvailableSlots({ date, doctor = null }) {

    // Later this will call your CRM backend

    return {
        success: true,
        doctor: doctor || "Any Available Dentist",
        date,
        availableSlots: [
            "09:00 AM",
            "10:30 AM",
            "12:00 PM",
            "03:00 PM",
            "04:30 PM"
        ]
    };

}