const dentalKeywords = [
  "dentist",
  "dental",
  "appointment",
  "book",
  "booking",
  "cancel",
  "reschedule",
  "doctor",
  "clinic",
  "tooth",
  "teeth",
  "gum",
  "rct",
  "root canal",
  "implant",
  "braces",
  "aligner",
  "whitening",
  "scaling",
  "cleaning",
  "pain",
  "crown",
  "bridge",
  "veneer",
];

export async function classifyDomain(message) {

    const text = message.toLowerCase();

    const isDental = dentalKeywords.some(keyword =>
        text.includes(keyword)
    );

    return {
        domain: isDental
            ? "DENTAL"
            : "OUT_OF_SCOPE",
    };

}