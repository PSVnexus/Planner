export interface FormulationCategory {
  id: string;
  code: string;
  nameEn: string;
  nameHi: string;
  tagline: string;
  iconName: string;
  examples: string[];
  statutoryBasis: string;
  regulatoryRequirements: string[];
  ipPosture: {
    patentability: string;
    section3pStatus: 'Absolute Bar' | 'Conditional / Novel Delivery Only' | 'Full Patentability' | 'Not Applicable';
    trademarkRules: string;
    keyTip: string;
  };
  absPosture: {
    nbaApproval: string;
    formRequired: string;
    benefitSharingRate: string;
  };
}

export const formulationCategories: FormulationCategory[] = [
  {
    id: 'classical',
    code: 'SHASTRIYA',
    nameEn: 'Classical / Generic Medicine',
    nameHi: 'शास्त्रीय (क्लासिकल) औषध',
    tagline: 'Manufactured strictly in accordance with 54 authoritative texts listed in the First Schedule to the Drugs & Cosmetics Act, 1940.',
    iconName: 'ScrollText',
    examples: ['Chyawanprash Awaleha', 'Triphala Churna', 'Sudarshan Vati', 'Dhanwantaram Thailam', 'Bhasmas / Rasashastra yogas'],
    statutoryBasis: 'Section 3(a) & First Schedule of the Drugs & Cosmetics Act, 1940; Rule 158-B(I).',
    regulatoryRequirements: [
      'Must follow exact ingredients, proportions, and manufacturing methods specified in Schedule 1 authoritative texts (e.g. Charaka Samhita, Sushruta Samhita, AFI).',
      'No safety or efficacy clinical trials mandated under Rule 158-B due to established historical safety record ("Authoritative Text Safe Harbor").',
      'Manufacturing license obtained from State AYUSH Licensing Authority after proof of pharmacopoeial compliance (API / AFI standards).'
    ],
    ipPosture: {
      patentability: 'Unpatentable as a product. Barred under Section 3(p) as traditional knowledge. Novel extraction methods or modified-release dosage forms may only be patented if demonstrable synergy / inventive step is proven under Section 3(e).',
      section3pStatus: 'Absolute Bar',
      trademarkRules: 'Classical names (e.g., "Triphala Churna", "Chyawanprash") are publici juris (public domain). Cannot be registered as exclusive standalone trademarks. Must append a distinctive house brand (e.g., "BrandX Chyawanprash").',
      keyTip: 'Defensive publication in TKDL protects classical formulations from biopiracy globally without incurring patent costs.'
    },
    absPosture: {
      nbaApproval: 'Indian citizens/entities manufacturing classical drugs are exempt from seeking prior approval from NBA under Section 7 of Biological Diversity Act, but must give prior intimation to the State Biodiversity Board (SBB). Biological Diversity (Amendment) Act 2023 further clarifies AYUSH practitioner exemptions.',
      formRequired: 'Prior Intimation to State Biodiversity Board (SBB) / Form I (for foreign-controlled entities).',
      benefitSharingRate: '0.1% to 0.5% of ex-factory sale price or negotiated fair share.'
    }
  },
  {
    id: 'patent_proprietary',
    code: 'P_AND_P',
    nameEn: 'Patent / Proprietary Medicine',
    nameHi: 'पेटेंट एवं प्रोप्राइटरी (अनुभूत) औषधि',
    tagline: 'Formulations containing ingredients mentioned in Schedule 1 authoritative texts, but in modified ratios or proprietary combinations.',
    iconName: 'FlaskConical',
    examples: ['Herbal Anti-diabetic syrup', 'Liv-52 style hepatoprotective blends', 'Pain relief herbal roll-on', 'Memory booster capsule'],
    statutoryBasis: 'Section 3(h) & Rule 158-B(II) of the Drugs & Cosmetics Act, 1940.',
    regulatoryRequirements: [
      'All active ingredients must be derived exclusively from books listed in the First Schedule.',
      'Pilot clinical efficacy data (Phase II/III style proof of concept) or published scientific literature required under Rule 158-B.',
      'Acute oral toxicity safety study data mandatory unless all ingredients have proven culinary/pharmacopoeial safety at prescribed dosages.'
    ],
    ipPosture: {
      patentability: 'Composition patent is generally barred under Section 3(e) (mere admixture) and Section 3(p) unless synergistic therapeutic efficacy is rigorously proven with quantitative comparative data over individual ingredients.',
      section3pStatus: 'Conditional / Novel Delivery Only',
      trademarkRules: 'Strong trademark protection available for arbitrary or fanciful coined brand names. Strongly recommended to file trademark in Class 5 (Pharmaceuticals).',
      keyTip: 'Patent Examiners specifically issue Section 3(e) and 3(p) First Examination Reports (FER). Prepare isobologram or synergy ratio matrices beforehand.'
    },
    absPosture: {
      nbaApproval: 'Mandatory compliance with Biological Diversity Act 2002. Commercial utilization of wild-harvested bio-resources requires intimation to SBB (Indian entities) or prior approval from NBA under Section 3 (foreign entities). Cultivated medicinal plants enjoy simplified reporting.',
      formRequired: 'NBA Form I (Foreign entity) or SBB Intimation Form (Domestic entity).',
      benefitSharingRate: '0.1% - 0.5% of annual gross ex-factory sale.'
    }
  },
  {
    id: 'new_drug',
    code: 'NON_CLASSICAL',
    nameEn: 'New / Non-Classical Ayurvedic Drug',
    nameHi: 'नवीन / अपरंपरागत आयुर्वेदिक औषधि',
    tagline: 'Medicines incorporating botanical ingredients not listed in the First Schedule, or with novel routes of administration.',
    iconName: 'Sparkles',
    examples: ['Injectable herbal preparations', 'Transdermal Ayurvedic patches', 'Ayurvedic formulations incorporating non-Schedule botanicals'],
    statutoryBasis: 'Rule 158-B(IV) & (V) of Drugs & Cosmetics Rules; New Drugs and Clinical Trials Rules (NDCTR) 2019.',
    regulatoryRequirements: [
      'Full preclinical toxicology (acute, sub-acute, chronic, reproductive toxicity) in compliance with Good Laboratory Practices (GLP).',
      'Systematic human clinical trials (Phases I, II, III) approved by the Subject Expert Committee (SEC) of CDSCO / Ministry of Ayush.',
      'Detailed stability testing (climatic zone IVb) for 24+ months.'
    ],
    ipPosture: {
      patentability: 'High potential for patentability. If the botanical or active fraction is not part of Indian Traditional Knowledge, Section 3(p) bar does not apply. Novel extraction processes, specific standardized fractions, and novel delivery vectors are patentable.',
      section3pStatus: 'Full Patentability',
      trademarkRules: 'Full trademark registrability under Nice Class 5.',
      keyTip: 'Ensure mandatory disclosure of geographical origin of biological material in patent application Form 1 under Section 10(4)(ii)(D) of Patents Act.'
    },
    absPosture: {
      nbaApproval: 'Full NBA approval under Section 6 of BDA 2002 is mandatory before applying for any patent, both in India and abroad.',
      formRequired: 'NBA Form III (Application for IPR on Biological Resources).',
      benefitSharingRate: 'Up to 2% to 3% of commercial royalty or agreed lump sum.'
    }
  },
  {
    id: 'phytopharmaceutical',
    code: 'PHYTO_DRUG',
    nameEn: 'Phytopharmaceutical Drug',
    nameHi: 'फाइटोफार्मास्युटिकल औषधि',
    tagline: 'Purified, standardized fraction with defined minimum 4 bioactive markers, regulated under modern allopathic drug standards.',
    iconName: 'Microscope',
    examples: ['Standardized Curcumin fraction (95% curcuminoids)', 'Picroliv fraction from Picrorhiza kurroa', 'Bacoside enriched Brahmi extract'],
    statutoryBasis: 'Gazette Notification G.S.R. 918(E) dated 30 Nov 2015; Chapter IVA & Schedule Y of Drugs & Cosmetics Rules.',
    regulatoryRequirements: [
      'Requires clearance directly from the Drugs Controller General of India (DCGI / CDSCO), not state AYUSH department.',
      'Must contain purified, standardized botanical fraction with at least 4 known chemical biomarkers identified and quantified.',
      'Preclinical toxicology (carcinogenicity, mutagenicity) + Full multi-center GCP clinical trial validation.'
    ],
    ipPosture: {
      patentability: 'Highly patentable. Section 3(p) bar can be overcome by proving technical character, novel fraction enrichment process, and quantified biological target activity beyond traditional raw herb knowledge.',
      section3pStatus: 'Full Patentability',
      trademarkRules: 'Standard pharmaceutical trademark in Class 5.',
      keyTip: 'Bridge between traditional Ayurveda and global modern pharma. Recognized internationally by US FDA (Botanical Drug Guidance) and EMA.'
    },
    absPosture: {
      nbaApproval: 'Prior approval of NBA strictly required under Section 3 & Section 6 of Biological Diversity Act. If foreign equity exists in the company, Section 3 approval is mandatory before procuring raw herb material.',
      formRequired: 'NBA Form I (Access) and Form III (Intellectual Property).',
      benefitSharingRate: 'Negotiated tiered ABS fee based on net sales.'
    }
  },
  {
    id: 'ayurveda_aahar',
    code: 'AAHAR_NUTRACEUTICAL',
    nameEn: 'Ayurveda-Aahar / Nutraceutical',
    nameHi: 'आयुर्वेद-आहार (खाद्य पूरक)',
    tagline: 'Dietary supplements and food products prepared according to classical texts for health maintenance, not disease cure.',
    iconName: 'Salad',
    examples: ['Herbal teas (Kwath powders)', 'Amla candy/churan digestives', 'Moringa energy nutrition bars', 'Ayurvedic fortified ghee'],
    statutoryBasis: 'Food Safety and Standards (Ayurveda Aahar) Regulations, 2022 under FSSAI.',
    regulatoryRequirements: [
      'Licensed under FSSAI FoSCoS portal with unique "Ayurveda Aahar" logo on packaging.',
      'Cannot contain synthetic vitamins, minerals, or synthetic amino acids.',
      'Must NOT claim to cure, prevent, or treat any disease. Health claims limited to general wellness, digestion (Agni), and vitality (Ojas).'
    ],
    ipPosture: {
      patentability: 'Dietary recipes are strictly non-patentable under Section 3(p) and Section 3(e). Functional food compositions with verified shelf-life extension technology or novel food processing mechanisms may be patentable.',
      section3pStatus: 'Conditional / Novel Delivery Only',
      trademarkRules: 'Trademarks registered under Class 29, 30, and 32 (Food, herbal beverages, dietary preparations). Packaging trade dress and design registration (Class 09-03) highly valuable.',
      keyTip: 'Mandatory display of the special Ayush Aahar green logo on front of pack. Distinct from FSSAI regular dietary supplements.'
    },
    absPosture: {
      nbaApproval: 'Commercial utilization of cultivated agricultural commodities (listed as Normally Traded as Commodities - NTAC) is exempt from ABS under Section 40 of BDA 2002. However, wild-collected forest produce still triggers SBB intimation.',
      formRequired: 'Self-declaration under NTAC list or SBB prior intimation.',
      benefitSharingRate: 'Exempt if on NTAC schedule; otherwise standard SBB rates.'
    }
  },
  {
    id: 'cosmetic',
    code: 'SOUNDARYA_PRASADAK',
    nameEn: 'Ayurvedic Cosmetic (Soundarya Prasadak)',
    nameHi: 'आयुर्वेदिक प्रसाधन (सौंदर्य प्रसाधक)',
    tagline: 'Topical beauty and personal care preparations using botanical actives for cleansing, beautifying, or altering appearance.',
    iconName: 'Sparkle',
    examples: ['Kumkumadi Tailam facial serums', 'Bhringraj scalp oils', 'Ubtan exfoliating paste', 'Neem-Tulsi purifying face washes'],
    statutoryBasis: 'Section 3(aaa) of Drugs and Cosmetics Act, 1940; Rule 158-B(VI); IS 4707 (Part 1 & 2) Bureau of Indian Standards.',
    regulatoryRequirements: [
      'Must NOT contain any heavy metals (lead, arsenic, mercury) above strict permissible parts-per-million limits.',
      'No medicinal or therapeutic claims allowed (e.g., cannot claim "cures alopecia" or "eliminates psoriasis"). Allowed claims: "promotes hair luster", "gently cleanses skin".',
      'Manufacturing under AYUSH cosmetic license with BIS testing documentation.'
    ],
    ipPosture: {
      patentability: 'Cosmetic bases combining traditional oils are barred under Section 3(p) and 3(e). Novel nano-emulsion delivery, stabilization of oxidation-prone Ayurvedic oils, or sustained topical release vehicles can be patented.',
      section3pStatus: 'Conditional / Novel Delivery Only',
      trademarkRules: 'Brand protection is paramount. Register trademarks in Class 3 (Cosmetics, essential oils, soaps). Bottle shapes and ornamental packaging can be registered under Designs Act 2000.',
      keyTip: 'The majority of IP value in Ayurvedic cosmetics lies in Trademark brand equity, Trade Dress, and Proprietary Fragrance/Stabilization Trade Secrets.'
    },
    absPosture: {
      nbaApproval: 'Commercial utilization of bio-resources for cosmetic products requires SBB intimation (Indian entities) or Section 3 NBA approval (foreign entities).',
      formRequired: 'SBB Intimation / NBA Form I.',
      benefitSharingRate: '0.1% to 0.5% ex-factory price.'
    }
  }
];
