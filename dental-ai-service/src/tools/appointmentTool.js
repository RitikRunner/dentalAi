//Create appointment
//Cancel appointment
//Reschedule appointment
//Get appointment details

export async function bookAppointment({

    patientName,
    phone,
    doctor,
    date,
    time,
    treatment

}) {

    // Later call Express CRM API -- by backend guy

    return {

        success: true,

        appointmentId: "APT-1001",

        patientName,

        doctor,

        date,

        time,

        treatment

    };

}
export async function cancelAppointment({

    appointmentId

}) {

    return {

        success: true,

        appointmentId,

        status: "Cancelled"

    };

}
export async function rescheduleAppointment({

    appointmentId,

    newDate,

    newTime

}) {

    return {

        success: true,

        appointmentId,

        newDate,

        newTime

    };

}