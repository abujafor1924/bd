import img1 from "../assets/images/card/067ff633-35d7-400d-9f53-2c01e11aedf2.jpeg";
import img2 from "../assets/images/card/07315ecd-e0ac-40a5-82dd-af50e26c8cb7.jpeg";
import img3 from "../assets/images/card/0f712d4f-0a36-4fb9-be45-e6ed20c2e5d7.jpeg";
import img4 from "../assets/images/card/10789356-94f7-406e-9a6b-8267529f11d7.jpeg";
import img5 from "../assets/images/card/241c4afa-a6bd-4297-9f27-76bcc711c637.jpeg";
import img6 from "../assets/images/card/3cd54615-18f0-425f-8684-29ba62428cf8.jpeg";
import img7 from "../assets/images/card/4cfc0e6b-77eb-4538-adf5-af71853d43a6.jpeg";
import img8 from "../assets/images/card/9f830772-96dc-4e23-9568-65a01d21ebf8.jpeg";
import img9 from "../assets/images/card/d2bb6737-5e17-4281-acff-619d1ca74039.jpeg";
import img10 from "../assets/images/card/d43ceda0-e413-4b7e-97c5-fb87d931285b.jpeg";

const medicalAccessoriesDetails = {
  // Legacy / Mapped Keys (by ID or name matching)
  1: {
    title: "Coccyx Cushion",
    subtitle: "Relieve tailbone pressure and discomfort",
    description:
      "If you suffer from tailbone pain, a coccyx cushion is one of the best solutions for relieving discomfort and reducing pain.",
    features: [
      "Ergonomic contour for tailbone relief",
      "High-density premium memory foam",
      "Non-slip bottom design",
      "Removable and washable cover",
    ],
  },

  2: {
    title: "Special Prayer Mat Pad",
    subtitle: "Muscle support and relief during prayers",
    description:
      "This mat is designed by embossing to absorb the initial pressure from the user, easing stiffness in the bones and muscles and relaxing shin friction.",
    features: [
      "High-density padding for joint comfort",
      "Reduces shin and knee friction",
      "Supports healthy prayer posture",
      "Embossed anti-slip surface",
    ],
  },

  3: {
    title: "Knee Support Roll And Wedge",
    subtitle: "Prevent knee pain and improve circulation",
    description:
      "This wedge helps to prevent knee pain and swelling. It is ideal for post-surgery recovery and improves blood circulation to the lower extremities.",
    features: [
      "Perfect for post-surgery recovery",
      "Helps reduce knee swelling",
      "Improves blood circulation",
      "Contoured ergonomic shape",
    ],
  },

  4: {
    title: "Support Sleeping Wedge",
    subtitle: "Relieve pressure and prevent lumbar pain",
    description:
      "This wedge pushes the lumbar vertebrae forward, helping to relieve pressure on the back and prevent lumbar pain.",
    features: [
      "Supports lumbar vertebrae alignment",
      "Relieves lower back pressure",
      "Prevents morning stiffness",
      "Premium breathable fabric cover",
    ],
  },

  5: {
    title: "Elevated Bed Wedge",
    subtitle: "Improve breathing and relieve acid reflux",
    description:
      "Elevated bed wedges help with breathing difficulties, acid reflux, snoring, and poor circulation by elevating the upper body.",
    features: [
      "Improves acid reflux (GERD) symptoms",
      "Helps with snoring and breathing issues",
      "Supports upper body elevation",
      "Hypoallergenic cover",
    ],
  },

  6: {
    title: "First Aid Supplies",
    subtitle: "Be prepared for everyday emergencies",
    description:
      "First aid supplies provide essential support for handling minor injuries and common emergencies at home, work, or while travelling.",
    features: [
      "Useful for emergency situations",
      "Suitable for home and travel",
      "Essential first aid items",
      "Easy to store and carry",
    ],
  },

  7: {
    title: "Face Masks and Gloves",
    subtitle: "Protection and everyday hygiene",
    description:
      "Face masks and medical gloves provide an additional layer of protection and help maintain hygiene during everyday activities and healthcare situations.",
    features: [
      "Supports everyday hygiene",
      "Useful for healthcare environments",
      "Available for personal use",
      "Convenient and easy to use",
    ],
  },

  9: {
    title: "Mobility Aids",
    subtitle: "Support for safer and easier movement",
    description:
      "Mobility aids are designed to provide support and improve comfort and independence for people who need assistance while walking or moving.",
    features: [
      "Supports safer movement",
      "Suitable for home and outdoor use",
      "Designed for comfort",
      "Helps improve mobility and independence",
    ],
  },

  10: {
    title: "Respiratory Units",
    subtitle: "Respiratory care solutions",
    description:
      "Respiratory care products are designed to support people who require assistance with breathing-related healthcare needs.",
    features: [
      "Designed for respiratory care",
      "Useful for home healthcare",
      "Easy to operate products",
      "Supports regular respiratory management",
    ],
  },

  11: {
    title: "Bed Wedges",
    subtitle: "Comfortable positioning and support",
    description:
      "Bed wedges provide positioning support and can help improve comfort while resting or sleeping.",
    features: [
      "Comfortable positioning support",
      "Suitable for home use",
      "Lightweight and convenient",
      "Useful for resting and recovery",
    ],
    galleryImages: [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]
  },

  // Fallback name keys to ensure name-based match works flawlessly
  "coccyx cushion": {
    title: "Coccyx Cushion",
    subtitle: "Relieve tailbone pressure and discomfort",
    description:
      "If you suffer from tailbone pain, a coccyx cushion is one of the best solutions for relieving discomfort and reducing pain.",
    features: [
      "Ergonomic contour for tailbone relief",
      "High-density premium memory foam",
      "Non-slip bottom design",
      "Removable and washable cover",
    ],
  },
  "special prayer mat pad": {
    title: "Special Prayer Mat Pad",
    subtitle: "Muscle support and relief during prayers",
    description:
      "This mat is designed by embossing to absorb the initial pressure from the user, easing stiffness in the bones and muscles and relaxing shin friction.",
    features: [
      "High-density padding for joint comfort",
      "Reduces shin and knee friction",
      "Supports healthy prayer posture",
      "Embossed anti-slip surface",
    ],
  },
  "knee support roll and wedge": {
    title: "Knee Support Roll And Wedge",
    subtitle: "Prevent knee pain and improve circulation",
    description:
      "This wedge helps to prevent knee pain and swelling. It is ideal for post-surgery recovery and improves blood circulation to the lower extremities.",
    features: [
      "Perfect for post-surgery recovery",
      "Helps reduce knee swelling",
      "Improves blood circulation",
      "Contoured ergonomic shape",
    ],
  },
  "support sleeping wedge": {
    title: "Support Sleeping Wedge",
    subtitle: "Relieve pressure and prevent lumbar pain",
    description:
      "This wedge pushes the lumbar vertebrae forward, helping to relieve pressure on the back and prevent lumbar pain.",
    features: [
      "Supports lumbar vertebrae alignment",
      "Relieves lower back pressure",
      "Prevents morning stiffness",
      "Premium breathable fabric cover",
    ],
  },
  "elevated bed wedge": {
    title: "Elevated Bed Wedge",
    subtitle: "Improve breathing and relieve acid reflux",
    description:
      "Elevated bed wedges help with breathing difficulties, acid reflux, snoring, and poor circulation by elevating the upper body.",
    features: [
      "Improves acid reflux (GERD) symptoms",
      "Helps with snoring and breathing issues",
      "Supports upper body elevation",
      "Hypoallergenic cover",
    ],
  },
  "first aid supplies": {
    title: "First Aid Supplies",
    subtitle: "Be prepared for everyday emergencies",
    description:
      "First aid supplies provide essential support for handling minor injuries and common emergencies at home, work, or while travelling.",
    features: [
      "Useful for emergency situations",
      "Supports safety first",
      "Essential first aid items",
      "Easy to store and carry",
    ],
  },
  "face masks and gloves": {
    title: "Face Masks and Gloves",
    subtitle: "Protection and everyday hygiene",
    description:
      "Face masks and medical gloves provide an additional layer of protection and help maintain hygiene during everyday activities and healthcare situations.",
    features: [
      "Supports everyday hygiene",
      "Useful for healthcare environments",
      "Available for personal use",
      "Convenient and easy to use",
    ],
  },
  "mobility aids": {
    title: "Mobility Aids",
    subtitle: "Support for safer and easier movement",
    description:
      "Mobility aids are designed to provide support and improve comfort and independence for people who need assistance while walking or moving.",
    features: [
      "Supports safer movement",
      "Suitable for home and outdoor use",
      "Designed for comfort",
      "Helps improve mobility and independence",
    ],
  },
  "respiratory units": {
    title: "Respiratory Units",
    subtitle: "Respiratory care solutions",
    description:
      "Respiratory care products are designed to support people who require assistance with breathing-related healthcare needs.",
    features: [
      "Designed for respiratory care",
      "Useful for home healthcare",
      "Easy to operate products",
      "Supports regular respiratory management",
    ],
  },
  "bed wedges": {
    title: "Bed Wedges",
    subtitle: "Comfortable positioning and support",
    description:
      "Bed wedges provide positioning support and can help improve comfort while resting or sleeping.",
    features: [
      "Comfortable positioning support",
      "Suitable for home use",
      "Lightweight and convenient",
      "Useful for resting and recovery",
    ],
    galleryImages: [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]
  },
};

export default medicalAccessoriesDetails;