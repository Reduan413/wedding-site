/* =====================================================================
   CONFIG — edit everything here to personalize the invitation.
   Names, date, venue, story items and events all come from this object.
===================================================================== */

export const CONFIG = {
  brideFirst: 'Priya',
  groomFirst: 'Arjun',
  weddingDateISO: '2027-02-14T18:00:00',
  weddingDateDisplay: '14th February 2027',
  place: 'Jaipur, Rajasthan',
  hashtag: '#PriyaWedsArjun',

  blessing:
    '\u201CMay your love story be blessed with the warmth of a thousand suns and the patience of the moon \u2014 two souls, one journey, one home.\u201D',

  groomQuote: '\u201CThe moment I saw her, I knew my search was over.\u201D',
  brideQuote: '\u201CIn him, I found my love, my best friend, and my home.\u201D',
  coupleClosing:
    "Love is not just about finding the right person, but creating the right relationship. It's not about how much love you have in the beginning but how much love you build until the end. We are starting our forever, and we want you to be part of it.",

  groomParents: 'Mr. Rajesh & Mrs. Sunita Sharma',
  brideParents: 'Mr. Vikram & Mrs. Anjali Mehta',

  venue: {
    name: 'The Amber Palace Gardens',
    address: 'Amer Road, near Jal Mahal, Jaipur, Rajasthan 302002',
    mapsUrl: 'https://maps.google.com/?q=Amber+Palace+Jaipur',
  },

  story: [
    {
      title: 'How We Met',
      meta: 'Winter, 2019',
      text: "A chance introduction at a mutual friend's gathering turned into hours of conversation that neither of us wanted to end.",
    },
    {
      title: 'The Proposal',
      meta: 'Autumn, 2025',
      text: 'Under a sky full of stars in the hills of Udaipur, Arjun asked the question \u2014 and Priya said yes before he even finished it.',
    },
    {
      title: 'Today',
      meta: 'The Big Day',
      text: "Two families, one celebration. We can't wait to begin this new chapter surrounded by the people we love most.",
    },
  ],

  events: [
    {
      name: 'Mehndi',
      when: '12 Feb 2027 \u00B7 4:00 PM',
      venue: 'Sharma Residence, Jaipur',
      desc: "An afternoon of intricate henna, music and mithai as the bride's hands are adorned.",
    },
    {
      name: 'Sangeet',
      when: '13 Feb 2027 \u00B7 7:00 PM',
      venue: 'Amber Palace Gardens, Jaipur',
      desc: 'A night of dance, song and celebration as both families come together for the first time.',
    },
    {
      name: 'Haldi',
      when: '14 Feb 2027 \u00B7 10:00 AM',
      venue: 'Sharma Residence, Jaipur',
      desc: 'A joyful morning ritual with turmeric, laughter and blessings for the couple.',
    },
    {
      name: 'Wedding Ceremony',
      when: '14 Feb 2027 \u00B7 6:00 PM',
      venue: 'Amber Palace Gardens, Jaipur',
      desc: 'The sacred pheras beneath a mandap of marigold and jasmine, as Priya and Arjun become one.',
    },
    {
      name: 'Reception',
      when: '15 Feb 2027 \u00B7 7:30 PM',
      venue: 'The Grand Lawns, Jaipur',
      desc: 'An evening of feasting and celebration to honour the newlyweds.',
    },
  ],
} as const
