/* =============================================================================
   Lex Serdica · lawyers, practice areas, FAQ and legal texts
   -----------------------------------------------------------------------------
   Everything here is written once per language: { en: …, bg: …, de: … }.
   The site counts lawyers and years of experience by itself, so adding,
   removing or editing a lawyer updates every heading and form automatically.

   LAWYERS
     id         short unique name used in links, e.g. 'velcheva'
     name       latin: used in English and German; cyrillic: used in Bulgarian
     gender     'f' or 'm' (for German forms of address: Frau / Herrn)
     area       the id of their practice area (see AREAS below)
     since      year they started in this field; years of experience are worked out from it
     barSince   year of admission to the bar
     photo      path to a portrait, e.g. 'img/lawyers/velcheva.jpg' (4:5 works best).
                Leave '' to show the monogram placeholder.
     languages  ISO codes: 'bg', 'en', 'de', 'ru', 'fr' …

   SAMPLE CONTENT: every person below is fictional.
   ============================================================================= */

window.SITE_CONTENT = {
  areas: [
    {
      id: 'family',
      icon: 'users-round',
      title: { en: 'Family & Inheritance', bg: 'Семейно и наследствено право', de: 'Familien- und Erbrecht' },
      summary: {
        en: 'Divorce, children and family property, handled with discretion and a clear plan. Also wills and inheritance disputes.',
        bg: 'Развод, деца и семейно имущество – с дискретност и ясен план. Също завещания и наследствени спорове.',
        de: 'Scheidung, Kinder und Familienvermögen – diskret und mit klarem Plan. Dazu Testamente und Erbstreitigkeiten.',
      },
      items: {
        en: ['Divorce by mutual consent or through the courts', 'Custody, contact arrangements and child support', 'Division of marital property', 'Wills, estates and forced-share disputes'],
        bg: ['Развод по взаимно съгласие или по исков ред', 'Родителски права, режим на лични отношения и издръжка', 'Подялба на семейното имущество', 'Завещания, наследство и спорове за запазена част'],
        de: ['Einvernehmliche oder streitige Scheidung', 'Sorgerecht, Umgang und Kindesunterhalt', 'Aufteilung des ehelichen Vermögens', 'Testamente, Nachlässe und Pflichtteilsstreitigkeiten'],
      },
    },
    {
      id: 'criminal',
      icon: 'shield',
      title: { en: 'Criminal Defence', bg: 'Наказателна защита', de: 'Strafverteidigung' },
      summary: {
        en: 'Defence from the first police contact to the final appeal, and representation for victims of crime.',
        bg: 'Защита от първия контакт с полицията до последната инстанция, както и представителство на пострадали.',
        de: 'Verteidigung vom ersten Polizeikontakt bis zur letzten Instanz, dazu die Vertretung von Geschädigten.',
      },
      items: {
        en: ['Defence in pre-trial proceedings and at trial', 'Detention hearings and measures of restraint', 'Traffic and drink-driving offences', 'Representation of victims'],
        bg: ['Защита в досъдебното производство и в съда', 'Задържане и мерки за неотклонение', 'Пътнотранспортни престъпления и шофиране след употреба на алкохол', 'Представителство на пострадали'],
        de: ['Verteidigung im Ermittlungs- und Hauptverfahren', 'Untersuchungshaft und Haftprüfung', 'Verkehrsstrafsachen und Trunkenheitsfahrten', 'Vertretung von Geschädigten'],
      },
    },
    {
      id: 'property',
      icon: 'house',
      title: { en: 'Real Estate & Property', bg: 'Имоти и вещно право', de: 'Immobilien- und Sachenrecht' },
      summary: {
        en: 'Safe property purchases, and firm representation when ownership is disputed.',
        bg: 'Сигурни сделки с имоти и твърда защита, когато собствеността е спорна.',
        de: 'Sichere Immobiliengeschäfte und konsequente Vertretung, wenn das Eigentum strittig ist.',
      },
      items: {
        en: ['Title and encumbrance checks before you buy', 'Preliminary contracts and notary deeds', 'Off-plan and new-build purchases', 'Leases, co-ownership and partition'],
        bg: ['Проверка на собствеността и тежестите преди покупка', 'Предварителни договори и нотариални актове', 'Покупка на имоти „на зелено“ и в ново строителство', 'Наем, съсобственост и делба'],
        de: ['Prüfung von Eigentum und Belastungen vor dem Kauf', 'Vorverträge und notarielle Urkunden', 'Kauf vom Bauträger und im Neubau', 'Miete, Miteigentum und Teilung'],
      },
    },
    {
      id: 'employment',
      icon: 'briefcase-business',
      title: { en: 'Employment Law', bg: 'Трудово право', de: 'Arbeitsrecht' },
      summary: {
        en: 'Advice for employees and employers on dismissals, pay and workplace disputes.',
        bg: 'Съвети за служители и работодатели при уволнения, възнаграждения и трудови спорове.',
        de: 'Beratung für Arbeitnehmer und Arbeitgeber zu Kündigung, Vergütung und Konflikten am Arbeitsplatz.',
      },
      items: {
        en: ['Unlawful dismissal claims', 'Unpaid wages and compensation', 'Employment contracts and internal rules', 'Harassment and discrimination at work'],
        bg: ['Обжалване на незаконно уволнение', 'Неизплатени заплати и обезщетения', 'Трудови договори и вътрешни правила', 'Тормоз и дискриминация на работното място'],
        de: ['Klagen gegen unwirksame Kündigungen', 'Ausstehender Lohn und Entschädigungen', 'Arbeitsverträge und interne Regelungen', 'Mobbing und Diskriminierung am Arbeitsplatz'],
      },
    },
    {
      id: 'corporate',
      icon: 'handshake',
      title: { en: 'Corporate & Commercial', bg: 'Търговско и корпоративно право', de: 'Gesellschafts- und Handelsrecht' },
      summary: {
        en: 'Practical legal support for businesses, from setting up a company to contracts and disputes.',
        bg: 'Практична правна подкрепа за бизнеса – от регистрацията на фирма до договорите и споровете.',
        de: 'Praktische rechtliche Unterstützung für Unternehmen, von der Gründung über Verträge bis zu Streitigkeiten.',
      },
      items: {
        en: ['Company formation and Commercial Register changes', 'Commercial contracts and terms', 'Shareholder disputes', 'Debt recovery and insolvency'],
        bg: ['Регистрация на фирма и промени в Търговския регистър', 'Търговски договори и общи условия', 'Спорове между съдружници', 'Събиране на вземания и несъстоятелност'],
        de: ['Firmengründung und Änderungen im Handelsregister', 'Handelsverträge und AGB', 'Gesellschafterstreitigkeiten', 'Forderungseinzug und Insolvenz'],
      },
    },
    {
      id: 'immigration',
      icon: 'id-card',
      title: { en: 'Immigration & Residency', bg: 'Имиграция и пребиваване', de: 'Aufenthalts- und Migrationsrecht' },
      summary: {
        en: 'Residence, work and citizenship procedures for individuals, families and employers.',
        bg: 'Процедури за пребиваване, работа и гражданство за граждани, семейства и работодатели.',
        de: 'Aufenthalt, Arbeit und Staatsangehörigkeit – für Privatpersonen, Familien und Arbeitgeber.',
      },
      items: {
        en: ['Long-term and permanent residence', 'EU Blue Card and work permits', 'Family reunification and EU citizen registration', 'Bulgarian citizenship and document legalisation'],
        bg: ['Продължително и постоянно пребиваване', 'Синя карта на ЕС и разрешения за работа', 'Събиране на семейството и регистрация на граждани на ЕС', 'Българско гражданство и легализация на документи'],
        de: ['Langfristiger und unbefristeter Aufenthalt', 'Blaue Karte EU und Arbeitserlaubnisse', 'Familiennachzug und Anmeldung von EU-Bürgern', 'Bulgarische Staatsangehörigkeit und Legalisation von Dokumenten'],
      },
    },
  ],

  lawyers: [
    {
      id: 'lazarov',
      name: { latin: ['Bozhidar', 'Lazarov'], cyrillic: ['Божидар', 'Лазаров'] },
      gender: 'm',
      role: { en: 'Managing Partner', bg: 'Управляващ съдружник', de: 'Geschäftsführender Partner' },
      area: 'corporate',
      since: 2001,
      barSince: 2001,
      photo: '',
      languages: ['bg', 'en', 'de'],
      education: [
        { en: 'Master of Laws, Sofia University “St. Kliment Ohridski”, 2000', bg: 'Магистър по право, Софийски университет „Св. Климент Охридски“, 2000 г.', de: 'Master of Laws, Universität Sofia „Hl. Kliment Ohridski“, 2000' },
        { en: 'LL.M., Heidelberg University, 2003', bg: 'LL.M., Хайделбергски университет, 2003 г.', de: 'LL.M., Universität Heidelberg, 2003' },
      ],
      career: [],
      bio: {
        en: 'Advises Bulgarian and international businesses, from first-time founders to established groups, on company matters, contracts and transactions.',
        bg: 'Консултира български и международни компании – от начинаещи предприемачи до утвърдени групи – по корпоративни въпроси, договори и сделки.',
        de: 'Berät bulgarische und internationale Unternehmen, von Gründerinnen und Gründern bis zu etablierten Unternehmensgruppen, in Gesellschaftsfragen, bei Verträgen und Transaktionen.',
      },
      focus: {
        en: ['Company formation and restructuring', 'Commercial contracts and negotiations', 'Mergers, acquisitions and due diligence', 'Shareholder disputes', 'Debt recovery and insolvency'],
        bg: ['Регистрация и преструктуриране на дружества', 'Търговски договори и преговори', 'Сливания, придобивания и правен анализ (дю дилиджънс)', 'Спорове между съдружници', 'Събиране на вземания и несъстоятелност'],
        de: ['Gründung und Umstrukturierung von Gesellschaften', 'Handelsverträge und Verhandlungen', 'M&A und Due Diligence', 'Gesellschafterstreitigkeiten', 'Forderungseinzug und Insolvenz'],
      },
    },
    {
      id: 'trendafilov',
      name: { latin: ['Nikolay', 'Trendafilov'], cyrillic: ['Николай', 'Трендафилов'] },
      gender: 'm',
      role: { en: 'Partner', bg: 'Съдружник', de: 'Partner' },
      area: 'criminal',
      since: 2005,
      barSince: 2011,
      photo: '',
      languages: ['bg', 'en', 'ru'],
      education: [
        { en: 'Master of Laws, University of Veliko Tarnovo “St. Cyril and St. Methodius”, 2004', bg: 'Магистър по право, Великотърновски университет „Св. св. Кирил и Методий“, 2004 г.', de: 'Master of Laws, Universität Veliko Tarnovo „Hll. Kyrill und Method“, 2004' },
      ],
      career: [
        { en: 'Prosecutor, Sofia District Prosecutor’s Office, 2005–2011', bg: 'Прокурор, Софийска районна прокуратура, 2005–2011 г.', de: 'Staatsanwalt, Bezirksstaatsanwaltschaft Sofia, 2005–2011' },
      ],
      bio: {
        en: 'Spent six years as a prosecutor before moving to the defence. He knows how the other side builds a case and puts that knowledge to work for his clients.',
        bg: 'Работил е шест години като прокурор, преди да премине към защитата. Знае как другата страна изгражда обвинението и използва това в полза на клиентите си.',
        de: 'War sechs Jahre Staatsanwalt, bevor er in die Verteidigung wechselte. Er weiß, wie die Gegenseite einen Fall aufbaut, und nutzt dieses Wissen für seine Mandantinnen und Mandanten.',
      },
      focus: {
        en: ['Defence in pre-trial proceedings and at trial', 'Detention hearings and measures of restraint', 'Traffic and drink-driving offences', 'Economic and white-collar crime', 'Representation of victims', 'Appeals'],
        bg: ['Защита в досъдебното производство и в съда', 'Задържане и мерки за неотклонение', 'Пътнотранспортни престъпления и шофиране след употреба на алкохол', 'Стопански и финансови престъпления', 'Представителство на пострадали', 'Обжалване'],
        de: ['Verteidigung im Ermittlungs- und Hauptverfahren', 'Untersuchungshaft und Haftprüfung', 'Verkehrsstrafsachen und Trunkenheitsfahrten', 'Wirtschaftsstrafrecht', 'Vertretung von Geschädigten', 'Rechtsmittel'],
      },
    },
    {
      id: 'velcheva',
      name: { latin: ['Radostina', 'Velcheva'], cyrillic: ['Радостина', 'Велчева'] },
      gender: 'f',
      role: { en: 'Partner', bg: 'Съдружник', de: 'Partnerin' },
      area: 'family',
      since: 2008,
      barSince: 2008,
      photo: '',
      languages: ['bg', 'en'],
      education: [
        { en: 'Master of Laws, Sofia University “St. Kliment Ohridski”, 2007', bg: 'Магистър по право, Софийски университет „Св. Климент Охридски“, 2007 г.', de: 'Master of Laws, Universität Sofia „Hl. Kliment Ohridski“, 2007' },
        { en: 'Accredited mediator, Ministry of Justice register, 2012', bg: 'Медиатор, вписан в Единния регистър на медиаторите, 2012 г.', de: 'Zertifizierte Mediatorin, Mediatorenregister des Justizministeriums, 2012' },
      ],
      career: [],
      bio: {
        en: 'Guides clients through divorce, custody and inheritance with discretion and a clear plan. She looks for agreement first and goes to court when it is needed.',
        bg: 'Води клиентите през развод, родителски права и наследство с дискретност и ясен план. Първо търси споразумение, а когато е нужно – защитава интересите им в съда.',
        de: 'Begleitet Mandantinnen und Mandanten diskret und mit klarem Plan durch Scheidung, Sorgerechtsfragen und Erbschaften. Sie sucht zuerst die Einigung und geht vor Gericht, wenn es nötig ist.',
      },
      focus: {
        en: ['Divorce by mutual consent or through the courts', 'Custody, contact arrangements and child support', 'Division of marital property', 'Wills and inheritance', 'Forced-share disputes'],
        bg: ['Развод по взаимно съгласие или по исков ред', 'Родителски права, режим на лични отношения и издръжка', 'Подялба на семейното имущество', 'Завещания и наследяване', 'Спорове за запазена част'],
        de: ['Einvernehmliche oder streitige Scheidung', 'Sorgerecht, Umgang und Kindesunterhalt', 'Aufteilung des ehelichen Vermögens', 'Testamente und Erbfolge', 'Pflichtteilsstreitigkeiten'],
      },
    },
    {
      id: 'kostadinova',
      name: { latin: ['Iva', 'Kostadinova'], cyrillic: ['Ива', 'Костадинова'] },
      gender: 'f',
      role: { en: 'Partner', bg: 'Съдружник', de: 'Partnerin' },
      area: 'property',
      since: 2011,
      barSince: 2011,
      photo: '',
      languages: ['bg', 'en', 'de'],
      education: [
        { en: 'Master of Laws, University of National and World Economy, Sofia, 2010', bg: 'Магистър по право, Университет за национално и световно стопанство, 2010 г.', de: 'Master of Laws, Universität für National- und Weltwirtschaft, Sofia, 2010' },
      ],
      career: [],
      bio: {
        en: 'Makes sure clients know exactly what they are buying, and what they are signing, before the notary appointment.',
        bg: 'Грижи се клиентите да знаят точно какво купуват – и какво подписват – още преди срещата при нотариуса.',
        de: 'Sorgt dafür, dass ihre Mandantinnen und Mandanten genau wissen, was sie kaufen und was sie unterschreiben, bevor sie zum Notar gehen.',
      },
      focus: {
        en: ['Title and encumbrance checks', 'Preliminary contracts and notary deeds', 'Off-plan and new-build purchases', 'Leases and landlord–tenant disputes', 'Co-ownership and partition'],
        bg: ['Проверка на собственост и тежести', 'Предварителни договори и нотариални актове', 'Покупка на имоти „на зелено“ и в ново строителство', 'Наеми и спорове между наемодатели и наематели', 'Съсобственост и делба'],
        de: ['Prüfung von Eigentum und Belastungen', 'Vorverträge und notarielle Urkunden', 'Kauf vom Bauträger und im Neubau', 'Mietverträge und Mietstreitigkeiten', 'Miteigentum und Teilung'],
      },
    },
    {
      id: 'dobrev',
      name: { latin: ['Martin', 'Dobrev'], cyrillic: ['Мартин', 'Добрев'] },
      gender: 'm',
      role: { en: 'Senior Associate', bg: 'Старши адвокат', de: 'Senior Associate' },
      area: 'employment',
      since: 2017,
      barSince: 2017,
      photo: '',
      languages: ['bg', 'en'],
      education: [
        { en: 'Master of Laws, Plovdiv University “Paisii Hilendarski”, 2016', bg: 'Магистър по право, Пловдивски университет „Паисий Хилендарски“, 2016 г.', de: 'Master of Laws, Universität Plowdiw „Paisii Hilendarski“, 2016' },
      ],
      career: [],
      bio: {
        en: 'Represents employees and employers alike, so he knows how a workplace dispute looks from both sides of the table.',
        bg: 'Представлява както служители, така и работодатели, затова познава трудовите спорове и от двете страни на масата.',
        de: 'Vertritt Arbeitnehmer wie Arbeitgeber und kennt Konflikte am Arbeitsplatz deshalb von beiden Seiten des Tisches.',
      },
      focus: {
        en: ['Unlawful dismissal claims', 'Unpaid wages and compensation', 'Employment contracts and internal rules', 'Harassment and discrimination', 'HR compliance for employers'],
        bg: ['Обжалване на незаконно уволнение', 'Неизплатени заплати и обезщетения', 'Трудови договори и вътрешни правила', 'Тормоз и дискриминация', 'Трудовоправно съответствие за работодатели'],
        de: ['Klagen gegen unwirksame Kündigungen', 'Ausstehender Lohn und Entschädigungen', 'Arbeitsverträge und interne Regelungen', 'Mobbing und Diskriminierung', 'Arbeitsrechtliche Compliance für Arbeitgeber'],
      },
    },
    {
      id: 'zhelyazkova',
      name: { latin: ['Mila', 'Zhelyazkova'], cyrillic: ['Мила', 'Желязкова'] },
      gender: 'f',
      role: { en: 'Associate', bg: 'Адвокат', de: 'Associate' },
      area: 'immigration',
      since: 2020,
      barSince: 2020,
      photo: '',
      languages: ['bg', 'en', 'de'],
      education: [
        { en: 'Master of Laws, New Bulgarian University, 2019', bg: 'Магистър по право, Нов български университет, 2019 г.', de: 'Master of Laws, Neue Bulgarische Universität, 2019' },
        { en: 'LL.M. in European Law, Leiden University, 2020', bg: 'LL.M. по европейско право, Лайденски университет, 2020 г.', de: 'LL.M. im Europarecht, Universität Leiden, 2020' },
      ],
      career: [],
      bio: {
        en: 'Helps individuals, families and employers through Bulgarian immigration procedures, in English, German or Bulgarian.',
        bg: 'Помага на граждани, семейства и работодатели в имиграционните процедури в България – на български, английски или немски.',
        de: 'Begleitet Privatpersonen, Familien und Arbeitgeber durch bulgarische Aufenthaltsverfahren – auf Deutsch, Englisch oder Bulgarisch.',
      },
      focus: {
        en: ['Long-term and permanent residence', 'EU Blue Card and work permits', 'Family reunification', 'EU citizen registration', 'Citizenship and document legalisation'],
        bg: ['Продължително и постоянно пребиваване', 'Синя карта на ЕС и разрешения за работа', 'Събиране на семейството', 'Регистрация на граждани на ЕС', 'Гражданство и легализация на документи'],
        de: ['Langfristiger und unbefristeter Aufenthalt', 'Blaue Karte EU und Arbeitserlaubnisse', 'Familiennachzug', 'Anmeldung von EU-Bürgern', 'Staatsangehörigkeit und Legalisation von Dokumenten'],
      },
    },
  ],

  faq: [
    {
      q: { en: 'Is the first consultation really free?', bg: 'Наистина ли първата консултация е безплатна?', de: 'Ist die Erstberatung wirklich kostenlos?' },
      a: {
        en: 'Yes. The first {min} minutes with a lawyer are free and come with no obligation. If your matter needs more time or further work, we tell you the cost first, and you decide whether to go ahead.',
        bg: 'Да. Първите {min} минути с адвокат са безплатни и без ангажимент. Ако случаят ви изисква повече време или допълнителна работа, първо ви казваме цената, а вие решавате дали да продължим.',
        de: 'Ja. Die ersten {min} Minuten mit einer Anwältin oder einem Anwalt sind kostenlos und unverbindlich. Braucht Ihre Angelegenheit mehr Zeit oder weitere Arbeit, nennen wir Ihnen zuerst die Kosten, und Sie entscheiden, ob Sie fortfahren möchten.',
      },
    },
    {
      q: { en: 'What happens during the {min} minutes?', bg: 'Какво се случва през тези {min} минути?', de: 'Was passiert in den {min} Minuten?' },
      a: {
        en: 'The lawyer listens to your situation, asks the key questions and explains your options and the possible next steps. If you need further help, you will know how we can help and what it would cost.',
        bg: 'Адвокатът изслушва ситуацията ви, задава ключовите въпроси и обяснява възможностите и следващите стъпки. Ако имате нужда от още помощ, ще знаете как можем да помогнем и колко ще струва.',
        de: 'Wir hören uns Ihre Situation an, stellen die entscheidenden Fragen und erklären Ihre Möglichkeiten und die nächsten Schritte. Brauchen Sie weitere Hilfe, wissen Sie danach, wie wir helfen können und was es kosten würde.',
      },
    },
    {
      q: { en: 'Can we talk by phone or video instead of meeting?', bg: 'Може ли да говорим по телефона или по видео вместо на среща?', de: 'Können wir telefonieren oder per Video sprechen, statt uns zu treffen?' },
      a: {
        en: 'Yes. Choose a phone call, a video call or an appointment at our office in central Sofia. For video calls we email you a link that opens in your browser, so you don’t need to install anything.',
        bg: 'Да. Изберете телефонен разговор, видеоразговор или среща в офиса ни в центъра на София. За видеоразговор ви изпращаме линк по имейл, който се отваря в браузъра – не е нужно да инсталирате нищо.',
        de: 'Ja. Wählen Sie ein Telefonat, einen Videoanruf oder einen Termin in unserer Kanzlei im Zentrum von Sofia. Für Videoanrufe senden wir Ihnen einen Link per E-Mail, der sich im Browser öffnet – Sie müssen nichts installieren.',
      },
    },
    {
      q: { en: 'How soon will you contact me?', bg: 'Колко бързо ще се свържете с мен?', de: 'Wie schnell melden Sie sich?' },
      a: {
        en: 'We confirm online requests within one business day. If your matter is urgent, for example if someone has been detained, call us directly on {phone}.',
        bg: 'Потвърждаваме онлайн заявките в рамките на един работен ден. Ако въпросът е спешен, например ако някой е задържан, обадете ни се директно на {phone}.',
        de: 'Online-Anfragen bestätigen wir innerhalb eines Werktags. Ist Ihre Angelegenheit dringend, etwa weil jemand festgenommen wurde, rufen Sie uns direkt an: {phone}.',
      },
    },
    {
      q: { en: 'Is what I tell you confidential?', bg: 'Поверително ли е това, което ви казвам?', de: 'Bleibt vertraulich, was ich Ihnen erzähle?' },
      a: {
        en: 'Yes. Everything you share is treated as strictly confidential from the first call, whether or not you decide to work with us. Lawyers in Bulgaria are bound by professional secrecy under the Bar Act.',
        bg: 'Да. Всичко, което споделите, е строго поверително още от първия разговор – независимо дали ще продължите работа с нас. Адвокатите в България са обвързани с професионална тайна по Закона за адвокатурата.',
        de: 'Ja. Alles, was Sie uns mitteilen, behandeln wir vom ersten Gespräch an streng vertraulich, unabhängig davon, ob Sie uns beauftragen. Anwältinnen und Anwälte in Bulgarien sind nach dem Rechtsanwaltsgesetz zur Verschwiegenheit verpflichtet.',
      },
    },
    {
      q: { en: 'Which languages do you work in?', bg: 'На какви езици работите?', de: 'In welchen Sprachen arbeiten Sie?' },
      a: {
        en: 'Bulgarian, English and German, and one of our lawyers also consults in Russian. Choose your preferred language when you book.',
        bg: 'На български, английски и немски, а един от нашите адвокати консултира и на руски. Изберете предпочитания език, когато запазвате час.',
        de: 'Auf Bulgarisch, Englisch und Deutsch; einer unserer Anwälte berät außerdem auf Russisch. Wählen Sie Ihre bevorzugte Sprache bei der Buchung.',
      },
    },
    {
      q: { en: 'What should I prepare for the consultation?', bg: 'Какво да подготвя за консултацията?', de: 'Was sollte ich für die Beratung vorbereiten?' },
      a: {
        en: 'A short summary of what happened, the key dates, and any documents you have, such as contracts, letters or court papers. Have them to hand for a call, or bring copies to the office.',
        bg: 'Кратко описание на случилото се, важните дати и документите, с които разполагате – договори, писма или съдебни книжа. Дръжте ги под ръка при разговор по телефона или донесете копия в офиса.',
        de: 'Eine kurze Zusammenfassung des Geschehens, die wichtigsten Daten und vorhandene Unterlagen wie Verträge, Schreiben oder Gerichtsdokumente. Halten Sie diese beim Telefonat bereit oder bringen Sie Kopien in die Kanzlei mit.',
      },
    },
    {
      q: { en: 'How are your fees calculated?', bg: 'Как се определя хонорарът?', de: 'Wie werden Ihre Honorare berechnet?' },
      a: {
        en: 'It depends on the matter: some work suits a fixed fee, other work an hourly rate. Either way, you receive a written quote and agree to it before any paid work begins.',
        bg: 'Зависи от случая: за някои задачи е подходящ фиксиран хонорар, за други – почасова ставка. И в двата случая получавате писмена оферта и я приемате, преди да започне каквато и да е платена работа.',
        de: 'Das hängt von der Angelegenheit ab: Manches eignet sich für ein Pauschalhonorar, anderes für einen Stundensatz. In jedem Fall erhalten Sie ein schriftliches Angebot und stimmen ihm zu, bevor kostenpflichtige Arbeit beginnt.',
      },
    },
  ],

  /* Legal texts. {firm}, {address}, {phone} and {email} are filled in from js/config.js.
     TEMPLATE TEXT: have both texts reviewed before the site goes live. */
  legal: {
    privacy: {
      en: `<p>This notice explains how {firm} handles the personal data you send us through this website.</p>
<h3>Who is responsible</h3><p>{firm}, {address}, email <a href="mailto:{email}">{email}</a>, is the controller of your personal data.</p>
<h3>What we collect</h3><p>Your name and phone number, your email address if you give it, your consultation preferences, and anything you choose to tell us about your matter.</p>
<h3>Why we use it</h3><p>Only to arrange and hold your consultation at your request (Article 6(1)(b) GDPR) and to meet our professional obligations as lawyers (Article 6(1)(c) GDPR). We do not use your details for marketing.</p>
<h3>Who can see it</h3><p>Our lawyers and office staff, who are bound by professional secrecy, and the providers that host our systems under a data processing agreement. We never sell your data.</p>
<h3>How long we keep it</h3><p>If you do not become a client, we delete your request within six months. If you do, we keep your file for as long as the law requires.</p>
<h3>Your rights</h3><p>You can ask us for access to your data, to correct or delete it, to restrict or object to its use, and for a copy to take elsewhere. Write to <a href="mailto:{email}">{email}</a>. You can also complain to the Commission for Personal Data Protection (<a href="https://www.cpdp.bg" rel="noopener">cpdp.bg</a>).</p>
<h3>Cookies</h3><p>This website uses no tracking or advertising cookies. It only remembers your language and theme choice in your browser.</p>`,
      bg: `<p>Тази информация обяснява как {firm} обработва личните данни, които ни изпращате чрез този сайт.</p>
<h3>Администратор</h3><p>{firm}, {address}, имейл <a href="mailto:{email}">{email}</a>, е администратор на вашите лични данни.</p>
<h3>Какви данни събираме</h3><p>Вашето име и телефон, имейл адреса ви, ако го посочите, предпочитанията ви за консултацията и всичко, което решите да ни кажете за случая си.</p>
<h3>За какво ги използваме</h3><p>Единствено за да организираме и проведем консултацията по ваше искане (чл. 6, пар. 1, буква „б“ от ОРЗД) и за да изпълним професионалните си задължения като адвокати (чл. 6, пар. 1, буква „в“ от ОРЗД). Не използваме данните ви за маркетинг.</p>
<h3>Кой има достъп</h3><p>Нашите адвокати и служителите в кантората, които са обвързани с професионална тайна, както и доставчиците, които поддържат системите ни по договор за обработване на лични данни. Никога не продаваме данните ви.</p>
<h3>Колко дълго ги пазим</h3><p>Ако не станете наш клиент, изтриваме заявката ви в срок до шест месеца. Ако станете, пазим досието ви толкова, колкото изисква законът.</p>
<h3>Вашите права</h3><p>Можете да поискате достъп до данните си, тяхното коригиране или изтриване, ограничаване на обработването им или да възразите срещу него, както и копие от тях. Пишете ни на <a href="mailto:{email}">{email}</a>. Можете да подадете жалба и до Комисията за защита на личните данни (<a href="https://www.cpdp.bg" rel="noopener">cpdp.bg</a>).</p>
<h3>Бисквитки</h3><p>Този сайт не използва бисквитки за проследяване или реклама. Той само запомня избрания от вас език и тема във вашия браузър.</p>`,
      de: `<p>Diese Hinweise erklären, wie {firm} mit den personenbezogenen Daten umgeht, die Sie uns über diese Website senden.</p>
<h3>Verantwortlicher</h3><p>Verantwortlich für Ihre Daten ist {firm}, {address}, E-Mail <a href="mailto:{email}">{email}</a>.</p>
<h3>Welche Daten wir erheben</h3><p>Ihren Namen und Ihre Telefonnummer, Ihre E-Mail-Adresse, falls Sie sie angeben, Ihre Wünsche zur Beratung und alles, was Sie uns zu Ihrer Angelegenheit mitteilen möchten.</p>
<h3>Wofür wir sie verwenden</h3><p>Ausschließlich, um Ihre Beratung auf Ihren Wunsch zu vereinbaren und durchzuführen (Art. 6 Abs. 1 lit. b DSGVO) und um unsere berufsrechtlichen Pflichten als Anwälte zu erfüllen (Art. 6 Abs. 1 lit. c DSGVO). Für Werbung nutzen wir Ihre Daten nicht.</p>
<h3>Wer Zugriff hat</h3><p>Unsere Anwältinnen und Anwälte sowie die Mitarbeitenden der Kanzlei, die zur Verschwiegenheit verpflichtet sind, und Dienstleister, die unsere Systeme im Rahmen eines Auftragsverarbeitungsvertrags betreiben. Wir verkaufen Ihre Daten niemals.</p>
<h3>Wie lange wir sie speichern</h3><p>Kommt kein Mandat zustande, löschen wir Ihre Anfrage spätestens nach sechs Monaten. Andernfalls bewahren wir Ihre Akte so lange auf, wie es das Gesetz verlangt.</p>
<h3>Ihre Rechte</h3><p>Sie können Auskunft über Ihre Daten verlangen, ihre Berichtigung oder Löschung, die Einschränkung der Verarbeitung und eine Kopie Ihrer Daten; außerdem können Sie der Verarbeitung widersprechen. Schreiben Sie an <a href="mailto:{email}">{email}</a>. Sie können sich auch bei der bulgarischen Datenschutzkommission beschweren (<a href="https://www.cpdp.bg" rel="noopener">cpdp.bg</a>).</p>
<h3>Cookies</h3><p>Diese Website verwendet keine Tracking- oder Werbe-Cookies. Sie speichert lediglich Ihre Sprach- und Designauswahl in Ihrem Browser.</p>`,
    },
    notice: {
      en: `<p><strong>{firm}</strong>, law partnership<br>{address}<br>Phone {phone}, email <a href="mailto:{email}">{email}</a></p>
<p>BULSTAT: 000000000<br>VAT number: BG000000000</p>
<h3>Professional title and rules</h3><p>Our lawyers hold the professional title “advocate” (адвокат), awarded in the Republic of Bulgaria, and are members of the Sofia Bar Association. They practise under the Bar Act and the Code of Ethics for Lawyers, published by the Supreme Bar Council at <a href="https://www.vas.bg" rel="noopener">vas.bg</a>.</p>
<h3>Content of this website</h3><p>The information on this website is general and is not legal advice. It does not create a lawyer–client relationship.</p>`,
      bg: `<p><strong>{firm}</strong>, адвокатско дружество<br>{address}<br>Телефон {phone}, имейл <a href="mailto:{email}">{email}</a></p>
<p>БУЛСТАТ: 000000000<br>Номер по ДДС: BG000000000</p>
<h3>Професионално звание и правила</h3><p>Нашите адвокати притежават професионалното звание „адвокат“, придобито в Република България, и са членове на Софийската адвокатска колегия. Те упражняват професията си съгласно Закона за адвокатурата и Етичния кодекс на адвоката, публикувани от Висшия адвокатски съвет на <a href="https://www.vas.bg" rel="noopener">vas.bg</a>.</p>
<h3>Съдържание на сайта</h3><p>Информацията на този сайт е обща и не представлява правен съвет. Тя не създава отношения между адвокат и клиент.</p>`,
      de: `<p><strong>{firm}</strong>, Anwaltsgesellschaft (адвокатско дружество)<br>{address}<br>Telefon {phone}, E-Mail <a href="mailto:{email}">{email}</a></p>
<p>BULSTAT: 000000000<br>USt-IdNr.: BG000000000</p>
<h3>Berufsbezeichnung und berufsrechtliche Regelungen</h3><p>Unsere Anwältinnen und Anwälte führen die Berufsbezeichnung „Advokat“ (адвокат), verliehen in der Republik Bulgarien, und sind Mitglieder der Rechtsanwaltskammer Sofia. Es gelten das bulgarische Rechtsanwaltsgesetz und der Ethikkodex für Rechtsanwälte, veröffentlicht vom Obersten Anwaltsrat unter <a href="https://www.vas.bg" rel="noopener">vas.bg</a>.</p>
<h3>Inhalt dieser Website</h3><p>Die Informationen auf dieser Website sind allgemeiner Natur und stellen keine Rechtsberatung dar. Sie begründen kein Mandatsverhältnis.</p>`,
    },
  },
};
