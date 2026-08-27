import type { IndustryDictionary } from "@/content/industry-types";

export const en: IndustryDictionary = {
  healthcare: {
    title: "Healthcare & Medical",
    subtitle: "Clinics, dentists, med spas, therapists",
    description:
      "mandhy answers patient questions, books appointments, and sends reminders, so no call goes to voicemail.",
    slug: "healthcare",
    intro:
      "Patients call when they're already worried — a missed call or a slow reply can send them to the next clinic on the list. mandhy answers immediately, books appointments, and follows up so your front desk isn't the bottleneck.",
    sampleConversation: [
      { from: "user", text: "Hi, do you have any openings this week for a cleaning?" },
      { from: "ai", text: "Yes! I have Tuesday at 2pm or Thursday at 10am open. Which works better for you?" },
      { from: "user", text: "Thursday at 10 is perfect." },
      { from: "ai", text: "You're booked for Thursday at 10am. I'll text you a reminder the day before." },
    ],
    painPoints: [
      "Calls that come in after hours or during appointments go straight to voicemail.",
      "Patients who don't get a same-day reply often just call the next clinic.",
      "No-shows eat into a schedule that's booked weeks out.",
      "Front desk staff spend hours a week just confirming and rescheduling.",
    ],
    adaptation: {
      headline: "Built around how a clinic actually runs",
      body: "mandhy answers patient questions using your real intake information, checks your calendar in real time, and sends reminders and confirmations automatically, so your team can focus on the patients in front of them, not the phone.",
    },
    faq: [
      {
        question: "Can mandhy handle insurance or medical questions?",
        answer:
          "mandhy answers general questions about your practice, hours, services, and appointment types, and escalates anything clinical or insurance-specific to your team.",
      },
      {
        question: "Will it replace my front desk?",
        answer:
          "No. mandhy handles scheduling and repetitive questions so your front desk can focus on patients in the office, not the phone.",
      },
      {
        question: "Can it reduce no-shows?",
        answer:
          "mandhy sends automatic reminders and confirmations ahead of each appointment, which is the main lever practices use to cut down no-shows.",
      },
      {
        question: "Does it work with my existing scheduling system?",
        answer: "mandhy is built around your current calendar and workflow wherever possible. Contact us to scope your specific setup.",
      },
    ],
    finalCta: {
      headline: "Stop losing patients to a missed call.",
      cta: { label: "Request an audit for your practice", href: "/contact" },
    },
  },
  homeServices: {
    title: "Home Services & Trades",
    subtitle: "Plumbers, electricians, HVAC, contractors",
    description:
      "Every inbound call and message gets a fast reply and a scheduled visit, even when your team is on a job.",
    slug: "home-services",
    intro:
      "A missed call for a plumber or electrician is a job that goes to a competitor. mandhy answers immediately, handles urgent requests, and gets a visit on the calendar, even when your crew is on-site.",
    sampleConversation: [
      { from: "user", text: "My water heater is leaking, can someone come out today?" },
      { from: "ai", text: "I'm sorry to hear that — I have an opening at 3pm today. Want me to book it?" },
      { from: "user", text: "Yes please." },
      { from: "ai", text: "You're booked for 3pm today. I'll send the address confirmation and a reminder text." },
    ],
    painPoints: [
      "Calls during a job go unanswered, and the caller moves to the next name on Google.",
      "Urgent requests need a fast response, not a callback tomorrow.",
      "Quotes sent by hand take hours your team doesn't have between jobs.",
      "Weekend and after-hours calls are the ones most likely to be true emergencies, and the easiest to miss.",
    ],
    adaptation: {
      headline: "Built for a crew that's always on the move",
      body: "mandhy answers every call and message, checks real-time availability, and books the visit, so leads don't go cold while your team is on a job. Urgent requests get flagged and can escalate straight to your team.",
    },
    faq: [
      {
        question: "Can mandhy handle emergency calls?",
        answer:
          "mandhy can flag urgent requests for immediate escalation to your team, while still handling routine bookings and quotes on its own.",
      },
      {
        question: "Can it send instant quotes?",
        answer:
          "Yes, for standardized jobs mandhy can share pricing ranges and next steps immediately; anything that needs an on-site look gets scheduled directly.",
      },
      {
        question: "Does it work outside business hours?",
        answer: "Yes, mandhy works 24/7, including nights and weekends when trade emergencies are most likely to happen.",
      },
      {
        question: "Do I need to replace my current tools?",
        answer: "Not necessarily. mandhy is built around your current operation wherever possible.",
      },
    ],
    finalCta: {
      headline: "Never lose another job to a missed call.",
      cta: { label: "Request an audit for your business", href: "/contact" },
    },
  },
  professionalServices: {
    title: "Professional Services",
    subtitle: "Law firms, accountants, consultants, agencies",
    description:
      "mandhy qualifies leads and books consultations, so your team only spends time on the conversations that matter.",
    slug: "professional-services",
    intro:
      "Potential clients decide who to work with based on who responds first. mandhy screens inquiries, books consultations, and handles intake questions, so your team spends time only on the conversations that matter.",
    sampleConversation: [
      { from: "user", text: "I need help with a contract review, do you take new clients?" },
      { from: "ai", text: "We do! I can set up a free 20-minute consultation to see if we're a fit. Does this Wednesday at 11am work?" },
      { from: "user", text: "Wednesday works." },
      { from: "ai", text: "You're confirmed for Wednesday at 11am. I'll send a short intake form beforehand." },
    ],
    painPoints: [
      "Unqualified inquiries take up time that should go to real prospects.",
      "A slow reply to a new client inquiry often means they've already called someone else.",
      "Intake questions repeat themselves call after call.",
      "Consultations get missed when scheduling happens over email back-and-forth.",
    ],
    adaptation: {
      headline: "Built to protect your team's time",
      body: "mandhy answers common questions, gathers the basic information you need up front, and books consultations directly on your calendar, so your team only steps in for conversations that are already qualified.",
    },
    faq: [
      {
        question: "Can mandhy qualify leads before they reach my team?",
        answer: "Yes, mandhy asks the questions you'd normally ask up front and can route only qualified inquiries to a person.",
      },
      {
        question: "Can it book consultations automatically?",
        answer: "Yes, mandhy checks real-time availability and books directly on your calendar.",
      },
      {
        question: "Is confidential information safe?",
        answer:
          "mandhy is trained on the information you provide and escalates anything sensitive to your team rather than handling it independently.",
      },
      {
        question: "Can it replace my intake process?",
        answer: "It handles the repetitive first step, general questions and scheduling, while anything case-specific goes to your team.",
      },
    ],
    finalCta: {
      headline: "Spend your time on clients, not scheduling.",
      cta: { label: "Request an audit for your firm", href: "/contact" },
    },
  },
  realEstate: {
    title: "Real Estate",
    subtitle: "Agents, brokerages, property managers",
    description:
      "Buyer and renter inquiries get an instant response and a showing on the calendar, day or night.",
    slug: "real-estate",
    intro:
      "Buyers and renters move on fast if no one answers. mandhy responds to inquiries instantly, checks availability, and books showings, so you never miss a lead because you were already with a client.",
    sampleConversation: [
      { from: "user", text: "Is the 3-bedroom on Maple Street still available?" },
      { from: "ai", text: "Yes, it is! Would you like to schedule a showing? I have Saturday at 11am or 2pm open." },
      { from: "user", text: "11am works." },
      { from: "ai", text: "You're booked for Saturday at 11am. I'll send the address and a reminder the day before." },
    ],
    painPoints: [
      "A buyer who doesn't hear back in minutes calls the next listing.",
      "Showings scheduled by phone tag lose momentum fast.",
      "Agents can't answer inquiries while they're already showing a property.",
      "Renter and buyer questions repeat across every listing.",
    ],
    adaptation: {
      headline: "Built to never miss a lead",
      body: "mandhy answers inquiries the moment they come in, checks your calendar in real time, and books showings directly, so a lead never goes cold just because you were already with a client.",
    },
    faq: [
      {
        question: "Can mandhy handle multiple listings at once?",
        answer: "Yes, mandhy can answer inquiries and book showings across all of your active listings.",
      },
      {
        question: "Can it qualify buyers or renters?",
        answer: "mandhy can ask basic qualifying questions before booking a showing, so your time is spent on serious inquiries.",
      },
      {
        question: "Does it work with my CRM?",
        answer: "mandhy is built around your current operation wherever possible. Contact us to scope your specific setup.",
      },
      {
        question: "Can it help with follow-up after a showing?",
        answer: "Yes, mandhy can follow up automatically so interested buyers and renters don't fall through the cracks.",
      },
    ],
    finalCta: {
      headline: "Never miss another showing request.",
      cta: { label: "Request an audit for your listings", href: "/contact" },
    },
  },
  rentals: {
    title: "Rentals & Hire",
    subtitle: "Equipment rental, event rentals, vehicle hire",
    description:
      "mandhy checks availability, quotes, and confirms bookings automatically, even outside business hours.",
    slug: "rentals",
    intro:
      "Availability questions come in around the clock, and a slow answer means a lost booking. mandhy checks availability, quotes, and confirms reservations automatically, even outside business hours.",
    sampleConversation: [
      { from: "user", text: "Do you have anything available this weekend for a 4-person tent?" },
      { from: "ai", text: "Yes, we have that available Saturday through Sunday. Want me to reserve it for you?" },
      { from: "user", text: "Yes, please." },
      { from: "ai", text: "You're all set for the weekend. I'll send a confirmation and pickup details now." },
    ],
    painPoints: [
      "Availability questions at 9pm on a Friday go unanswered until Monday.",
      "Manually checking inventory for every inquiry eats up staff time.",
      "A slow quote means the customer books somewhere else.",
      "Confirmations and pickup details sent by hand are easy to forget.",
    ],
    adaptation: {
      headline: "Built to book while you're closed",
      body: "mandhy checks real-time availability, shares pricing, and confirms the reservation automatically, even at 11pm on a Saturday, when most rental inquiries actually come in.",
    },
    faq: [
      {
        question: "Can mandhy check real inventory availability?",
        answer: "Yes, mandhy is connected to your calendar and availability, so it only confirms bookings that are actually open.",
      },
      {
        question: "Can it take deposits or payments?",
        answer: "mandhy can walk a customer through your booking and payment process; contact us to scope your specific setup.",
      },
      {
        question: "Does it work for same-day requests?",
        answer: "Yes, mandhy responds instantly, which is especially useful for last-minute rental requests.",
      },
      {
        question: "Can it send pickup or delivery details?",
        answer: "Yes, mandhy can send confirmation details and reminders automatically once a booking is made.",
      },
    ],
    finalCta: {
      headline: "Turn after-hours inquiries into confirmed bookings.",
      cta: { label: "Request an audit for your rental business", href: "/contact" },
    },
  },
  beautyWellness: {
    title: "Beauty & Wellness",
    subtitle: "Salons, spas, gyms, wellness studios",
    description:
      "Clients book, reschedule, and get reminders on their own, so your front desk isn't stuck on the phone.",
    slug: "beauty-wellness",
    intro:
      "A full calendar depends on filling every gap, and clients expect to book without a phone call. mandhy handles bookings, reschedules, and reminders on its own, so your front desk isn't stuck on the phone all day.",
    sampleConversation: [
      { from: "user", text: "Can I book a haircut for tomorrow afternoon?" },
      { from: "ai", text: "Of course! I have 1pm or 4:30pm open tomorrow. Which do you prefer?" },
      { from: "user", text: "4:30 please." },
      { from: "ai", text: "You're booked for 4:30pm tomorrow. I'll send a reminder a few hours before." },
    ],
    painPoints: [
      "Clients expect to book anytime, not just during business hours.",
      "Last-minute cancellations leave gaps that go unfilled.",
      "Front desk staff spend more time on the phone than with clients in the chair.",
      "No-shows are costly when every appointment slot is limited.",
    ],
    adaptation: {
      headline: "Built to keep your calendar full",
      body: "mandhy handles bookings, reschedules, and reminders automatically, and can reach out when a slot opens up, so your front desk can focus on the clients actually in the building.",
    },
    faq: [
      {
        question: "Can mandhy fill last-minute cancellations?",
        answer: "Yes, mandhy can notify clients when a slot opens up, helping fill gaps left by late cancellations.",
      },
      {
        question: "Can it handle rebooking automatically?",
        answer: "Yes, mandhy can prompt clients to rebook after their appointment so your calendar stays full.",
      },
      {
        question: "Does it work for walk-in businesses too?",
        answer: "mandhy is built around your current operation wherever possible. Contact us to scope your specific setup.",
      },
      {
        question: "Can it help sell products or add-ons?",
        answer: "mandhy can share information about services and products between appointments; contact us to scope what fits your business.",
      },
    ],
    finalCta: {
      headline: "Keep every chair, every slot, booked.",
      cta: { label: "Request an audit for your business", href: "/contact" },
    },
  },
};
