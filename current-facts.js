// Current political facts for each country (updated April 2026)
const CURRENT_FACTS = {
  us: [
    { keywords: ['president','current president','who is president','head of state'], answer: 'The current **President of the United States** is **Donald Trump** (Republican Party), inaugurated on January 20, 2025, for his second non-consecutive term. The Vice President is **JD Vance**.' },
    { keywords: ['speaker','house speaker'], answer: 'The current **Speaker of the House** is **Mike Johnson** (Republican, Louisiana).' },
    { keywords: ['chief justice','supreme court chief'], answer: 'The current **Chief Justice of the United States** is **John Roberts**, serving since 2005.' },
    { keywords: ['senate majority leader','senate leader'], answer: 'The current **Senate Majority Leader** is **John Thune** (Republican, South Dakota).' },
    { keywords: ['last election','recent election','2024 election'], answer: 'The most recent presidential election was held on **November 5, 2024**. **Donald Trump** (R) defeated **Kamala Harris** (D) with 312 electoral votes to 226. Republicans also won majorities in both the Senate and House.' },
    { keywords: ['next election','upcoming election','2028'], answer: 'The next U.S. presidential election is scheduled for **November 3, 2028**. Midterm elections for Congress will be held in **November 2026**.' },
  ],
  in: [
    { keywords: ['prime minister','current pm','who is pm','head of government','narendra modi','modi'], answer: 'The current **Prime Minister of India** is **Narendra Modi** (Bharatiya Janata Party — BJP), serving his third consecutive term since 2014. He was most recently re-elected in the **2024 general election** as leader of the NDA (National Democratic Alliance) coalition.' },
    { keywords: ['president','current president','who is president','head of state','droupadi murmu'], answer: 'The current **President of India** is **Droupadi Murmu**, who took office on July 25, 2022. She is the first tribal woman and the second woman to hold the office.' },
    { keywords: ['chief justice','cji','supreme court chief'], answer: 'The **Chief Justice of India (CJI)** is appointed by the President on the recommendation of the outgoing CJI. The CJI heads the Supreme Court and plays a key role in judicial appointments through the collegium system.' },
    { keywords: ['chief election commissioner','cec','current cec'], answer: 'The **Chief Election Commissioner** heads the Election Commission of India. The CEC is appointed by the President and has the same security of tenure as a Supreme Court judge.' },
    { keywords: ['last election','recent election','2024 election','lok sabha election'], answer: 'The most recent **Lok Sabha election** was held in **April–June 2024** across 7 phases. The **BJP-led NDA** won 293 seats (BJP alone: 240), while the **INDIA alliance** won 234 seats. Narendra Modi was sworn in for a third term on June 9, 2024.' },
    { keywords: ['next election','upcoming election','2029'], answer: 'The next **Lok Sabha general election** is expected in **April–May 2029**, unless Parliament is dissolved earlier. Various state assembly elections are held on different schedules.' },
    { keywords: ['opposition','opposition leader','leader of opposition','rahul gandhi'], answer: 'The current **Leader of Opposition in Lok Sabha** is **Rahul Gandhi** (Indian National Congress). The main opposition alliance is **INDIA** (Indian National Developmental Inclusive Alliance).' },
    { keywords: ['ruling party','government party','nda','bjp government'], answer: 'India is currently governed by the **NDA (National Democratic Alliance)** coalition led by the **BJP (Bharatiya Janata Party)**. The NDA includes BJP and allied parties like TDP, JD(U), and others, with a combined 293 seats in the 543-member Lok Sabha.' },
  ],
  gb: [
    { keywords: ['prime minister','current pm','who is pm','head of government','keir starmer'], answer: 'The current **Prime Minister of the United Kingdom** is **Keir Starmer** (Labour Party), who took office on July 5, 2024, after Labour won a landslide victory in the general election.' },
    { keywords: ['king','monarch','head of state','charles'], answer: 'The current **Head of State** is **King Charles III**, who acceded to the throne on September 8, 2022, following the death of Queen Elizabeth II.' },
    { keywords: ['last election','recent election','2024 election'], answer: 'The most recent **UK general election** was held on **July 4, 2024**. **Labour** won a landslide with **411 seats** (out of 650). The Conservatives were reduced to 121 seats, their worst result in history. The Liberal Democrats won 72 seats.' },
    { keywords: ['next election','upcoming election'], answer: 'The next UK general election must be held by **2029** (within 5 years of the 2024 election). The Prime Minister can call an earlier election.' },
    { keywords: ['opposition','opposition leader','conservative leader'], answer: 'The **Leader of the Opposition** is **Kemi Badenoch** (Conservative Party), elected as Conservative leader in November 2024.' },
  ],
  ca: [
    { keywords: ['prime minister','current pm','who is pm','head of government','mark carney'], answer: 'The current **Prime Minister of Canada** is **Mark Carney** (Liberal Party), who took office in March 2025 after winning the Liberal leadership race following Justin Trudeau\'s resignation.' },
    { keywords: ['governor general','head of state','viceregal'], answer: 'The current **Governor General of Canada** is **Mary Simon**, who has served since July 2021. She is the first Indigenous person to hold the position.' },
    { keywords: ['last election','recent election','2025 election'], answer: 'The most recent **Canadian federal election** was held on **April 28, 2025**. The Liberal Party under Mark Carney won the election.' },
    { keywords: ['opposition','opposition leader','conservative leader','pierre poilievre'], answer: '**Pierre Poilievre** is the leader of the **Conservative Party of Canada** and serves as Leader of the Official Opposition.' },
  ],
  au: [
    { keywords: ['prime minister','current pm','who is pm','head of government','anthony albanese','albanese'], answer: 'The current **Prime Minister of Australia** is **Anthony Albanese** (Australian Labor Party), who took office on May 23, 2022, after Labor won the federal election.' },
    { keywords: ['governor general','head of state','viceregal'], answer: 'The current **Governor-General of Australia** is **Sam Mostyn**, who took office on July 1, 2024.' },
    { keywords: ['last election','recent election','2022 election'], answer: 'The most recent **Australian federal election** was held on **May 21, 2022**. Labor won 77 seats (majority: 76), with a notable surge in "teal independent" candidates who won 6 seats from the Liberals. The next election is due by **May 2025**.' },
    { keywords: ['next election','upcoming election','2025'], answer: 'The next Australian federal election must be held by **May 2025** (3 years from the last election). The PM can call it at any time before then.' },
    { keywords: ['opposition','opposition leader','peter dutton'], answer: 'The **Leader of the Opposition** is **Peter Dutton** (Liberal Party), leading the Liberal-National Coalition.' },
  ],
  de: [
    { keywords: ['chancellor','bundeskanzler','current chancellor','head of government','friedrich merz'], answer: 'The current **Chancellor of Germany (Bundeskanzler)** is **Friedrich Merz** (CDU/CSU), who took office in 2025 after the CDU/CSU won the February 2025 federal election.' },
    { keywords: ['president','bundespräsident','head of state','steinmeier'], answer: 'The current **Federal President** is **Frank-Walter Steinmeier** (SPD), serving his second term since 2022. The role is largely ceremonial.' },
    { keywords: ['last election','recent election','2025 election','bundestagswahl'], answer: 'The most recent **Bundestagswahl** (federal election) was held on **February 23, 2025**. The CDU/CSU won the most seats, and Friedrich Merz formed a coalition government.' },
    { keywords: ['next election','upcoming election','2029'], answer: 'The next regular **Bundestagswahl** is expected in **autumn 2029** (4-year term from 2025).' },
    { keywords: ['opposition','opposition leader'], answer: 'The main opposition parties in the current Bundestag include the **SPD**, **Greens**, **AfD**, and **FDP**, depending on which parties joined the governing coalition.' },
  ],
};
