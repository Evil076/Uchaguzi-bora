import { Candidate, CapstoneSection, Position, County } from './types';

export const BALLOT_CONFIG: Record<Position, { label: string; color: string; description: string }> = {
  PRESIDENT: { label: 'President', color: 'bg-slate-50', description: 'The Head of State and Government' },
  GOVERNOR: { label: 'Governor', color: 'bg-blue-50', description: 'County Chief Executive' },
  SENATOR: { label: 'Senator', color: 'bg-yellow-50', description: 'County Representative to Senate' },
  WOMAN_REP: { label: 'Woman Rep', color: 'bg-purple-50', description: 'County Woman Representative' },
  MP: { label: 'Member of Parliament', color: 'bg-green-50', description: 'Constituency Representative' },
  MCA: { label: 'MCA', color: 'bg-orange-50', description: 'Member of County Assembly' },
};

export const DIASPORA_LOCATIONS = [
  { id: 'uk_lon', name: 'United Kingdom (London)' },
  { id: 'us_dc', name: 'USA (Washington DC)' },
  { id: 'uae_dub', name: 'UAE (Dubai)' },
  { id: 'sa_pre', name: 'South Africa (Pretoria)' },
  { id: 'de_ber', name: 'Germany (Berlin)' },
  { id: 'ca_tor', name: 'Canada (Toronto)' }
];

export const KENYAN_LOCATIONS: County[] = [
  {
    id: 'county_047',
    name: 'Nairobi City',
    code: '047',
    constituencies: [
      { id: 'const_westlands', name: 'Westlands' },
      { id: 'const_langata', name: 'Langata' },
      { id: 'const_kibra', name: 'Kibra' },
      { id: 'const_embakasi', name: 'Embakasi East' }
    ]
  },
  {
    id: 'county_042',
    name: 'Kisumu',
    code: '042',
    constituencies: [
      { id: 'const_kisumu_central', name: 'Kisumu Central' },
      { id: 'const_nyakach', name: 'Nyakach' },
      { id: 'const_muhoroni', name: 'Muhoroni' }
    ]
  },
  {
    id: 'county_001',
    name: 'Mombasa',
    code: '001',
    constituencies: [
      { id: 'const_nyali', name: 'Nyali' },
      { id: 'const_mvita', name: 'Mvita' },
      { id: 'const_likoni', name: 'Likoni' }
    ]
  },
  {
    id: 'county_032',
    name: 'Nakuru',
    code: '032',
    constituencies: [
      { id: 'const_nakuru_east', name: 'Nakuru Town East' },
      { id: 'const_naivasha', name: 'Naivasha' },
      { id: 'const_molo', name: 'Molo' }
    ]
  },
  {
    id: 'county_027',
    name: 'Uasin Gishu',
    code: '027',
    constituencies: [
      { id: 'const_soy', name: 'Soy' },
      { id: 'const_turbo', name: 'Turbo' },
      { id: 'const_kesses', name: 'Kesses' }
    ]
  },
  {
    id: 'county_022',
    name: 'Kiambu',
    code: '022',
    constituencies: [
      { id: 'const_ruiru', name: 'Ruiru' },
      { id: 'const_thika', name: 'Thika Town' },
      { id: 'const_gatundu', name: 'Gatundu South' }
    ]
  }
];

