import type { BusinessPageData } from "@/types/businessPage";

export const doctorMock: BusinessPageData = {
  slug: "preview-doctor",
  business_name: "Aarav Mehta",
  business_category: "Senior Consultant Cardiologist",
  about_us:
    "Dedicated to providing high-quality cardiac care with a patient-first philosophy. Combining 15+ years of clinical expertise with modern diagnostics to deliver precise, compassionate treatment.",
  mobile_number: "919876543210",
  email_address: "dr.aarav@heartcare.in",
  location_address: "City Heart Institute, Baner, Pune",
  logo_url: "",
  theme_color_hex: "#008080",
  facebook_link: "https://facebook.com",
  instagram_link: "https://instagram.com",
  website_link: "https://heartcare.in",
  products: [
    { name: "Cardiac Consultation",   description: "Comprehensive evaluation of heart health including ECG and stress test review.", price: "₹800",    buttonName: "Book Now" },
    { name: "Echo Cardiography",      description: "Advanced ultrasound imaging to assess heart chambers and valve function.",        price: "₹2,500",  buttonName: "Book Now" },
    { name: "Holter Monitoring",      description: "24-hour heart rhythm recording to detect irregular heartbeats.",                  price: "₹1,800",  buttonName: "Enquiry"  },
    { name: "Cardiac Rehabilitation", description: "Personalised recovery program for post-surgery and heart attack patients.",       price: "₹5,000/month", buttonName: "Enquiry" },
  ],
  gallery_images: [
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600",
    "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600",
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600",
  ],
  template_data: {
    doctor: {
      qualifications: "MBBS, MD (Medicine), DM (Cardiology) — AIIMS Delhi",
      specialty_line: "Senior Consultant Cardiologist & Interventional Specialist",
      stats: [
        { value: "15+",  label: "Years Experience"  },
        { value: "12K+", label: "Patients Treated"  },
        { value: "30+",  label: "Awards & Honours"  },
        { value: "100%", label: "Dedicated Care"    },
      ],
      education_timeline: [
        { period: "2016 – Present", title: "Head of Cardiology",                    institution: "City Heart & Vascular Institute, Pune"      },
        { period: "2011 – 2016",   title: "Senior Consultant Cardiologist",         institution: "Apex Multi-Specialty Hospital, Mumbai"      },
        { period: "2006 – 2011",   title: "DM (Cardiology) Residency",              institution: "All India Institute of Medical Sciences, Delhi" },
        { period: "2000 – 2006",   title: "MBBS & MD (General Medicine)",           institution: "Grant Medical College, Mumbai"              },
      ],
      clinic_timings: [
        { day: "Monday – Friday", time: "09:00 AM – 01:00 PM  ·  04:00 PM – 08:00 PM" },
        { day: "Saturday",        time: "09:00 AM – 02:00 PM"                          },
        { day: "Sunday",          time: "Closed"                                       },
      ],
      testimonials: [
        { text: "Dr. Mehta explained everything about my bypass surgery so clearly. His calm approach made a very stressful situation feel manageable.", patient: "Suresh Iyer",    location: "Baner, Pune"       },
        { text: "I had been to three cardiologists before Dr. Mehta. He was the first to actually listen and diagnose the root cause correctly.",         patient: "Rekha Sharma",  location: "Kothrud, Pune"     },
        { text: "World-class facility, extremely hygienic clinic and the most patient doctor I have ever met. Highly recommended.",                        patient: "Anil Deshmukh", location: "Hinjewadi, Pune"   },
      ],
    },
  },
};
