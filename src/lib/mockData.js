export const MOCK_PRODUCTS = [
  // ---------------- Writing Essentials ----------------
  {
    id: "we_1",
    name: "Pen",
    category: "Writing Essentials",
    price: 10,
    description: "Reliable ballpoint, gel, or fountain pens for everyday use.",
    inStock: true,
    options: {
      Brand: ["Hauser", "Pentonic", "Rorito", "Trimax", "Octane"],
      Type: ["Ball", "Gel", "Fountain"],
      Color: ["Red", "Black", "Blue", "Green"]
    }
  },
  {
    id: "we_2",
    name: "Mechanical Pencils",
    category: "Writing Essentials",
    price: 30,
    description: "0.5mm/0.7mm mechanical pencils with built-in eraser and extra lead.",
    inStock: true,
    options: {
      Brand: ["Classmate", "Nataraj", "DOMS", "Camlin"]
    }
  },
  {
    id: "we_3",
    name: "Whiteboard Markers",
    category: "Writing Essentials",
    price: 30,
    description: "Dry-erase markers. Easy wipe-off with vibrant colors.",
    inStock: true,
    options: {
      Brand: ["Camlin", "Reynolds", "Luxor", "Flair"],
      Color: ["Red", "Black", "Blue", "Green"]
    }
  },
  {
    id: "we_4",
    name: "Pencils",
    category: "Writing Essentials",
    price: 5,
    description: "Standard HB wooden pencils for sketching and writing.",
    inStock: true,
    options: {
      Brand: ["Classmate", "Nataraj", "Apsara", "DOMS"]
    }
  },
  {
    id: "we_5",
    name: "Pen Refills",
    category: "Writing Essentials",
    price: 5,
    description: "Smooth ink refills compatible with major pen brands.",
    inStock: true,
    options: {
      Brand: ["Hauser", "Pentonic", "Rorito", "Trimax", "Octane"],
      Type: ["Ball", "Gel", "Fountain"],
      Color: ["Red", "Black", "Blue", "Green"]
    }
  },

  // ---------------- Correction & Marking ----------------
  {
    id: "cm_1",
    name: "Correction Tape Roller",
    category: "Correction & Marking",
    price: 60,
    description: "Smooth application correction tape, 5mm x 8m. Tear-resistant.",
    inStock: true,
    options: {
      Brand: ["Camlin", "Kores", "Faber-Castell", "Luxor"]
    }
  },
  {
    id: "cm_2",
    name: "Correction Pen (Whitener)",
    category: "Correction & Marking",
    price: 30,
    description: "Precision metal tip whitener for detailed corrections.",
    inStock: true,
    options: {
      Brand: ["Camlin", "Kores", "Faber-Castell", "Luxor"]
    }
  },
  {
    id: "cm_3",
    name: "Eraser",
    category: "Correction & Marking",
    price: 15,
    description: "High-quality polymer erasers that leave minimal dust.",
    inStock: true,
    options: {
      Brand: ["Classmate", "Nataraj", "DOMS", "Faber-Castell"]
    }
  },
  {
    id: "cm_4",
    name: "Highlighters",
    category: "Correction & Marking",
    price: 20,
    description: "Vibrant fluorescent highlighters perfect for studying and journaling.",
    inStock: true,
    options: {
      Brand: ["Camlin", "Luxor", "Faber-Castell", "Flair"],
      Color: ["Red", "Yellow", "Blue", "Green"]
    }
  },

  // ---------------- Paper Products ----------------
  {
    id: "pp_1",
    name: "A4 Sheets",
    category: "Paper Products",
    price: 2,
    description: "Premium A4 paper sheets for printing, crafts, and origami.",
    inStock: true,
    options: {
      Color: ["White", "Red", "Yellow", "Blue", "Green"]
    }
  },
  {
    id: "pp_2",
    name: "Pocket Memo Pad",
    category: "Paper Products",
    price: 25,
    description: "Compact memo pad perfect for quick notes on the go.",
    inStock: true,
    options: {
      Color: ["Red", "Yellow", "Blue", "Green"]
    }
  },
  {
    id: "pp_3",
    name: "Sticky Notes",
    category: "Paper Products",
    price: 20,
    description: "Pack of sticky notes for reminders and indexing.",
    inStock: true,
    options: {
      Color: ["Red", "Yellow", "Blue", "Green"]
    }
  },
  {
    id: "pp_4",
    name: "Long Note Book 100pgs",
    category: "Paper Products",
    price: 50,
    description: "Long notebook with premium 70gsm paper (100 pages).",
    inStock: true,
    options: {
      Brand: ["Classmate", "Nataraj", "Papergrid", "ASHA"],
      Type: ["Ruled", "Unruled"]
    }
  },
  {
    id: "pp_5",
    name: "Long Note Book 200pgs",
    category: "Paper Products",
    price: 100,
    description: "Thick long notebook for extended subjects (200 pages).",
    inStock: true,
    options: {
      Brand: ["Classmate", "Nataraj", "Papergrid", "ASHA"],
      Type: ["Ruled", "Unruled"]
    }
  },

  // ---------------- Measuring Tools ----------------
  {
    id: "mt_1",
    name: "Steel Ruler 30cm",
    category: "Measuring Tools",
    price: 50,
    description: "Stainless steel ruler with both metric and imperial markings.",
    inStock: true,
    options: {
      Brand: ["Classmate", "Nataraj", "DOMS", "Faber-Castell"]
    }
  },
  {
    id: "mt_2",
    name: "Transparent Ruler 30cm",
    category: "Measuring Tools",
    price: 30,
    description: "Clear plastic ruler for accurate line drawing and measurement.",
    inStock: true,
    options: {
      Brand: ["Classmate", "Nataraj", "DOMS", "Faber-Castell"]
    }
  },
  {
    id: "mt_3",
    name: "Protractor",
    category: "Measuring Tools",
    price: 10,
    description: "180-degree clear plastic protractor for precise angle measurement.",
    inStock: true,
    options: {
      Brand: ["Classmate", "Nataraj", "DOMS", "Faber-Castell"]
    }
  },
  {
    id: "mt_4",
    name: "Geometry Box",
    category: "Measuring Tools",
    price: 150,
    description: "Complete student geometry set in a durable metal case.",
    inStock: true,
    options: {
      Brand: ["Classmate", "Nataraj", "DOMS", "Faber-Castell"]
    }
  },
  {
    id: "mt_5",
    name: "Compass",
    category: "Measuring Tools",
    price: 15,
    description: "Professional grade compass with extension bar and spare leads.",
    inStock: true,
    options: {
      Brand: ["Classmate", "Nataraj", "DOMS", "Faber-Castell"]
    }
  },

  // ---------------- Office Utility ----------------
  {
    id: "ou_1",
    name: "Glue (Liquid)",
    category: "Office Utility",
    price: 60,
    description: "Strong liquid adhesive for paper, cardboard, and crafts.",
    inStock: true,
    options: {
      Brand: ["Fevicol", "Camlin", "Classmate", "DOMS"]
    }
  },
  {
    id: "ou_2",
    name: "Glue Stick",
    category: "Office Utility",
    price: 40,
    description: "Mess-free glue stick. Smooth application.",
    inStock: true,
    options: {
      Brand: ["Fevicol", "Camlin", "Classmate", "DOMS"]
    }
  },
  {
    id: "ou_3",
    name: "Paperclips (Pack of 5)",
    category: "Office Utility",
    price: 10,
    description: "Durable paperclips for organizing documents.",
    inStock: true,
    options: {
      Brand: ["Fevicol", "Camlin", "Classmate", "DOMS"]
    }
  },
  {
    id: "ou_4",
    name: "Stapler",
    category: "Office Utility",
    price: 20,
    description: "Mini stapler. Ergonomic design, staples up to 15 pages.",
    inStock: true,
    options: {
      Brand: ["Fevicol", "Camlin", "Classmate", "DOMS"]
    }
  },
  {
    id: "ou_5",
    name: "Scientific Calculator",
    category: "Office Utility",
    price: 300,
    description: "Advanced scientific calculator for engineering and mathematics.",
    inStock: true,
    options: {
      Brand: ["CASIO", "Rundun", "Achieva", "Canon"]
    }
  }
];