export const CANDIDATES: Candidate[] = [
  // ==========================
  // NATIONAL - PRESIDENT
  // ==========================
  { id: 'p1', name: 'Amani Kenya', party: 'Unity Alliance', position: 'PRESIDENT', photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200', color: '#ef4444', votes: 4520123, regionId: 'national' },
  { id: 'p2', name: 'Baraka Msingi', party: 'Progressive Party', position: 'PRESIDENT', photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200', color: '#22c55e', votes: 4100567, regionId: 'national' },
  { id: 'p3', name: 'David Omondi', party: 'Tech Forward', position: 'PRESIDENT', photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200', color: '#3b82f6', votes: 1200890, regionId: 'national' },

  // ==========================
  // 047 - NAIROBI CITY
  // ==========================
  // Governor
  { id: 'nrb_g_1', name: 'Hon. Sarah Wanjiku', party: 'Unity Alliance', position: 'GOVERNOR', photoUrl: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=200&h=200', color: '#ef4444', votes: 890000, regionId: 'county_047' },
  { id: 'nrb_g_2', name: 'Gov. James Kiptoo', party: 'Progressive Party', position: 'GOVERNOR', photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200', color: '#22c55e', votes: 750000, regionId: 'county_047' },
  // Senator
  { id: 'nrb_s_1', name: 'Sen. Omari Ali', party: 'Independent', position: 'SENATOR', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200', color: '#64748b', votes: 600000, regionId: 'county_047' },
  { id: 'nrb_s_2', name: 'Sen. Edwin Sifuna', party: 'Unity Alliance', position: 'SENATOR', photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200', color: '#ef4444', votes: 580000, regionId: 'county_047' },
  // Woman Rep
  { id: 'nrb_w_1', name: 'Rep. Beatrice M', party: 'Progressive Party', position: 'WOMAN_REP', photoUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200&h=200', color: '#22c55e', votes: 400000, regionId: 'county_047' },
  { id: 'nrb_w_2', name: 'Rep. Esther P', party: 'Unity Alliance', position: 'WOMAN_REP', photoUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200&h=200', color: '#ef4444', votes: 380000, regionId: 'county_047' },
  
  // -- Nairobi Constituencies --
  // Westlands
  { id: 'nrb_c1_mp1', name: 'Peter Kamau', party: 'Independent', position: 'MP', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200', color: '#64748b', votes: 45000, regionId: 'const_westlands' },
  { id: 'nrb_c1_mp2', name: 'Nelson Havi', party: 'Unity Alliance', position: 'MP', photoUrl: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?auto=format&fit=crop&q=80&w=200&h=200', color: '#ef4444', votes: 41000, regionId: 'const_westlands' },
  { id: 'nrb_c1_mca1', name: 'John Juma', party: 'Unity Alliance', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=200&h=200', color: '#ef4444', votes: 12000, regionId: 'const_westlands' },
  { id: 'nrb_c1_mca2', name: 'Alice Waithera', party: 'Independent', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200', color: '#64748b', votes: 8000, regionId: 'const_westlands' },

  // Langata
  { id: 'nrb_c2_mp1', name: 'Felix Odiwuor', party: 'Progressive Party', position: 'MP', photoUrl: 'https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?auto=format&fit=crop&q=80&w=200&h=200', color: '#22c55e', votes: 35000, regionId: 'const_langata' },
  { id: 'nrb_c2_mp2', name: 'Nixon Korir', party: 'Unity Alliance', position: 'MP', photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200&h=200', color: '#ef4444', votes: 30000, regionId: 'const_langata' },
  { id: 'nrb_c2_mca1', name: 'Mugambi Mark', party: 'Unity Alliance', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200', color: '#ef4444', votes: 8000, regionId: 'const_langata' },
  { id: 'nrb_c2_mca2', name: 'Jane Mwangi', party: 'Progressive Party', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656ec?auto=format&fit=crop&q=80&w=200&h=200', color: '#22c55e', votes: 6000, regionId: 'const_langata' },

  // Kibra
  { id: 'nrb_c3_mp1', name: 'Peter Orero', party: 'Progressive Party', position: 'MP', photoUrl: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=200&h=200', color: '#22c55e', votes: 28000, regionId: 'const_kibra' },
  { id: 'nrb_c3_mp2', name: 'Imran Okoth', party: 'Independent', position: 'MP', photoUrl: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=200&h=200', color: '#64748b', votes: 22000, regionId: 'const_kibra' },
  { id: 'nrb_c3_mca1', name: 'Suleiman M', party: 'Progressive Party', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?auto=format&fit=crop&q=80&w=200&h=200', color: '#22c55e', votes: 5000, regionId: 'const_kibra' },
  { id: 'nrb_c3_mca2', name: 'Rose Auma', party: 'Unity Alliance', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=200&h=200', color: '#ef4444', votes: 3000, regionId: 'const_kibra' },

  // Embakasi East
  { id: 'nrb_c4_mp1', name: 'Paul Ongili', party: 'Progressive Party', position: 'MP', photoUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=200&h=200', color: '#22c55e', votes: 45000, regionId: 'const_embakasi' },
  { id: 'nrb_c4_mp2', name: 'Francis Mureithi', party: 'Unity Alliance', position: 'MP', photoUrl: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=200&h=200', color: '#ef4444', votes: 38000, regionId: 'const_embakasi' },
  { id: 'nrb_c4_mca1', name: 'Michael O', party: 'Independent', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?auto=format&fit=crop&q=80&w=200&h=200', color: '#64748b', votes: 9000, regionId: 'const_embakasi' },
  { id: 'nrb_c4_mca2', name: 'Mary Wanjiku', party: 'Unity Alliance', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200', color: '#ef4444', votes: 6000, regionId: 'const_embakasi' },

  // ==========================
  // 042 - KISUMU
  // ==========================
  // Governor
  { id: 'ksm_g_1', name: 'Prof. Anyango Luo', party: 'Nyanza United', position: 'GOVERNOR', photoUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200&h=200', color: '#ea580c', votes: 420000, regionId: 'county_042' },
  { id: 'ksm_g_2', name: 'Dr. Isaac Ochieng', party: 'Reform Party', position: 'GOVERNOR', photoUrl: 'https://images.unsplash.com/photo-1534030347209-567898bb690f?auto=format&fit=crop&q=80&w=200&h=200', color: '#0f172a', votes: 380000, regionId: 'county_042' },
  // Senator
  { id: 'ksm_s_1', name: 'Sen. Tom Odhiambo', party: 'Nyanza United', position: 'SENATOR', photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200', color: '#ea580c', votes: 350000, regionId: 'county_042' },
  { id: 'ksm_s_2', name: 'Sen. Fred Outa', party: 'Independent', position: 'SENATOR', photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200', color: '#64748b', votes: 200000, regionId: 'county_042' },
  // Woman Rep
  { id: 'ksm_w_1', name: 'Rep. Ruth Odinga', party: 'Nyanza United', position: 'WOMAN_REP', photoUrl: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=200&h=200', color: '#ea580c', votes: 380000, regionId: 'county_042' },
  { id: 'ksm_w_2', name: 'Rep. Rose Nyamunga', party: 'Independent', position: 'WOMAN_REP', photoUrl: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&q=80&w=200&h=200', color: '#64748b', votes: 150000, regionId: 'county_042' },
  
  // Kisumu Central
  { id: 'ksm_c1_mp1', name: 'Joshua Oron', party: 'Nyanza United', position: 'MP', photoUrl: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&q=80&w=200&h=200', color: '#ea580c', votes: 35000, regionId: 'const_kisumu_central' },
  { id: 'ksm_c1_mca1', name: 'Joachim Oketch', party: 'Nyanza United', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=200&h=200', color: '#ea580c', votes: 12000, regionId: 'const_kisumu_central' },
  { id: 'ksm_c1_mca2', name: 'Lilian Achieng', party: 'Independent', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200&h=200', color: '#64748b', votes: 4000, regionId: 'const_kisumu_central' },

  // Nyakach
  { id: 'ksm_c2_mp1', name: 'Aduma Owuor', party: 'Nyanza United', position: 'MP', photoUrl: 'https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?auto=format&fit=crop&q=80&w=200&h=200', color: '#ea580c', votes: 28000, regionId: 'const_nyakach' },
  { id: 'ksm_c2_mca1', name: 'Tom Nyamoko', party: 'Independent', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200', color: '#64748b', votes: 5000, regionId: 'const_nyakach' },
  { id: 'ksm_c2_mca2', name: 'Grace Akoth', party: 'Nyanza United', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=200&h=200', color: '#ea580c', votes: 4500, regionId: 'const_nyakach' },

  // Muhoroni
  { id: 'ksm_c3_mp1', name: 'James Koyoo', party: 'Nyanza United', position: 'MP', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200', color: '#ea580c', votes: 30000, regionId: 'const_muhoroni' },
  { id: 'ksm_c3_mca1', name: 'Benta N', party: 'Nyanza United', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656ec?auto=format&fit=crop&q=80&w=200&h=200', color: '#ea580c', votes: 8000, regionId: 'const_muhoroni' },
  { id: 'ksm_c3_mca2', name: 'Patrick O', party: 'Independent', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200', color: '#64748b', votes: 3000, regionId: 'const_muhoroni' },

  // ==========================
  // 001 - MOMBASA
  // ==========================
  // Governor
  { id: 'mba_g_1', name: 'Gov. Abdulswamad Nassir', party: 'Coastal Unity', position: 'GOVERNOR', photoUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=200&h=200', color: '#3b82f6', votes: 200000, regionId: 'county_001' },
  { id: 'mba_g_2', name: 'Hassan Omar', party: 'Unity Alliance', position: 'GOVERNOR', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200', color: '#ef4444', votes: 180000, regionId: 'county_001' },
  // Senator
  { id: 'mba_s_1', name: 'Sen. Faki Mwinyihaji', party: 'Coastal Unity', position: 'SENATOR', photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200', color: '#3b82f6', votes: 150000, regionId: 'county_001' },
  { id: 'mba_s_2', name: 'Hamisi Mwaguya', party: 'Unity Alliance', position: 'SENATOR', photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200', color: '#ef4444', votes: 120000, regionId: 'county_001' },
  // Woman Rep
  { id: 'mba_w_1', name: 'Rep. Zamzam Mohamed', party: 'Coastal Unity', position: 'WOMAN_REP', photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200', color: '#3b82f6', votes: 160000, regionId: 'county_001' },
  { id: 'mba_w_2', name: 'Amina Abdalla', party: 'Unity Alliance', position: 'WOMAN_REP', photoUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200&h=200', color: '#ef4444', votes: 100000, regionId: 'county_001' },

  // Nyali
  { id: 'mba_c1_mp1', name: 'Mohammed Ali', party: 'Unity Alliance', position: 'MP', photoUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=200&h=200', color: '#ef4444', votes: 35000, regionId: 'const_nyali' },
  { id: 'mba_c1_mp2', name: 'Said Abdalla', party: 'Coastal Unity', position: 'MP', photoUrl: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=200&h=200', color: '#3b82f6', votes: 30000, regionId: 'const_nyali' },
  { id: 'mba_c1_mca1', name: 'Fadhili M', party: 'Unity Alliance', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200', color: '#ef4444', votes: 10000, regionId: 'const_nyali' },
  { id: 'mba_c1_mca2', name: 'Fatuma S', party: 'Coastal Unity', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200', color: '#3b82f6', votes: 8000, regionId: 'const_nyali' },

  // Mvita
  { id: 'mba_c2_mp1', name: 'Massoud Machele', party: 'Coastal Unity', position: 'MP', photoUrl: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=200&h=200', color: '#3b82f6', votes: 25000, regionId: 'const_mvita' },
  { id: 'mba_c2_mca1', name: 'Swaleh A', party: 'Coastal Unity', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=200&h=200', color: '#3b82f6', votes: 6000, regionId: 'const_mvita' },
  { id: 'mba_c2_mca2', name: 'Omar K', party: 'Independent', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200', color: '#64748b', votes: 3000, regionId: 'const_mvita' },

  // Likoni
  { id: 'mba_c3_mp1', name: 'Mishi Mboko', party: 'Coastal Unity', position: 'MP', photoUrl: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=200&h=200', color: '#3b82f6', votes: 28000, regionId: 'const_likoni' },
  { id: 'mba_c3_mca1', name: 'Hamisi D', party: 'Independent', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200', color: '#64748b', votes: 5000, regionId: 'const_likoni' },
  { id: 'mba_c3_mca2', name: 'Zainab M', party: 'Coastal Unity', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200&h=200', color: '#3b82f6', votes: 4000, regionId: 'const_likoni' },

  // ==========================
  // 032 - NAKURU
  // ==========================
  // Governor
  { id: 'nku_g_1', name: 'Gov. Susan Kihika', party: 'Unity Alliance', position: 'GOVERNOR', photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200', color: '#f59e0b', votes: 320000, regionId: 'county_032' },
  { id: 'nku_g_2', name: 'Lee Kinyanjui', party: 'Rift Development', position: 'GOVERNOR', photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200', color: '#0f172a', votes: 280000, regionId: 'county_032' },
  // Senator
  { id: 'nku_s_1', name: 'Sen. Tabitha Karanja', party: 'Unity Alliance', position: 'SENATOR', photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200', color: '#f59e0b', votes: 300000, regionId: 'county_032' },
  { id: 'nku_s_2', name: 'John Mututho', party: 'Independent', position: 'SENATOR', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200', color: '#64748b', votes: 150000, regionId: 'county_032' },
  // Woman Rep
  { id: 'nku_w_1', name: 'Rep. Liza Chelule', party: 'Unity Alliance', position: 'WOMAN_REP', photoUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200&h=200', color: '#f59e0b', votes: 250000, regionId: 'county_032' },
  
  // Nakuru Town East
  { id: 'nku_c1_mp1', name: 'David Gikaria', party: 'Unity Alliance', position: 'MP', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200', color: '#f59e0b', votes: 30000, regionId: 'const_nakuru_east' },
  { id: 'nku_c1_mca1', name: 'Menengai Ward Rep', party: 'Unity Alliance', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=200&h=200', color: '#f59e0b', votes: 8000, regionId: 'const_nakuru_east' },
  { id: 'nku_c1_mca2', name: 'Biashara Rep', party: 'Independent', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200', color: '#64748b', votes: 5000, regionId: 'const_nakuru_east' },

  // Naivasha
  { id: 'nku_c2_mp1', name: 'Jayne Kihara', party: 'Unity Alliance', position: 'MP', photoUrl: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=200&h=200', color: '#f59e0b', votes: 35000, regionId: 'const_naivasha' },
  { id: 'nku_c2_mca1', name: 'Hellsgate MCA', party: 'Independent', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200', color: '#64748b', votes: 6000, regionId: 'const_naivasha' },
  { id: 'nku_c2_mca2', name: 'Lake View MCA', party: 'Unity Alliance', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656ec?auto=format&fit=crop&q=80&w=200&h=200', color: '#f59e0b', votes: 5500, regionId: 'const_naivasha' },

  // Molo
  { id: 'nku_c3_mp1', name: 'Kuria Kimani', party: 'Unity Alliance', position: 'MP', photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200', color: '#f59e0b', votes: 28000, regionId: 'const_molo' },
  { id: 'nku_c3_mca1', name: 'Turi MCA', party: 'Rift Development', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200', color: '#0f172a', votes: 7000, regionId: 'const_molo' },
  { id: 'nku_c3_mca2', name: 'Elburgon MCA', party: 'Unity Alliance', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=200&h=200', color: '#f59e0b', votes: 6000, regionId: 'const_molo' },

  // ==========================
  // 027 - UASIN GISHU
  // ==========================
  // Governor
  { id: 'ugs_g_1', name: 'Gov. Jonathan Bii', party: 'Unity Alliance', position: 'GOVERNOR', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200', color: '#f59e0b', votes: 200000, regionId: 'county_027' },
  { id: 'ugs_g_2', name: 'Zedekiah Bundotich', party: 'Independent', position: 'GOVERNOR', photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200', color: '#64748b', votes: 150000, regionId: 'county_027' },
  // Senator
  { id: 'ugs_s_1', name: 'Sen. Jackson Mandago', party: 'Unity Alliance', position: 'SENATOR', photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200', color: '#f59e0b', votes: 180000, regionId: 'county_027' },
  // Woman Rep
  { id: 'ugs_w_1', name: 'Rep. Gladys Shollei', party: 'Unity Alliance', position: 'WOMAN_REP', photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200', color: '#f59e0b', votes: 170000, regionId: 'county_027' },

  // Soy
  { id: 'ugs_c1_mp1', name: 'David Kiplagat', party: 'Unity Alliance', position: 'MP', photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200', color: '#f59e0b', votes: 30000, regionId: 'const_soy' },
  { id: 'ugs_c1_mca1', name: 'Soy Ward MCA', party: 'Unity Alliance', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=200&h=200', color: '#f59e0b', votes: 8000, regionId: 'const_soy' },
  { id: 'ugs_c1_mca2', name: 'Ziwa MCA', party: 'Independent', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200', color: '#64748b', votes: 4000, regionId: 'const_soy' },

  // Turbo
  { id: 'ugs_c2_mp1', name: 'Janet Sitienei', party: 'Unity Alliance', position: 'MP', photoUrl: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=200&h=200', color: '#f59e0b', votes: 32000, regionId: 'const_turbo' },
  { id: 'ugs_c2_mca1', name: 'Huruma MCA', party: 'Independent', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200', color: '#64748b', votes: 5000, regionId: 'const_turbo' },
  { id: 'ugs_c2_mca2', name: 'Ngenyilel MCA', party: 'Unity Alliance', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656ec?auto=format&fit=crop&q=80&w=200&h=200', color: '#f59e0b', votes: 4500, regionId: 'const_turbo' },

  // Kesses
  { id: 'ugs_c3_mp1', name: 'Julius Rutto', party: 'Unity Alliance', position: 'MP', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200', color: '#f59e0b', votes: 25000, regionId: 'const_kesses' },
  { id: 'ugs_c3_mca1', name: 'Tarakwa MCA', party: 'Unity Alliance', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200', color: '#f59e0b', votes: 6000, regionId: 'const_kesses' },
  { id: 'ugs_c3_mca2', name: 'Racecourse MCA', party: 'Independent', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=200&h=200', color: '#64748b', votes: 3000, regionId: 'const_kesses' },

  // ==========================
  // 022 - KIAMBU
  // ==========================
  // Governor
  { id: 'kbu_g_1', name: 'Gov. Kimani Wamatangi', party: 'Unity Alliance', position: 'GOVERNOR', photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200', color: '#f59e0b', votes: 450000, regionId: 'county_022' },
  { id: 'kbu_g_2', name: 'William Kabogo', party: 'Independent', position: 'GOVERNOR', photoUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=200&h=200', color: '#64748b', votes: 300000, regionId: 'county_022' },
  // Senator
  { id: 'kbu_s_1', name: 'Sen. Karungo Thang\'wa', party: 'Unity Alliance', position: 'SENATOR', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200', color: '#f59e0b', votes: 400000, regionId: 'county_022' },
  // Woman Rep
  { id: 'kbu_w_1', name: 'Rep. Anne Wamuratha', party: 'Unity Alliance', position: 'WOMAN_REP', photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200', color: '#f59e0b', votes: 380000, regionId: 'county_022' },

  // Ruiru
  { id: 'kbu_c1_mp1', name: 'Simon Kingara', party: 'Unity Alliance', position: 'MP', photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200', color: '#f59e0b', votes: 45000, regionId: 'const_ruiru' },
  { id: 'kbu_c1_mca1', name: 'Biashara MCA', party: 'Unity Alliance', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=200&h=200', color: '#f59e0b', votes: 12000, regionId: 'const_ruiru' },
  { id: 'kbu_c1_mca2', name: 'Githurai MCA', party: 'Independent', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200', color: '#64748b', votes: 8000, regionId: 'const_ruiru' },

  // Thika Town
  { id: 'kbu_c2_mp1', name: 'Alice Ng\'ang\'a', party: 'Unity Alliance', position: 'MP', photoUrl: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=200&h=200', color: '#f59e0b', votes: 40000, regionId: 'const_thika' },
  { id: 'kbu_c2_mca1', name: 'Township MCA', party: 'Independent', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200', color: '#64748b', votes: 8000, regionId: 'const_thika' },
  { id: 'kbu_c2_mca2', name: 'Hospital Ward MCA', party: 'Unity Alliance', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656ec?auto=format&fit=crop&q=80&w=200&h=200', color: '#f59e0b', votes: 5000, regionId: 'const_thika' },

  // Gatundu South
  { id: 'kbu_c3_mp1', name: 'G.G. Kagombe', party: 'Unity Alliance', position: 'MP', photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200', color: '#f59e0b', votes: 35000, regionId: 'const_gatundu' },
  { id: 'kbu_c3_mca1', name: 'Kiamwangi MCA', party: 'Unity Alliance', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=200&h=200', color: '#f59e0b', votes: 7000, regionId: 'const_gatundu' },
  { id: 'kbu_c3_mca2', name: 'Kiganjo MCA', party: 'Independent', position: 'MCA', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200', color: '#64748b', votes: 4000, regionId: 'const_gatundu' }
];

export const DEMOGRAPHICS_DATA = [
  { name: 'Nairobi', value: 35, color: '#0f172a' },
  { name: 'Rift Valley', value: 25, color: '#334155' },
  { name: 'Central', value: 20, color: '#475569' },
  { name: 'Coast', value: 10, color: '#64748b' },
  { name: 'Diaspora (UK/US)', value: 10, color: '#16a34a' },
];

export const VOTING_TRENDS = [
  { time: '06:00', votes: 12000 },
  { time: '08:00', votes: 45000 },
  { time: '10:00', votes: 88000 },
  { time: '12:00', votes: 95000 },
  { time: '14:00', votes: 72000 },
  { time: '16:00', votes: 110000 },
  { time: '18:00', votes: 65000 },
];

export const PERSONAS = [
  {
    name: "Wanjiku (The Rural Voter)",
    role: "Elderly Farmer in Kitui",
    context: "Uses a feature phone (kabambe). Visual impairment. Low digital literacy.",
    goal: "Wants to vote without traveling 50km. Needs voice guidance in Kamba/Swahili."
  },
  {
    name: "Kevin (The Diaspora Voter)",
    role: "Software Engineer in London",
    context: "Has iPhone 15. Highly skeptical of IEBC servers based on 2017/2022 history.",
    goal: "Wants cryptographic proof his vote was counted in his home county of Kiambu."
  }
];

export const CAPSTONE_CONTENT: CapstoneSection[] = [
  {
    id: '1_overview',
    title: '1. Overview & Problem Statement',
    type: 'text',
    content: `### Project Overview: Uchaguzi Block
**Target Event:** 2027 Kenyan General Election.
**Core Problem:**
1.  **Disenfranchisement:** Over 3 million Diaspora Kenyans cannot vote easily due to travel logistics.
2.  **Trust:** Historical lack of trust in manual tallying (Form 34A) leads to post-election violence/tension.
3.  **Complexity:** The "6-Piece Suit" voting is confusing for many; papers get mixed up.

**Proposed Solution:**
A **Blockchain-Enabled Voting Hub** that combines:
-   **Biometric Identity:** Integration with Huduma Namba via Face/Fingerprint scan.
-   **Immutable Ledger:** Ethereum-based recording of every vote for public audit.
-   **Digital Ballot:** Automated guiding through all 6 positions (President, Governor, Senator, etc.) to reduce spoiled votes.`
  },
  {
    id: '2_observation',
    title: '2. Observation Report (Competitive Analysis)',
    type: 'text',
    content: `### 1. IEBC Portal (Current System)
*   **Overview:** The official results transmission portal.
*   **Strengths:** Legally binding, widely recognized.
*   **Weaknesses:** 
    *   *Opaque Status:* Users cannot track their *individual* vote, only aggregate station results.
    *   *Reliability:* Servers frequently timeout during peak reporting.
    *   *UX:* Not mobile-optimized; small text difficult for elderly users.

### 2. Estonia i-Voting
*   **Overview:** The world standard for remote voting.
*   **Strengths:** 40%+ uptake; fully remote; verifiable.
*   **Weaknesses:** 
    *   *Hardware Dependency:* Requires a specific ID card reader which is impractical for rural Kenya.
*   **Gap Analysis:** Uchaguzi Block bridges this gap by using **Smartphone Biometrics** (FaceID/Fingerprint) instead of hardware card readers, leveraging Kenya's 98% mobile penetration.`
  },
  {
    id: '3_heuristics',
    title: '3. Heuristic Evaluation (Nielsen)',
    type: 'heuristic',
    content: `**Evaluation of 'KumbiVote' (Hypothetical Competitor) vs. Uchaguzi Block**

1.  **Visibility of System Status:** 
    *   *Issue:* Many blockchain apps stick on "Loading..." for minutes.
    *   *Fix:* Uchaguzi Block uses a "Step 1 of 3" stepper and animated processing states (e.g., "Encrypting Vote...").

2.  **Match between System & Real World:** 
    *   *Implementation:* We use terminology like "Ballot Paper", "Polling Station", and "Receipt" rather than "Smart Contract" or "Hash" in the main UI.
    *   *Ballot Colors:* We match IEBC colors (White for President, Blue for Governor) to reduce cognitive load.

3.  **User Control and Freedom:** 
    *   *Implementation:* The "Review" step allows users to edit any of their 6 selections before final submission.

4.  **Error Prevention:** 
    *   *Implementation:* The "Cast Vote" button is disabled (greyed out) until a candidate is explicitly selected.

5.  **Recognition rather than Recall:** 
    *   *Implementation:* Candidate photos and party colors are prominent, reducing cognitive load compared to text-only lists.`
  },
  {
    id: '4_wireframes',
    title: '4. Design Process (Wireframes & Prototype)',
    type: 'text',
    content: `### Low-Fidelity Sketches
*   **Concept:** Focused on a "One Thumb" interaction model.
*   **Key Screens:** 
    1.  *Login:* Large biometric trigger button.
    2.  *Ballot:* Card-based layout with 50% screen height per candidate.
    3.  *Success:* Large QR code for verification.

### High-Fidelity Prototype (Implemented Here)
*   **Tech Stack:** React 19, Tailwind CSS, Framer Motion (simulated via CSS), Lucide Icons.
*   **Design System ('Civic Trust'):**
    *   *Primary Color:* Emerald Green (#10b981) - representing growth, peace, and verification.
    *   *Typography:* 'Inter' - clean, highly legible sans-serif.
    *   *Interaction:* Haptic-style visual feedback on buttons.`
  },
  {
    id: '5_testing',
    title: '5. Usability & Accessibility Report',
    type: 'text',
    content: `### Usability Testing (Simulated)
*   **Participants:** 3 Users (1 Diaspora in London, 1 Student in Nairobi, 1 Elderly in Kisumu).
*   **Task:** Log in, select "Baraka Msingi" for President and "Sarah Wanjiku" for Governor, and cast vote.
*   **Results:**
    *   *Completion Rate:* 100%.
    *   *Avg Time:* 55 seconds (for full 6-piece suit).
    *   *Critical Feedback:* "I liked the colors matching the real ballot papers."

### Accessibility Audit (WCAG 2.1 AA)
*   **Contrast Ratio:** All text/bg combinations exceed 4.5:1.
*   **Keyboard Nav:** Full focus states implemented for tab navigation.
*   **Alt Text:** Descriptive alt tags on all candidate images.
*   **Inclusivity:** High Contrast Mode toggle added; Swahili language support included.`
  }
];