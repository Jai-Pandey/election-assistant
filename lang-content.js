// Translated content overlays per country per language
// Structure: LANG_CONTENT[country][lang] = { timeline, steps, faq, checklist }
// Only non-English translations stored here. English uses countries-data.js directly.
const LANG_CONTENT = {
  us: {
    es: {
      timeline: [
        { phase: '12–18 Meses Antes', title: 'Temporada de Primarias', desc: 'Los candidatos se presentan, se celebran primarias y asambleas en todos los estados.' },
        { phase: '6–4 Meses Antes', title: 'Convenciones Nacionales', desc: 'Los partidos nominan formalmente a los candidatos presidenciales y vicepresidenciales.' },
        { phase: '4–1 Meses Antes', title: 'Temporada de Campaña', desc: 'Debates presidenciales, mítines, anuncios de TV y campaña en estados clave.' },
        { phase: '45 Días Antes', title: 'Fecha Límite de Registro', desc: 'La mayoría de los estados requieren registro 15–30 días antes del Día de Elección.' },
        { phase: '2–4 Semanas Antes', title: 'Votación Anticipada', desc: 'Muchos estados ofrecen votación anticipada en persona y por correo.' },
        { phase: 'Primer Martes después del 1 de Nov', title: 'Día de Elección', desc: 'Las urnas abren en todo el país. Vote en su lugar de votación asignado.' },
        { phase: 'Dic–Ene', title: 'Colegio Electoral e Inauguración', desc: 'Los electores votan en diciembre. El presidente toma posesión el 20 de enero.' },
      ],
      faq: [
        { q: '¿Qué es el Colegio Electoral?', a: 'Un sistema de 538 electores que eligen formalmente al presidente. Cada estado tiene electores iguales a su representación en el Congreso. Un candidato necesita 270 para ganar.' },
        { q: '¿Necesito identificación para votar?', a: 'Depende de su estado. Algunos requieren identificación con foto, otros aceptan identificación sin foto, y algunos no tienen requisito estricto. Consulte vote.org para su estado.' },
        { q: '¿Puedo votar si me mudé recientemente?', a: 'Necesita actualizar su registro a su nueva dirección. Algunos estados ofrecen registro el mismo día. Consulte con la oficina electoral de su nuevo estado.' },
        { q: '¿Qué son los estados indecisos?', a: 'Estados donde ningún partido tiene una mayoría fuerte, lo que los hace altamente competitivos. Ejemplos incluyen Pensilvania, Míchigan, Wisconsin, Arizona y Georgia.' },
        { q: '¿Cuál es la diferencia entre primarias y la elección general?', a: 'Las primarias permiten a los miembros del partido elegir a su candidato. La elección general es cuando todos los votantes eligen entre los nominados de los partidos para el cargo.' },
      ],
      checklist: ['Registrarse para votar (verifique la fecha límite de su estado)', 'Verificar su lugar de votación', 'Reunir la identificación requerida para su estado', 'Investigar candidatos y medidas electorales', 'Anotar fechas clave: primaria, fecha límite de registro, Día de Elección', 'Elegir método de votación: en persona, anticipada o por correo', '¡Emitir su voto!'],
    },
  },
  in: {
    hi: {
      timeline: [
        { phase: '6–12 महीने पहले', title: 'चुनाव-पूर्व', desc: 'राजनीतिक दल घोषणापत्र तैयार करते हैं, गठबंधन बनाते हैं और उम्मीदवारों का चयन करते हैं।' },
        { phase: '2–3 महीने पहले', title: 'चुनाव घोषणा', desc: 'भारत निर्वाचन आयोग (ECI) तारीखों की घोषणा करता है और आदर्श आचार संहिता लागू होती है।' },
        { phase: '1–2 महीने पहले', title: 'प्रचार अभियान', desc: 'रैलियाँ, रोड शो और मीडिया अभियान सभी निर्वाचन क्षेत्रों में।' },
        { phase: 'अंतिम तिथि से पहले', title: 'मतदाता सूची सत्यापन', desc: 'nvsp.in पर अपना नाम मतदाता सूची में जाँचें।' },
        { phase: 'कई चरणों में', title: 'मतदान दिवस', desc: 'भारत में 4–6 सप्ताह में कई चरणों में ईवीएम से मतदान होता है।' },
        { phase: 'अंतिम चरण के बाद', title: 'मतगणना और परिणाम', desc: 'सभी मतों की एक साथ गिनती। उसी दिन परिणाम घोषित।' },
      ],
      faq: [
        { q: 'ईवीएम और वीवीपैट क्या है?', a: 'ईवीएम (इलेक्ट्रॉनिक वोटिंग मशीन) का उपयोग इलेक्ट्रॉनिक रूप से वोट डालने के लिए किया जाता है। वीवीपैट (वोटर वेरिफ़ाइबल पेपर ऑडिट ट्रेल) एक कागज़ी पर्ची प्रिंट करता है ताकि आप सत्यापित कर सकें कि आपका वोट सही दर्ज हुआ।' },
        { q: 'भारत में कई चरणों में मतदान क्यों होता है?', a: 'विशाल पैमाने (90 करोड़+ मतदाता) के कारण, चुनाव चरणों में होते हैं ताकि सुरक्षा बल और ECI अधिकारी पूरे देश में तैनात किए जा सकें।' },
        { q: 'आदर्श आचार संहिता क्या है?', a: 'ECI द्वारा जारी नियमों का एक सेट जो चुनाव के दौरान पार्टियों और उम्मीदवारों के व्यवहार को नियंत्रित करता है — कोई घृणा भाषण नहीं, राजनीतिक लाभ के लिए सरकारी घोषणाएँ नहीं, आदि।' },
        { q: 'क्या NRI भारतीय चुनावों में वोट कर सकते हैं?', a: 'हाँ, NRI विदेशी मतदाता के रूप में पंजीकृत होने पर वोट कर सकते हैं, लेकिन उन्हें मतदान केंद्र पर व्यक्तिगत रूप से उपस्थित होना होगा। डाक मतपत्र सुविधा का विस्तार किया जा रहा है।' },
        { q: 'मतदाता पहचान पत्र के रूप में कौन से दस्तावेज़ मान्य हैं?', a: 'EPIC कार्ड, आधार, पासपोर्ट, ड्राइविंग लाइसेंस, पैन कार्ड, या ECI द्वारा स्वीकृत कोई भी सरकारी फोटो पहचान पत्र।' },
      ],
      checklist: ['मतदाता सूची में अपना नाम सत्यापित करें (nvsp.in)', 'अपना EPIC कार्ड या स्वीकृत फोटो पहचान पत्र तैयार रखें', 'वोटर हेल्पलाइन ऐप पर अपना मतदान केंद्र खोजें', 'myneta.info पर उम्मीदवारों के बारे में जानें', 'अपने निर्वाचन क्षेत्र के मतदान चरण और तारीख जाँचें', 'ईवीएम से मतदान करें और वीवीपैट पर सत्यापित करें', 'eciresults.nic.in पर परिणाम देखें'],
    },
  },
  ca: {
    fr: {
      timeline: [
        { phase: 'Jusqu\'à 4 ans', title: 'Mandat Parlementaire', desc: 'Dates d\'élection fixes (3e lundi d\'octobre), mais le PM peut déclencher plus tôt.' },
        { phase: '~50 Jours Avant', title: 'Déclenchement', desc: 'Le Gouverneur général dissout le Parlement sur avis du PM. Période de bref commence.' },
        { phase: 'Période de Bref', title: 'Campagne Électorale', desc: 'Campagne officielle avec débats des chefs et démarchage dans les circonscriptions.' },
        { phase: '6e Jour Avant', title: 'Date Limite d\'Inscription', desc: 'Dernier jour pour s\'inscrire. Inscription possible au bureau de vote le jour J.' },
        { phase: '4 Jours Avant', title: 'Vote par Anticipation', desc: 'Votez par anticipation dans les bureaux de vote anticipé pendant 4 jours.' },
        { phase: 'Lundi Désigné', title: 'Jour d\'Élection', desc: 'Les bureaux de vote ouvrent dans les 338 circonscriptions fédérales.' },
        { phase: 'Jours Suivants', title: 'Résultats et Gouvernement', desc: 'Dépouillement des votes. Le parti avec le plus de sièges forme le gouvernement.' },
      ],
      faq: [
        { q: 'Puis-je m\'inscrire et voter le même jour?', a: 'Oui! Le Canada permet l\'inscription le jour même. Apportez une pièce d\'identité avec photo ou deux pièces d\'identité montrant votre nom et adresse.' },
        { q: 'Qu\'est-ce qu\'une circonscription?', a: 'Une circonscription (district électoral) est une zone géographique qui élit un député. Il y a 338 circonscriptions au Canada.' },
        { q: 'Y a-t-il des élections provinciales séparées?', a: 'Oui, chaque province et territoire tient ses propres élections pour sa législature, séparément des élections fédérales.' },
        { q: 'Puis-je voter depuis l\'étranger?', a: 'Oui, les citoyens canadiens vivant à l\'étranger peuvent voter par bulletin spécial via Élections Canada.' },
      ],
      checklist: ['Vérifier votre inscription sur elections.ca', 'Préparer une pièce d\'identité acceptée', 'Trouver votre bureau de vote', 'Rechercher les candidats de votre circonscription', 'Noter les dates de vote anticipé et du jour d\'élection', 'Déposer votre bulletin!', 'Suivre les résultats sur elections.ca'],
    },
  },
  gb: {
    cy: {
      timeline: [
        { phase: 'Hyd at 5 Mlynedd', title: 'Tymor Seneddol', desc: 'Gall y Senedd eistedd am hyd at 5 mlynedd cyn bod rhaid galw etholiad.' },
        { phase: '~6 Wythnos Cyn', title: 'Galw Etholiad', desc: 'Mae\'r PM yn gofyn am ddiddymiad y Senedd. Mae\'r cyfnod ymgyrchu\'n dechrau.' },
        { phase: '5 Wythnos Cyn', title: 'Tymor Ymgyrchu', desc: 'Maniffestos pleidiau, dadleuon, canfasio ar draws etholaethau.' },
        { phase: '12 Diwrnod Gwaith Cyn', title: 'Dyddiad Cau Cofrestru', desc: 'Diwrnod olaf i gofrestru i bleidleisio yn yr etholiad hwn.' },
        { phase: '11 Diwrnod Gwaith Cyn', title: 'Dyddiad Cau Pleidlais Bost', desc: 'Diwrnod olaf i wneud cais am bleidlais bost.' },
        { phase: 'Dydd Iau Dynodedig', title: 'Diwrnod Pleidleisio', desc: 'Gorsafoedd pleidleisio ar agor 7 AM – 10 PM ar draws 650 etholaeth.' },
        { phase: 'Y Diwrnod Wedyn', title: 'Canlyniadau a Llywodraeth', desc: 'Cyfrif dros nos. PM fel arfer wedi\'i gadarnhau erbyn y bore.' },
      ],
      faq: [
        { q: 'Oes angen llun ID i bleidleisio?', a: 'Oes, ers 2023 mae angen ffurf dderbyniol o ID llun i bleidleisio\'n bersonol yn Lloegr. Os nad oes gennych un, gallwch wneud cais am Dystysgrif Awdurdod Pleidleisiwr am ddim.' },
        { q: 'Beth yw Cyntaf i\'r Felin (FPTP)?', a: 'Y ymgeisydd gyda\'r mwyaf o bleidleisiau ym mhob etholaeth sy\'n ennill y sedd. Nid oes angen canran lleiaf.' },
        { q: 'A allaf bleidleisio os ydw i\'n ddinesydd y Gymanwlad?', a: 'Gallwch, gall dinasyddion cymwys y Gymanwlad sy\'n byw yn y DU gofrestru a phleidleisio ym mhob etholiad y DU.' },
        { q: 'Beth yw senedd grog?', a: 'Pan na fydd unrhyw blaid yn ennill 326+ sedd. Gall y blaid fwyaf geisio ffurfio clymblaid neu lywodraethu fel lleiafrif.' },
      ],
      checklist: ['Cofrestru yn gov.uk/register-to-vote', 'Gwiriwch fod gennych ID llun derbyniol', 'Dewch o hyd i\'ch gorsaf bleidleisio', 'Darllenwch faniffestos y pleidiau', 'Nodwch ddyddiad y diwrnod pleidleisio (bob amser dydd Iau)', 'Pleidleisiwch 7 AM – 10 PM ar ddiwrnod pleidleisio', 'Dilynwch y canlyniadau dros nos ar BBC/ITV'],
    },
  },
  de: {
    de: {
      timeline: [
        { phase: 'Alle 4 Jahre', title: 'Legislaturperiode', desc: 'Der Bundestag wird für 4 Jahre gewählt.' },
        { phase: '~3 Monate Vorher', title: 'Wahlkampf', desc: 'Parteien veröffentlichen Programme, halten Kundgebungen ab und debattieren im TV.' },
        { phase: '6 Wochen Vorher', title: 'Briefwahl Möglich', desc: 'Beantragen Sie die Briefwahl bei Ihrem örtlichen Wahlamt.' },
        { phase: '42. Tag Vorher', title: 'Nominierungsfrist', desc: 'Parteien stellen Kandidatenlisten für Wahlkreise und Landeslisten auf.' },
        { phase: 'Bestimmter Sonntag', title: 'Wahltag', desc: 'Wahllokale geöffnet 8–18 Uhr in allen 299 Wahlkreisen.' },
        { phase: 'Wochen Danach', title: 'Koalition und Regierung', desc: 'Parteien verhandeln Koalitionen. Kanzler/in wird vom Bundestag gewählt.' },
      ],
      faq: [
        { q: 'Was ist der Unterschied zwischen Erststimme und Zweitstimme?', a: 'Die Erststimme wählt einen Direktkandidaten im Wahlkreis. Die Zweitstimme ist für eine Partei und bestimmt die proportionale Zusammensetzung des Bundestags. Die Zweitstimme gilt als wichtiger.' },
        { q: 'Was ist die 5%-Hürde?', a: 'Eine Partei muss mindestens 5% aller Zweitstimmen erhalten (oder 3 Direktmandate gewinnen), um in den Bundestag einzuziehen. Dies verhindert extreme Zersplitterung.' },
        { q: 'Warum finden Wahlen am Sonntag statt?', a: 'Um eine maximale Wahlbeteiligung zu gewährleisten, werden Wahlen an einem Tag abgehalten, an dem die meisten Menschen nicht arbeiten.' },
        { q: 'Wie funktionieren Koalitionsverhandlungen?', a: 'Nach der Wahl verhandeln die Parteien eine Koalition mit Bundestagsmehrheit. Sie einigen sich auf einen Koalitionsvertrag und wählen den Kanzler.' },
      ],
      checklist: ['Prüfen Sie, ob Ihre Wahlbenachrichtigung angekommen ist', 'Entscheiden: Vor Ort wählen oder Briefwahl beantragen', 'Wahlprogramme der Parteien studieren', 'Das Zwei-Stimmen-System verstehen (Erst- & Zweitstimme)', 'Ausweis und Wahlbenachrichtigung zum Wahllokal mitbringen', 'Beide Stimmen am Sonntag abgeben (8–18 Uhr)', 'Ergebnisse auf tagesschau.de verfolgen'],
    },
  },
};
