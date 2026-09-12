export interface Citation {
  statute: string;
  section: string;
  description: string;
  sourceUrl?: string;
}

export interface QAItem {
  id: string;
  question: string;
  shortQuery: string;
  jurisdiction: 'IN' | 'INTL';
  category: string;
  keywords: string[];
  answer: string;
  citations: Citation[];
  confidence: 'High' | 'Medium' | 'Low';
  confidenceScore: number; // e.g. 96
  escalationAdvice: string;
  practicalChecklist?: string[];
}

export const knowledgeBase: QAItem[] = [
  {
    id: 'sec-3p-patent-bar',
    question: 'Can I obtain a patent in India for a traditional Ayurvedic herbal formulation or an extract of a known medicinal herb like Ashwagandha or Turmeric?',
    shortQuery: 'Can I patent an Ayurvedic formulation under Section 3(p)?',
    jurisdiction: 'IN',
    category: 'Patentability Exclusions',
    keywords: [
      'patent', 'section 3p', '3(p)', 'ashwagandha', 'turmeric', 'classical', 'traditional knowledge',
      'extract', 'herbal', 'patentability', 'curcumin', 'formulation', 'ayurvedic medicine'
    ],
    answer: 'Under Section 3(p) of the Indian Patents Act, 1970, an invention which in effect is traditional knowledge or an aggregation or duplication of known properties of traditionally known components is NOT patentable. Simply mixing known herbs (e.g., Ashwagandha, Tulsi, Neem) or obtaining a standard aqueous/alcoholic crude extract fails both the novelty and non-obviousness tests and falls squarely within the statutory bar.\n\nHowever, you CAN potentially patent:\n1. A novel, non-obvious standardized bioactive fraction possessing an unexpected chemical profile (e.g. Phytopharmaceutical route).\n2. A novel technological delivery system (e.g. liposomal, phytosomal, or nano-formulation of an Ayurvedic compound) that demonstrates statistically significant bioavailability enhancement.\n3. A specific combination demonstrating quantified synergistic therapeutic efficacy exceeding the sum of its individual components, supported by comparative pharmacological data satisfying Section 3(e).',
    citations: [
      {
        statute: 'The Patents Act, 1970 (India)',
        section: 'Section 3(p)',
        description: 'Excludes from patentability "an invention which in effect is traditional knowledge or which is an aggregation or duplication of known properties of traditionally known component or components".'
      },
      {
        statute: 'The Patents Act, 1970 (India)',
        section: 'Section 3(e)',
        description: 'Bars substances obtained by a mere admixture resulting only in aggregation of properties, unless synergistic efficacy is proven.'
      },
      {
        statute: 'Guidelines for Processing of Patent Applications Relating to Traditional Knowledge and Biological Material',
        section: 'Office of CGPDTM, Rule 5.1-5.3',
        description: 'Directs Patent Examiners to cross-reference the Traditional Knowledge Digital Library (TKDL) before granting claims.'
      }
    ],
    confidence: 'High',
    confidenceScore: 98,
    escalationAdvice: 'If you have synthesized a novel chemical derivative or engineered a proprietary nano-carrier delivery system, consult an empaneled patent attorney to formulate claim language that avoids Section 3(p) rejections in the First Examination Report (FER).',
    practicalChecklist: [
      'Run a TKDL pre-screening search using botanical binomial names',
      'Generate in-vitro / in-vivo comparative synergy matrices',
      'Disclose the geographical origin of biological materials on Form 1'
    ]
  },
  {
    id: 'tkdl-international-biopiracy',
    question: 'What is the Traditional Knowledge Digital Library (TKDL) and how does it prevent the grant of erroneous patents abroad?',
    shortQuery: 'How does TKDL prevent biopiracy abroad?',
    jurisdiction: 'INTL',
    category: 'Defensive TK Protection',
    keywords: [
      'tkdl', 'traditional knowledge digital library', 'biopiracy', 'uspto', 'epo', 'patent office',
      'turmeric patent', 'neem patent', 'prior art', 'access agreement', 'international patent'
    ],
    answer: 'The Traditional Knowledge Digital Library (TKDL) is a pioneering Indian digital repository established jointly by CSIR and the Ministry of Ayush. It transcribes and translates ancient Ayurvedic, Unani, Siddha, and Sowa-Rigpa texts from Sanskrit, Arabic, and Persian into five international languages (English, German, French, Japanese, Spanish) structured according to the International Patent Classification (IPC).\n\nUnder bilateral TKDL Access Agreements signed with leading global patent offices (including USPTO, European Patent Office - EPO, Japan Patent Office - JPO, UKIPO, and Canadian Intellectual Property Office - CIPO), patent examiners are mandated to consult TKDL during their prior art search phase. When an applicant in Europe or the US attempts to patent an Ayurvedic herb or remedy, TKDL prior-art citations are triggered, leading to third-party observations and prompt revocation, amendment, or withdrawal of fraudulent claims at zero litigation cost to Indian stakeholders.',
    citations: [
      {
        statute: 'CSIR-Ministry of Ayush Bilateral Access Protocols',
        section: 'Article 3 & 4 (TKDL Access Agreement)',
        description: 'Restricts patent examiner access solely for prior-art search and patent examination purposes to prevent misappropriation.'
      },
      {
        statute: 'WIPO Intergovernmental Committee (IGC) on IP and Genetic Resources',
        section: 'WIPO/GRTKF/IC/45',
        description: 'Recognizes TKDL as a gold-standard defensive documentation mechanism for combating cross-border biopiracy.'
      },
      {
        statute: 'European Patent Convention (EPC)',
        section: 'Article 54(1) & 54(2)',
        description: 'Requirement of absolute novelty; TKDL entries serve as published prior art invalidating unmerited pharmaceutical patents.'
      }
    ],
    confidence: 'High',
    confidenceScore: 96,
    escalationAdvice: 'If an international entity has filed a patent claim in the US or Europe that incorporates your community traditional knowledge, escalate immediately to the CSIR TKDL Unit to file formal pre-grant opposition.',
    practicalChecklist: [
      'Search IPC Class A61K 36/00 for medicinal plant prior art',
      'Verify whether the formulation is documented in the Ayurvedic Formulary of India (AFI)',
      'Submit third-party observations to EPO under Article 115 EPC if biopiracy is detected'
    ]
  },
  {
    id: 'bda-nba-approval-mandate',
    question: 'Do Ayurvedic manufacturers and patent applicants need permission from the National Biodiversity Authority (NBA) under the Biological Diversity Act?',
    shortQuery: 'Are NBA approvals needed under Biological Diversity Act?',
    jurisdiction: 'IN',
    category: 'Biodiversity Compliance & ABS',
    keywords: [
      'nba', 'bda', 'biological diversity act', 'national biodiversity authority', 'approval',
      'form 1', 'form 3', 'form iii', 'abs', 'access and benefit sharing', 'ayush manufacturer', 'amendment 2023'
    ],
    answer: 'Yes, with specific nuances under the Biological Diversity Act, 2002 and the Biological Diversity (Amendment) Act, 2023:\n\n1. For Patent Filings (Section 6): Anyone (whether Indian or foreign entity) intending to apply for an Intellectual Property Right (patent) inside or outside India based on any research or information on a biological resource obtained from India MUST obtain prior approval from the NBA (Form III). The approval must be granted before the patent is actually sealed/granted.\n\n2. For Commercial Utilization (Section 7 vs Section 3): Indian citizens and domestic companies do not require prior NBA approval for commercial access, but must give prior intimation to the State Biodiversity Board (SBB). Non-Indian entities or Indian companies with foreign shareholding/control require prior approval from the NBA under Section 3 (Form I).\n\n3. 2023 Amendment Relief: Registered AYUSH practitioners and codified traditional healers (Vaidyas/Hakims) are exempt from ABS levies, but commercial manufacturers operating at industrial scale remain subject to SBB intimation and fair benefit sharing.',
    citations: [
      {
        statute: 'Biological Diversity Act, 2002',
        section: 'Section 6(1)',
        description: 'Mandates prior approval of National Biodiversity Authority before applying for any patent based on biological resources obtained from India.'
      },
      {
        statute: 'Biological Diversity (Amendment) Act, 2023',
        section: 'Section 7 Amendment & Section 40 Exemptions',
        description: 'Exempts registered AYUSH practitioners and cultivated medicinal plants (with traceability) from onerous ABS requirements while retaining oversight on wild collections.'
      },
      {
        statute: 'National Biodiversity Authority Guidelines on Access and Benefit Sharing Regulations',
        section: 'Regulation 2, 3, and Form III',
        description: 'Prescribes mandatory Form III filing and benefit sharing agreement (0.2% - 0.5% of ex-factory price) prior to commercial exploitation of patent.'
      }
    ],
    confidence: 'High',
    confidenceScore: 97,
    escalationAdvice: 'Failing to file NBA Form III prior to patent grant can result in revocation proceedings under Section 64 of the Patents Act or criminal penalties. Engage a biodiversity regulatory specialist before filing foreign patent applications.',
    practicalChecklist: [
      'File NBA Form III concurrently with the Indian Patent Office request for examination',
      'Maintain raw material traceability certificates from herbal cultivators (NTAC list)',
      'Register supply chain sources with local Biodiversity Management Committees (BMCs)'
    ]
  },
  {
    id: 'gi-protection-ayurveda',
    question: 'Can Ayurvedic herbs, botanical preparations, or classical formulations receive Geographical Indication (GI) protection?',
    shortQuery: 'Can Ayurvedic herbs or products get GI tags in India?',
    jurisdiction: 'IN',
    category: 'Geographical Indications',
    keywords: [
      'gi', 'geographical indication', 'gi tag', 'navara rice', 'malabar pepper', 'nilambur teak',
      'trademark', 'origin', 'collective mark', 'herbal', 'ayurvedic', 'community right'
    ],
    answer: 'Yes! Geographical Indications (GIs) are among the most effective IP tools for Ayurvedic agriculture and traditional formulations because they protect community rights, territory-specific qualities, and prevent imitation without violating traditional knowledge patent bars.\n\nNotable Indian Ayurvedic & Botanical GIs include:\n- Navara Rice (Kerala): Renowned medicinal rice used exclusively in Panchakarma Navarakizhi treatments.\n- Malabar Pepper (Kerala/Karnataka): Pharmacopoeial grade Black Pepper with high piperine content.\n- Nilambur Teak (Kerala) & Eechamkotta herbs.\n- Darjeeling Green Tea, Kashmiri Saffron (Lachha/Mogra).\n\nKey Principles for Ayurvedic GIs:\n1. GIs cannot be owned by an individual or private company; they are granted to an association of producers, growers, or manufacturers (e.g. Navara Farmers Association).\n2. The applicant must prove that the therapeutic or chemical qualities of the herb or formulation are intrinsically linked to the geographical terroir (soil, rainfall, climate, traditional processing).\n3. Individual Ayurvedic pharmacies within the demarcated region must register as "Authorized Users" to utilize the registered GI seal.',
    citations: [
      {
        statute: 'Geographical Indications of Goods (Registration and Protection) Act, 1999',
        section: 'Section 2(1)(e)',
        description: 'Defines geographical indications in relation to natural goods, agricultural goods, and manufactured goods of specific regional origin.'
      },
      {
        statute: 'Geographical Indications of Goods Act, 1999',
        section: 'Section 17',
        description: 'Registration of authorized users who have the right to commercially employ the registered GI name and logo.'
      },
      {
        statute: 'TRIPS Agreement (WTO)',
        section: 'Article 22 & Article 23',
        description: 'International standards for protection of geographical indications against misleading and deceptive competition.'
      }
    ],
    confidence: 'High',
    confidenceScore: 95,
    escalationAdvice: 'If your regional Ayurvedic cooperative produces an authentic heritage preparation linked to a specific agro-climatic tract, file a GI application at the Geographical Indications Registry in Chennai.',
    practicalChecklist: [
      'Form a registered society or trust of local cultivators / Vaidyas',
      'Conduct historical and agro-climatic soil/terroir scientific profiling',
      'Submit GI-1 Application with the GI Registry, Chennai'
    ]
  },
  {
    id: 'wipo-gratk-treaty-2024',
    question: 'What is the new WIPO GRATK Treaty (2024) and what does it require regarding patent disclosures of Ayurvedic genetic resources?',
    shortQuery: 'What is the WIPO GRATK Treaty 2024 on Genetic Resources and TK?',
    jurisdiction: 'INTL',
    category: 'International Treaties & Conventions',
    keywords: [
      'wipo', 'gratk', 'treaty', 'genetic resources', 'associated traditional knowledge',
      'disclosure of origin', 'mandatory disclosure', '2024 treaty', 'diplomatic conference', 'patent application'
    ],
    answer: 'Adopted on May 24, 2024 at WIPO headquarters in Geneva, the WIPO Treaty on Intellectual Property, Genetic Resources and Associated Traditional Knowledge (GRATK Treaty) marks a historic breakthrough championed by India and the Global South for over two decades.\n\nCore Provisions of the WIPO GRATK Treaty:\n1. Mandatory Disclosure of Origin (Article 3): Patent applicants globally MUST disclose the country of origin of genetic resources and/or the indigenous community that provided the associated traditional knowledge if the claimed invention is based on or derived from them.\n2. Information Systems (Article 6): Contracting parties establish interoperable digital databases (inspired by India\'s TKDL) accessible to patent offices globally to catch erroneous applications before grant.\n3. Sanctions & Remedies (Article 5): Non-compliance or fraudulent concealment of genetic resource origins can trigger patent examination rejection, pre-grant opposition, or post-grant revocation where fraudulent intent is established.\n\nFor Ayurvedic innovators and Indian research institutions, the Treaty establishes an international legal shield preventing foreign multinationals from claiming novel chemical entities derived from Indian medicinal flora without equitable benefit-sharing.',
    citations: [
      {
        statute: 'WIPO Treaty on Intellectual Property, Genetic Resources and Associated Traditional Knowledge (2024)',
        section: 'Article 3(1) & 3(2)',
        description: 'Mandatory patent disclosure requirement for inventions materially based on genetic resources and traditional knowledge.'
      },
      {
        statute: 'WIPO Treaty on IP, GR & ATK (2024)',
        section: 'Article 6',
        description: 'Establishment of TK and Genetic Resource information systems for prior art search by patent offices.'
      },
      {
        statute: 'Indian Patents Act, 1970',
        section: 'Section 10(4)(ii)(D)',
        description: 'Domestic counterpart requiring applicant to disclose source and geographical origin of biological material in patent specification.'
      }
    ],
    confidence: 'High',
    confidenceScore: 96,
    escalationAdvice: 'When preparing PCT international patent applications originating from Indian botanical research, ensure Form PCT/RO/101 and the patent description explicitly cite geographical origin in accordance with WIPO GRATK standards.',
    practicalChecklist: [
      'Verify source and origin certificate from botanical collection site',
      'Include precise GPS coordinates and voucher herbarium specimen numbers in patent disclosure',
      'Prepare Prior Informed Consent (PIC) documentation before PCT filing'
    ]
  },
  {
    id: 'nagoya-protocol-abs',
    question: 'How does the Nagoya Protocol apply to international research and commercialization of Ayurvedic botanicals?',
    shortQuery: 'What are the international ABS rules under the Nagoya Protocol?',
    jurisdiction: 'INTL',
    category: 'International Environmental & IP Law',
    keywords: [
      'nagoya protocol', 'abs', 'access and benefit sharing', 'convention on biological diversity', 'cbd',
      'prior informed consent', 'pic', 'mutually agreed terms', 'mat', 'international research'
    ],
    answer: 'The Nagoya Protocol on Access to Genetic Resources and the Fair and Equitable Sharing of Benefits Arising from their Utilization (a supplementary agreement to the Convention on Biological Diversity - CBD) establishes an enforceable international legal regime governing biological resources.\n\nThree Pillars for Ayurvedic Cross-Border Commercialization:\n1. Prior Informed Consent (PIC): Foreign companies or research institutions seeking to obtain Indian medicinal plants must obtain formal written consent from the National Biodiversity Authority of India prior to collecting or exporting samples.\n2. Mutually Agreed Terms (MAT): Both parties must execute a binding contract outlining the scope of research, commercialization milestones, royalties, and technology transfer.\n3. Compliance Checkpoints: Signatory countries (e.g. EU member states under EU Regulation 511/2014, Japan, UK) operate mandatory regulatory checkpoints at patent offices and university funding bodies requiring researchers to produce an Internationally Recognized Certificate of Compliance (IRCC).\n\nIf an overseas collaborator extracts Ayurvedic herbs without an Indian IRCC, their research grant can be frozen and downstream pharmaceutical patents invalidated in European courts.',
    citations: [
      {
        statute: 'Nagoya Protocol on Access and Benefit-Sharing (2010)',
        section: 'Article 6 (PIC) & Article 7 (Traditional Knowledge)',
        description: 'Requires domestic legislation ensuring access to traditional knowledge is grounded in prior informed consent and community involvement.'
      },
      {
        statute: 'Nagoya Protocol on ABS',
        section: 'Article 17',
        description: 'Designation of checkpoints to monitor the utilization of genetic resources throughout the value chain.'
      },
      {
        statute: 'European Union Regulation (EU) No 511/2014',
        section: 'Article 4 & 7 (Due Diligence Declaration)',
        description: 'Obligates EU researchers to exercise due diligence to ensure genetic resources were accessed in accordance with applicable ABS legislation.'
      }
    ],
    confidence: 'High',
    confidenceScore: 94,
    escalationAdvice: 'Before shipping herb specimens, cell lines, or crude fractions to foreign academic or commercial partners, execute an NBA Material Transfer Agreement (MTA) via Form II.',
    practicalChecklist: [
      'Obtain an Internationally Recognized Certificate of Compliance (IRCC) from the ABS Clearing-House',
      'Execute NBA Form II (Transfer of Research Results / Materials)',
      'Ensure EU collaborators file their Due Diligence declaration under EU Reg 511/2014'
    ]
  },
  {
    id: 'phytopharmaceutical-regulations',
    question: 'How do Phytopharmaceutical Drugs differ from classical Ayurvedic medicines in regulatory approval and patentability?',
    shortQuery: 'What is the regulatory & patent difference for Phytopharmaceutical Drugs?',
    jurisdiction: 'IN',
    category: 'Regulatory Pathways & Drug Classification',
    keywords: [
      'phytopharmaceutical', 'phytopharma', 'rule 158b', 'cdsco', 'dcgi', 'classical', 'ayush',
      'standardized extract', 'biomarkers', 'gcp trials', 'patentability', 'allopathic'
    ],
    answer: 'The Phytopharmaceutical drug category, introduced in 2015 via Gazette Notification G.S.R. 918(E) under the Drugs and Cosmetics Rules, creates a scientifically rigorous bridge between traditional herbal knowledge and modern pharmaceutical science.\n\nKey Differences:\n\n1. Regulatory Authority:\n- Classical Ayurvedic Drug: Regulated by State AYUSH Licensing Authorities under Chapter IVA of Drugs & Cosmetics Act.\n- Phytopharmaceutical: Regulated directly by the Central Drugs Standard Control Organization (CDSCO / DCGI) under modern drug standards.\n\n2. Composition Requirements:\n- Classical Drug: Whole plant powder, decoction, or oil prepared according to 54 First Schedule texts.\n- Phytopharmaceutical: Purified, standardized fraction of an extract with at least 4 validated chemical/bioactive markers quantified.\n\n3. Evidence & Safety:\n- Classical Drug: Exempt from clinical trials under Rule 158-B historical safety provisions.\n- Phytopharmaceutical: Full preclinical safety/toxicology (GLP) and multi-center human clinical trials (Phases I to III) conducted under Good Clinical Practice (GCP).\n\n4. Patentability:\n- Classical Drug: Barred under Section 3(p) and 3(e).\n- Phytopharmaceutical: Fully eligible for composition, fraction-purification process, and specific therapeutic indication patents.',
    citations: [
      {
        statute: 'Drugs and Cosmetics (Amendment) Rules, 2015',
        section: 'Rule 2(eb) & Schedule Y (Appendix I-B)',
        description: 'Defines phytopharmaceutical drug and establishes requirements for scientific data on safety, efficacy, and batch-to-batch chromatographic reproducibility.'
      },
      {
        statute: 'The Patents Act, 1970',
        section: 'Section 2(1)(j) & Section 3(d)',
        description: 'Allows patentability for novel standardized fractions showing significantly enhanced therapeutic efficacy compared to crude extracts.'
      },
      {
        statute: 'Drugs and Cosmetics Rules, 1945',
        section: 'Rule 158-B',
        description: 'Contrasting framework outlining regulatory requirements for classical and patent & proprietary Ayurvedic medicines.'
      }
    ],
    confidence: 'High',
    confidenceScore: 97,
    escalationAdvice: 'Developing a Phytopharmaceutical requires an Investigational New Drug (IND) application to CDSCO. Engage regulatory counsels experienced in New Drugs and Clinical Trials Rules (NDCTR 2019).',
    practicalChecklist: [
      'Identify and develop HPLC/HPTLC chromatographic fingerprints for 4 bioactive markers',
      'Submit IND application to CDSCO Subject Expert Committee (Phytopharmaceuticals)',
      'Conduct GLP animal toxicology before initiating Phase I clinical trials'
    ]
  },
  {
    id: 'ayurveda-aahar-regulations-2022',
    question: 'What are the IP, packaging, and regulatory rules for Ayurveda-Aahar (food supplements) under FSSAI?',
    shortQuery: 'What are the rules for Ayurveda-Aahar food supplements under FSSAI?',
    jurisdiction: 'IN',
    category: 'Nutraceuticals & Food Regulatory',
    keywords: [
      'ayurveda aahar', 'fssai', 'food supplement', 'nutraceutical', 'dietary', 'food safety',
      'logo', 'claims', 'labeling', 'agni', 'ojas', 'proprietary food'
    ],
    answer: 'The Food Safety and Standards (Ayurveda Aahar) Regulations, 2022 establish an official legal category for food products and dietary supplements prepared in accordance with classical Ayurvedic treatises.\n\nKey Regulatory and IP Dimensions:\n\n1. Prohibited Claims:\n- Ayurveda-Aahar cannot be marketed with claims to "treat", "cure", or "mitigate" specific medical diseases or disorders. Claims are restricted to promoting physiological balance (Doshas), digestive fire (Agni), and vitality (Ojas).\n\n2. Formulation Boundaries:\n- Must contain ingredients listed in authoritative Ayurvedic books or FSSAI positive schedules. Synthetic vitamins, minerals, or amino acids CANNOT be added.\n\n3. Mandatory Special Logo:\n- Every package must prominently display the official "Ayurveda Aahar" logo (a leaf and sun emblem in green) on the principal display panel.\n\n4. IP & Brand Protection:\n- While recipes cannot be patented due to Section 3(p), manufacturers should aggressively protect brand names, packaging trade dress (Class 29/30/32), and proprietary stabilization/freeze-drying processes.',
    citations: [
      {
        statute: 'Food Safety and Standards (Ayurveda Aahar) Regulations, 2022',
        section: 'Regulation 3 & Regulation 5',
        description: 'Establishes licensing requirements, formulation boundaries, and prohibitions against synthetic vitamin/mineral spiking.'
      },
      {
        statute: 'Food Safety and Standards (Ayurveda Aahar) Regulations, 2022',
        section: 'Regulation 7 & Schedule III',
        description: 'Mandates display of the registered Ayurveda Aahar logo and specifies labeling claim restrictions.'
      },
      {
        statute: 'Trade Marks Act, 1999',
        section: 'Section 9(1)(b) & Class 30/32',
        description: 'Registration of distinctive brand names for Ayurvedic teas, granules, and dietary formulations.'
      }
    ],
    confidence: 'High',
    confidenceScore: 95,
    escalationAdvice: 'If transitioning an Ayurvedic medicine license to an Ayurveda Aahar license to scale via modern retail/e-commerce channels, perform a claim review with a food regulatory specialist to avoid FSSAI misbranding penalties.',
    practicalChecklist: [
      'Apply for FSSAI Central/State license via FoSCoS selecting Kind of Business: Ayurveda Aahar',
      'Incorporate the official Ayurveda Aahar green symbol on packaging graphics',
      'Ensure marketing copy avoids therapeutic drug claims'
    ]
  },
  {
    id: 'trademark-classical-names',
    question: 'Can an Ayurvedic pharmaceutical company register a classical name like "Triphala Churna" or "Chyawanprash" as a registered trademark?',
    shortQuery: 'Can I trademark classical Ayurvedic names like Triphala or Chyawanprash?',
    jurisdiction: 'IN',
    category: 'Trademarks & Brand Exclusivity',
    keywords: [
      'trademark', 'trade mark', 'classical name', 'triphala', 'chyawanprash', 'public domain',
      'generic', 'publici juris', 'brand name', 'class 5', 'descriptive mark'
    ],
    answer: 'No. Standalone classical formulation names listed in the First Schedule to the Drugs & Cosmetics Act, 1940 or the Ayurvedic Formulary of India (AFI) are considered descriptive and "publici juris" (belonging to the public domain). The Trade Marks Registry strictly refuses individual monopolization under Section 9(1)(b) and Section 9(1)(c) of the Trade Marks Act, 1999.\n\nJudicial Precedents & Legal Strategy:\n- In leading disputes (e.g. Dabur India Ltd. v. Emami Ltd. and related Zandu precedents), courts held that no single manufacturer can claim exclusive rights over terms like "Chyawanprash", "Asav", "Arishta", or "Taila".\n- Allowed Strategy: You must adopt a "House Mark + Classical Term" composite structure (e.g. "Dabur Chyawanprash", "Baidyanath Triphala Churna", "Kottakkal Arya Vaidya Sala Dhanwantharam").\n- In your trademark application for the composite mark, you must provide a formal "Disclaimer" disclaiming any exclusive right to the generic Ayurvedic name.',
    citations: [
      {
        statute: 'Trade Marks Act, 1999',
        section: 'Section 9(1)(b)',
        description: 'Absolute grounds for refusal of registration for trade marks which consist exclusively of marks indicating kind, quality, quantity, or intended purpose.'
      },
      {
        statute: 'Trade Marks Act, 1999',
        section: 'Section 17',
        description: 'Anti-dissection rule and effect of registration of parts of a mark containing common and non-distinctive matter.'
      },
      {
        statute: 'Drugs and Cosmetics Act, 1940',
        section: 'First Schedule & Section 33E',
        description: 'Authoritative statutory list of Ayurvedic texts defining public domain classical formulations.'
      }
    ],
    confidence: 'High',
    confidenceScore: 98,
    escalationAdvice: 'If you have received an objection under Section 9 or 11 from the Trade Marks Registry for an Ayurvedic product name, file a prompt reply agreeing to a disclaimer on the descriptive term while asserting acquired distinctiveness for your coined brand prefix.',
    practicalChecklist: [
      'Conduct TM search in Class 5 on the IP India public search portal',
      'Ensure coined brand prefix has strong phonetic and conceptual distinctiveness',
      'Submit Form TM-A with explicit disclaimer over generic classical suffix'
    ]
  },
  {
    id: 'trips-art-27-traditional-knowledge',
    question: 'How does WTO TRIPS Article 27.3(b) impact the patentability of plants and traditional remedies internationally?',
    shortQuery: 'How does TRIPS Article 27.3(b) affect herbal patenting?',
    jurisdiction: 'INTL',
    category: 'International Treaties & Conventions',
    keywords: [
      'trips', 'article 27', '27.3(b)', 'wto', 'plants', 'animals', 'biological processes',
      'sui generis', 'plant varieties', 'traditional medicine', 'trade related aspects'
    ],
    answer: 'Article 27.3(b) of the WTO Agreement on Trade-Related Aspects of Intellectual Property Rights (TRIPS) governs the patentability of living materials and biological resources across WTO member nations.\n\nKey Provisions & Global Impact:\n1. Permissible Exclusions: WTO Members may exclude from patentability "plants and animals other than micro-organisms, and essentially biological processes for the production of plants or animals." India utilized this flexibility to draft Section 3(j) and Section 3(p) of the Patents Act, excluding whole plants, seeds, varieties, and traditional knowledge.\n2. Plant Varieties Protection: TRIPS mandates that members provide protection of plant varieties either by patents, by an effective sui generis system, or a combination thereof. India enacted the Protection of Plant Varieties and Farmers\' Rights Act (PPVFRA) 2001, which uniquely honors farmers\' traditional seed-saving rights alongside plant breeder rights.\n3. The Developing Nations Coalition: Led by India, Brazil, and the African Group, proposals have continuously pressed for amending TRIPS to introduce mandatory disclosure of origin, prior informed consent, and benefit-sharing into Article 29.',
    citations: [
      {
        statute: 'WTO TRIPS Agreement',
        section: 'Article 27.3(b)',
        description: 'Exclusion of plants, animals, and biological processes from mandatory patentability, requiring sui generis plant variety protection.'
      },
      {
        statute: 'Protection of Plant Varieties and Farmers Rights Act, 2001 (India)',
        section: 'Section 39 & Section 26',
        description: 'India\'s unique sui generis regime safeguarding traditional farmers varieties and gene fund benefit-sharing.'
      },
      {
        statute: 'WTO Doha Ministerial Declaration (2001)',
        section: 'Paragraph 19',
        description: 'Mandates the TRIPS Council to examine the relationship between TRIPS, the CBD, and the protection of traditional knowledge.'
      }
    ],
    confidence: 'Medium',
    confidenceScore: 91,
    escalationAdvice: 'For cross-border commercialization involving proprietary cultivated Ayurvedic medicinal plant cultivars (such as elite Ashwagandha or Sarpagandha varieties), file for plant variety protection under PPVFRA rather than standard patents.',
    practicalChecklist: [
      'Assess whether the innovation is a plant variety (PPVFRA) or an active fraction (Patents Act)',
      'Review foreign country laws: US allows plant patents under 35 U.S.C. 161, whereas India prohibits them',
      'Ensure foreign IP strategy aligns with national CBD commitments'
    ]
  }
];
