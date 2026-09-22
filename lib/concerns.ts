/**
 * Concerns offered in the "Book a Consultation" form dropdown.
 * Same groups as the "What Are You Looking to Treat?" cards.
 *
 * Shared by the form (component/consultation-form.tsx) and the server route
 * (app/api/consultation/route.ts) so both always agree on the valid options.
 */

export const OTHER_CONCERN = "Other / Not sure"

export const concernGroups: { label: string; options: string[] }[] = [
  {
    label: "Skin Concerns",
    options: [
      "Acne",
      "Pigmentation",
      "Uneven skin tone",
      "Dullness",
      "Skin texture",
      "Redness",
    ],
  },
  {
    label: "Hair Concerns",
    options: ["Hair fall", "Hair thinning", "Scalp concerns", "Hair reduction"],
  },
  {
    label: "Aesthetic Concerns",
    options: [
      "Ageing",
      "Fine lines",
      "Skin laxity",
      "Unwanted hair",
      "Tattoos",
      "Birthmarks",
    ],
  },
  {
    label: "Other Concerns",
    options: [
      "Nail fungus",
      "Cellulite",
      "Body tightening",
      "Bridal skin preparation",
      OTHER_CONCERN,
    ],
  },
]

export const allConcerns = concernGroups.flatMap((group) => group.options)
