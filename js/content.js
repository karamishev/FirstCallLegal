/* =============================================================================
   Lex Serdica · practice areas, lawyers, FAQ and legal texts
   -----------------------------------------------------------------------------
   Everything here is written once per language: { en: …, bg: …, de: … }.
   The site counts lawyers and years of experience by itself, so adding,
   removing or editing a lawyer updates every heading, card and form.

   PRACTICE AREAS (each one gets its own page, e.g. index.html#family-law)
     slug        the page address after the #; letters, digits and hyphens only
     icon        icon name from the sprite in index.html
     short       short name for the filter buttons
     facts       three "worth knowing" figures shown at the top of the area page
     situations  four common situations
     steps       first steps, in order
     documents   documents to have ready
     faq         questions and answers for this area
     urgent      optional red box at the top of the page (used for criminal defence)

   LAWYERS
     id         short unique name used in links, e.g. 'velcheva'
     name       latin: used in English and German; cyrillic: used in Bulgarian
     gender     'f' or 'm' (for German forms of address: Frau / Herrn)
     area       the id of their practice area. The first lawyer listed for an area is its lead lawyer.
     since      year they started in this field; years of experience are worked out from it
     barSince   year of admission to the bar
     photo      path to a portrait, e.g. 'img/lawyers/velcheva.jpg' (4:5 works best).
                Leave '' to show the monogram placeholder.
     languages  ISO codes: 'bg', 'en', 'de', 'ru', 'fr' …

   SAMPLE CONTENT: every person below is fictional, and the area guides are sample
   texts that the firm's lawyers should review before the site goes live.
   ============================================================================= */

window.SITE_CONTENT = {
  areas: [
    /* ------------------------------------------------------------------ FAMILY */
    {
      id: 'family',
      slug: 'family-law',
      icon: 'users-round',
      title: { en: 'Family & Inheritance', bg: 'Семейно и наследствено право', de: 'Familien- und Erbrecht' },
      short: { en: 'Family', bg: 'Семейно', de: 'Familie' },
      summary: {
        en: 'Divorce, children and family property, handled with discretion and a clear plan. Also wills and inheritance disputes.',
        bg: 'Развод, деца и семейно имущество – с дискретност и ясен план. Също завещания и наследствени спорове.',
        de: 'Scheidung, Kinder und Familienvermögen – diskret und mit klarem Plan. Dazu Testamente und Erbstreitigkeiten.',
      },
      intro: {
        en: 'Divorce, children and inheritance are some of the most personal matters a lawyer handles. We help you understand your rights, look for an agreement first and protect your interests in court when there is no other way.',
        bg: 'Разводът, децата и наследството са сред най-личните въпроси, с които работи един адвокат. Помагаме ви да разберете правата си, първо търсим споразумение и защитаваме интересите ви в съда, когато няма друг път.',
        de: 'Scheidung, Kinder und Erbschaften gehören zu den persönlichsten Angelegenheiten, die eine Kanzlei betreut. Wir helfen Ihnen, Ihre Rechte zu verstehen, suchen zuerst eine Einigung und vertreten Ihre Interessen vor Gericht, wenn es keinen anderen Weg gibt.',
      },
      facts: [
        {
          value: { en: '¼', bg: '¼', de: '¼' },
          label: { en: 'of the minimum wage is the legal minimum maintenance for one child', bg: 'от минималната работна заплата е законовият минимум на издръжката за едно дете', de: 'des Mindestlohns beträgt der gesetzliche Mindestunterhalt für ein Kind' },
          note: {
            en: 'The court can award more, depending on the child’s needs and the paying parent’s means.',
            bg: 'Съдът може да присъди повече според нуждите на детето и възможностите на родителя, който плаща.',
            de: 'Das Gericht kann je nach Bedarf des Kindes und Leistungsfähigkeit des zahlenden Elternteils mehr zusprechen.',
          },
        },
        {
          value: { en: '3 months', bg: '3 месеца', de: '3 Monate' },
          label: { en: 'to accept an inheritance under inventory', bg: 'за приемане на наследство по опис', de: 'für die Erbannahme mit Bestandsverzeichnis' },
          note: {
            en: 'This limits your liability for the deceased’s debts to what you inherit. The deadline runs from when you learn of the inheritance.',
            bg: 'Така отговаряте за дълговете на починалия само до размера на наследеното. Срокът тече от деня, в който сте узнали за наследството.',
            de: 'So haften Sie für Schulden der verstorbenen Person nur bis zur Höhe des Erbes. Die Frist läuft ab dem Tag, an dem Sie vom Erbfall erfahren.',
          },
        },
        {
          value: { en: '1', bg: '1', de: '1' },
          label: { en: 'court hearing is usually enough for a divorce by mutual consent', bg: 'съдебно заседание обикновено е достатъчно за развод по взаимно съгласие', de: 'Gerichtstermin genügt meist für eine einvernehmliche Scheidung' },
          note: {
            en: 'Both spouses attend in person, and the court approves your agreement on the children, the home and property.',
            bg: 'Двамата съпрузи се явяват лично, а съдът утвърждава споразумението ви за децата, жилището и имуществото.',
            de: 'Beide Ehegatten erscheinen persönlich, und das Gericht bestätigt Ihre Vereinbarung zu Kindern, Wohnung und Vermögen.',
          },
        },
      ],
      situations: [
        {
          title: { en: 'We both want a divorce', bg: 'И двамата искаме развод', de: 'Wir wollen uns beide scheiden lassen' },
          text: {
            en: 'If you agree on everything, a divorce by mutual consent is the fastest route. We draft the agreement on children, maintenance, the family home and property so the court can approve it.',
            bg: 'Ако сте съгласни за всичко, разводът по взаимно съгласие е най-бързият път. Изготвяме споразумението за децата, издръжката, семейното жилище и имуществото, за да може съдът да го утвърди.',
            de: 'Wenn Sie sich in allem einig sind, ist die einvernehmliche Scheidung der schnellste Weg. Wir entwerfen die Vereinbarung zu Kindern, Unterhalt, Familienwohnung und Vermögen, damit das Gericht sie bestätigen kann.',
          },
        },
        {
          title: { en: 'We can’t agree', bg: 'Не можем да се споразумеем', de: 'Wir können uns nicht einigen' },
          text: {
            en: 'When agreement isn’t possible, the court decides on the divorce and its consequences. We prepare your case, collect the evidence and represent you at every hearing.',
            bg: 'Когато споразумение не е възможно, съдът решава за развода и последиците от него. Подготвяме делото ви, събираме доказателствата и ви представляваме във всяко заседание.',
            de: 'Ist keine Einigung möglich, entscheidet das Gericht über die Scheidung und ihre Folgen. Wir bereiten Ihren Fall vor, sammeln die Beweise und vertreten Sie in jedem Termin.',
          },
        },
        {
          title: { en: 'Children, contact and maintenance', bg: 'Деца, лични отношения и издръжка', de: 'Kinder, Umgang und Unterhalt' },
          text: {
            en: 'Who the child lives with, how often they see the other parent and how much maintenance is paid can be agreed or decided by the court, and changed later if circumstances change.',
            bg: 'При кого живее детето, колко често вижда другия родител и каква издръжка се плаща може да се договори или да се реши от съда, а при промяна на обстоятелствата – да се промени.',
            de: 'Bei wem das Kind lebt, wie oft es den anderen Elternteil sieht und wie viel Unterhalt gezahlt wird, kann vereinbart oder vom Gericht entschieden und bei veränderten Umständen angepasst werden.',
          },
        },
        {
          title: { en: 'A relative has died', bg: 'Почина близък човек', de: 'Ein Angehöriger ist verstorben' },
          text: {
            en: 'We explain who inherits, whether to accept or renounce the inheritance, how to deal with debts and how to divide property between heirs, including disputes over the forced share.',
            bg: 'Обясняваме кой наследява, дали да приемете наследството или да се откажете от него, какво да правите с дълговете и как да се раздели имуществото между наследниците, включително при спорове за запазена част.',
            de: 'Wir erklären, wer erbt, ob Sie das Erbe annehmen oder ausschlagen sollten, wie mit Schulden umzugehen ist und wie das Vermögen unter den Erben aufgeteilt wird – auch bei Streit um den Pflichtteil.',
          },
        },
      ],
      steps: {
        en: ['Write down the key dates: marriage, separation, the children’s birth dates or the date of death.', 'Don’t sign any agreement or move assets before you have spoken to a lawyer.', 'If there are children, think about which day-to-day arrangement would work best for them.', 'Book the free consultation, and we will tell you which route fits and what it costs.'],
        bg: ['Запишете важните дати: сключване на брака, раздяла, рождените дати на децата или датата на смъртта.', 'Не подписвайте споразумения и не прехвърляйте имущество, преди да сте говорили с адвокат.', 'Ако имате деца, помислете какво ежедневно разпределение би било най-добро за тях.', 'Запазете безплатната консултация – ще ви кажем кой път е подходящ и колко ще струва.'],
        de: ['Notieren Sie die wichtigsten Daten: Heirat, Trennung, Geburtsdaten der Kinder oder das Todesdatum.', 'Unterschreiben Sie keine Vereinbarung und übertragen Sie kein Vermögen, bevor Sie mit einer Anwältin oder einem Anwalt gesprochen haben.', 'Wenn Kinder betroffen sind, überlegen Sie, welche Regelung im Alltag am besten für sie wäre.', 'Buchen Sie die kostenlose Erstberatung – wir sagen Ihnen, welcher Weg passt und was er kostet.'],
      },
      documents: {
        en: ['Marriage certificate', 'The children’s birth certificates', 'Notary deeds for the home and other property', 'Proof of income for both parents', 'For an inheritance: death certificate, certificate of heirs and any will'],
        bg: ['Удостоверение за сключен граждански брак', 'Удостоверения за раждане на децата', 'Нотариални актове за жилището и другите имоти', 'Документи за доходите на двамата родители', 'При наследство: препис от акта за смърт, удостоверение за наследници и завещание, ако има'],
        de: ['Heiratsurkunde', 'Geburtsurkunden der Kinder', 'Notarielle Urkunden zur Wohnung und zu weiterem Vermögen', 'Einkommensnachweise beider Elternteile', 'Bei einer Erbschaft: Sterbeurkunde, Erbenbescheinigung und ein vorhandenes Testament'],
      },
      faq: [
        {
          q: { en: 'How long does a divorce by mutual consent take?', bg: 'Колко време отнема разводът по взаимно съгласие?', de: 'Wie lange dauert eine einvernehmliche Scheidung?' },
          a: {
            en: 'It depends on the court’s schedule, but the case is usually decided at a single hearing once the agreement is ready. A clear agreement prepared in advance is what saves the most time.',
            bg: 'Зависи от графика на съда, но делото обикновено приключва в едно заседание, след като споразумението е готово. Най-много време спестява ясното споразумение, подготвено предварително.',
            de: 'Das hängt vom Terminkalender des Gerichts ab, doch meist wird in einem einzigen Termin entschieden, sobald die Vereinbarung steht. Am meisten Zeit spart eine klare, vorab vorbereitete Vereinbarung.',
          },
        },
        {
          q: { en: 'Do we both have to go to court?', bg: 'Трябва ли и двамата да се явим в съда?', de: 'Müssen wir beide vor Gericht erscheinen?' },
          a: {
            en: 'Yes. In a divorce by mutual consent both spouses must attend the hearing in person, so the court can confirm that the decision is genuine. Your lawyer prepares you and comes with you.',
            bg: 'Да. При развод по взаимно съгласие двамата съпрузи трябва да се явят лично, за да се увери съдът, че решението им е сериозно. Адвокатът ви подготвя и идва с вас.',
            de: 'Ja. Bei einer einvernehmlichen Scheidung müssen beide Ehegatten persönlich erscheinen, damit sich das Gericht vom ernsthaften Entschluss überzeugen kann. Ihre Anwältin oder Ihr Anwalt bereitet Sie vor und begleitet Sie.',
          },
        },
        {
          q: { en: 'How is child maintenance calculated?', bg: 'Как се определя издръжката на детето?', de: 'Wie wird der Kindesunterhalt berechnet?' },
          a: {
            en: 'The court looks at the child’s needs and the paying parent’s means. The law sets a minimum of one quarter of the national minimum wage per child, and the amount can be changed later if circumstances change.',
            bg: 'Съдът преценява нуждите на детето и възможностите на родителя, който плаща. Законът определя минимум от една четвърт от минималната работна заплата за дете, а размерът може да се промени при промяна на обстоятелствата.',
            de: 'Das Gericht berücksichtigt den Bedarf des Kindes und die Möglichkeiten des zahlenden Elternteils. Gesetzlich gilt ein Mindestbetrag von einem Viertel des Mindestlohns pro Kind, und der Betrag kann bei veränderten Umständen angepasst werden.',
          },
        },
        {
          q: { en: 'Can I refuse an inheritance that comes with debts?', bg: 'Мога ли да се откажа от наследство, което е с дългове?', de: 'Kann ich ein Erbe mit Schulden ausschlagen?' },
          a: {
            en: 'Yes. You can renounce it with a written statement to the district court, or accept it under inventory so that you answer for debts only up to the value of what you inherit. Get advice early, because accepting under inventory has a three-month deadline.',
            bg: 'Да. Можете да се откажете с писмено заявление до районния съд или да приемете наследството по опис, така че да отговаряте за дълговете само до стойността на наследеното. Потърсете съвет рано, защото за приемането по опис има тримесечен срок.',
            de: 'Ja. Sie können es mit einer schriftlichen Erklärung gegenüber dem Bezirksgericht ausschlagen oder mit Bestandsverzeichnis annehmen, sodass Sie für Schulden nur bis zur Höhe des Erbes haften. Lassen Sie sich früh beraten, denn für die Annahme mit Bestandsverzeichnis gilt eine Frist von drei Monaten.',
          },
        },
        {
          q: { en: 'What is the forced share?', bg: 'Какво е запазена част?', de: 'Was ist der Pflichtteil?' },
          a: {
            en: 'Close family members, such as children, a spouse and in some cases parents, are entitled to a protected part of the estate. If a will or gifts leave them less, they can ask the court to restore their share.',
            bg: 'Най-близките роднини – децата, съпругът, а в някои случаи и родителите – имат право на защитена част от наследството. Ако завещание или дарения им оставят по-малко, те могат да поискат от съда да възстанови тази част.',
            de: 'Nahe Angehörige wie Kinder, Ehegatten und in manchen Fällen Eltern haben Anspruch auf einen geschützten Teil des Nachlasses. Werden sie durch ein Testament oder Schenkungen benachteiligt, können sie verlangen, dass das Gericht ihren Anteil wiederherstellt.',
          },
        },
      ],
    },

    /* ---------------------------------------------------------------- CRIMINAL */
    {
      id: 'criminal',
      slug: 'criminal-defence',
      icon: 'shield',
      title: { en: 'Criminal Defence', bg: 'Наказателна защита', de: 'Strafverteidigung' },
      short: { en: 'Criminal', bg: 'Наказателно', de: 'Strafrecht' },
      summary: {
        en: 'Defence from the first police contact to the final appeal, and representation for victims of crime.',
        bg: 'Защита от първия контакт с полицията до последната инстанция, както и представителство на пострадали.',
        de: 'Verteidigung vom ersten Polizeikontakt bis zur letzten Instanz, dazu die Vertretung von Geschädigten.',
      },
      intro: {
        en: 'Whether you have been detained, summoned for questioning or charged, the first hours and the first statements often decide the case. We act fast, explain your rights in plain words and stay with you from the investigation to the final appeal.',
        bg: 'Независимо дали сте задържани, призовани за разпит или ви е повдигнато обвинение, първите часове и първите обяснения често решават делото. Действаме бързо, обясняваме правата ви на разбираем език и сме до вас от разследването до последната инстанция.',
        de: 'Ob Sie festgenommen, zur Vernehmung geladen oder beschuldigt wurden: Die ersten Stunden und die ersten Aussagen entscheiden oft über den Fall. Wir handeln schnell, erklären Ihre Rechte verständlich und stehen Ihnen von den Ermittlungen bis zur letzten Instanz zur Seite.',
      },
      urgent: {
        title: { en: 'Has someone just been detained?', bg: 'Някой е задържан точно сега?', de: 'Wurde gerade jemand festgenommen?' },
        text: {
          en: 'Call us straight away. Everyone has the right to a lawyer from the moment of detention, and can ask to speak to one before giving any explanations.',
          bg: 'Обадете ни се веднага. Всеки има право на адвокат от момента на задържането си и може да поиска да говори с адвокат, преди да дава каквито и да е обяснения.',
          de: 'Rufen Sie uns sofort an. Jeder hat ab dem Moment der Festnahme das Recht auf anwaltlichen Beistand und kann verlangen, vor jeder Aussage mit seinem Anwalt zu sprechen.',
        },
      },
      facts: [
        {
          value: { en: '24 h', bg: '24 ч.', de: '24 Std.' },
          label: { en: 'maximum police detention', bg: 'е максималното полицейско задържане', de: 'dauert der Polizeigewahrsam höchstens' },
          note: {
            en: 'Only a prosecutor can order a longer detention, to bring the person before a court.',
            bg: 'Само прокурор може да разпореди по-дълго задържане, за да осигури явяването пред съда.',
            de: 'Nur die Staatsanwaltschaft kann eine längere Festnahme anordnen, um die Person einem Gericht vorzuführen.',
          },
        },
        {
          value: { en: '72 h', bg: '72 ч.', de: '72 Std.' },
          label: { en: 'maximum detention ordered by a prosecutor', bg: 'е максималното задържане, разпоредено от прокурор', de: 'darf die Staatsanwaltschaft höchstens festhalten lassen' },
          note: {
            en: 'After that, only a court can order the person to stay in custody.',
            bg: 'След това само съдът може да остави лицето в ареста.',
            de: 'Danach kann nur ein Gericht Untersuchungshaft anordnen.',
          },
        },
        {
          value: { en: '1.2‰', bg: '1,2 ‰', de: '1,2 ‰' },
          label: { en: 'blood alcohol: above this, drink-driving is a crime', bg: 'алкохол в кръвта – над тази граница шофирането е престъпление', de: 'Blutalkohol – darüber ist Trunkenheit am Steuer eine Straftat' },
          note: {
            en: 'Between 0.5‰ and 1.2‰ it is an administrative offence with a fine and a driving ban.',
            bg: 'Между 0,5 ‰ и 1,2 ‰ е административно нарушение с глоба и лишаване от право да управлявате МПС.',
            de: 'Zwischen 0,5 ‰ und 1,2 ‰ handelt es sich um eine Ordnungswidrigkeit mit Geldbuße und Fahrverbot.',
          },
        },
      ],
      situations: [
        {
          title: { en: 'Summoned for questioning', bg: 'Призовка за разпит', de: 'Vorladung zur Vernehmung' },
          text: {
            en: 'A summons from the police or the investigator can be for a witness or a suspect. We find out your role, prepare you and can attend with you.',
            bg: 'Призовката от полицията или разследващия може да е като свидетел или като заподозрян. Изясняваме каква е ролята ви, подготвяме ви и можем да присъстваме с вас.',
            de: 'Eine Vorladung der Polizei oder der Ermittler kann Sie als Zeugen oder als Verdächtigen betreffen. Wir klären Ihre Rolle, bereiten Sie vor und können Sie begleiten.',
          },
        },
        {
          title: { en: 'Charged with a crime', bg: 'Повдигнато обвинение', de: 'Beschuldigt einer Straftat' },
          text: {
            en: 'Once you are charged, you have the right to know what you are accused of and on what evidence, to give or refuse explanations and to present evidence of your own. We build the defence from the first day.',
            bg: 'След като ви е повдигнато обвинение, имате право да научите в какво сте обвинени и въз основа на какви доказателства, да давате или да откажете да давате обяснения и да представяте доказателства. Изграждаме защитата от първия ден.',
            de: 'Als Beschuldigter haben Sie das Recht zu erfahren, was Ihnen vorgeworfen wird und auf welche Beweise sich der Vorwurf stützt, Angaben zu machen oder zu verweigern und eigene Beweise vorzulegen. Wir bauen Ihre Verteidigung vom ersten Tag an auf.',
          },
        },
        {
          title: { en: 'Traffic offences and drink-driving', bg: 'Пътни нарушения и алкохол', de: 'Verkehrsdelikte und Alkohol am Steuer' },
          text: {
            en: 'From speeding fines to accidents with injuries and driving over the alcohol limit, we challenge penalty decisions and defend you in court.',
            bg: 'От глоби за превишена скорост до катастрофи с пострадали и шофиране над допустимия алкохол – обжалваме наказателни постановления и ви защитаваме в съда.',
            de: 'Von Bußgeldern wegen zu hoher Geschwindigkeit bis zu Unfällen mit Verletzten und Fahrten über der Promillegrenze: Wir fechten Bußgeldbescheide an und verteidigen Sie vor Gericht.',
          },
        },
        {
          title: { en: 'You are the victim', bg: 'Вие сте пострадалият', de: 'Sie wurden Opfer einer Straftat' },
          text: {
            en: 'Victims can take part in the criminal case as a private prosecutor and claim compensation as a civil claimant. We represent you and make sure your voice is heard.',
            bg: 'Пострадалите могат да участват в наказателното дело като частен обвинител и да търсят обезщетение като граждански ищец. Представляваме ви и се грижим гласът ви да бъде чут.',
            de: 'Geschädigte können sich am Strafverfahren als Privatankläger beteiligen und als Zivilkläger Schadensersatz verlangen. Wir vertreten Sie und sorgen dafür, dass Ihre Stimme gehört wird.',
          },
        },
      ],
      steps: {
        en: ['If someone has been detained, find out where they are held and call us straight away.', 'Ask to speak to a lawyer before you give explanations or sign anything.', 'Write down what happened while it is fresh: times, places and the people present.', 'Keep every document you receive, such as summonses, records and penalty notices.'],
        bg: ['Ако някой е задържан, разберете къде е задържан и ни се обадете веднага.', 'Поискайте да говорите с адвокат, преди да давате обяснения или да подписвате каквото и да е.', 'Запишете случилото се, докато е свежо в паметта: часове, места и присъстващи хора.', 'Пазете всеки получен документ – призовки, протоколи, наказателни постановления.'],
        de: ['Wurde jemand festgenommen, finden Sie heraus, wo er festgehalten wird, und rufen Sie uns sofort an.', 'Verlangen Sie, mit einer Anwältin oder einem Anwalt zu sprechen, bevor Sie Angaben machen oder etwas unterschreiben.', 'Schreiben Sie auf, was passiert ist, solange die Erinnerung frisch ist: Uhrzeiten, Orte und anwesende Personen.', 'Bewahren Sie jedes Schriftstück auf, etwa Vorladungen, Protokolle und Bußgeldbescheide.'],
      },
      documents: {
        en: ['Summonses or letters from the police, investigator or prosecutor', 'Records and protocols you were given', 'The decree of charges, if you have one', 'Penalty notices for traffic offences', 'Medical records and photos, if you were injured'],
        bg: ['Призовки или писма от полицията, разследващия или прокуратурата', 'Протоколи и документи, които сте получили', 'Постановление за привличане като обвиняем, ако имате такова', 'Наказателни постановления за пътни нарушения', 'Медицински документи и снимки, ако сте пострадали'],
        de: ['Vorladungen oder Schreiben von Polizei, Ermittlern oder Staatsanwaltschaft', 'Protokolle und Unterlagen, die Sie erhalten haben', 'Die Beschuldigungsverfügung, falls vorhanden', 'Bußgeldbescheide bei Verkehrsdelikten', 'Ärztliche Unterlagen und Fotos, falls Sie verletzt wurden'],
      },
      faq: [
        {
          q: { en: 'Do I have to answer police questions?', bg: 'Длъжен ли съм да отговарям на въпросите на полицията?', de: 'Muss ich Fragen der Polizei beantworten?' },
          a: {
            en: 'If you are accused, you have the right to give or refuse explanations, and anything you say can be used as evidence, so ask for a lawyer first. Witnesses generally have a duty to testify, with some exceptions, so check your role before you speak.',
            bg: 'Като обвиняем имате право да давате или да откажете да давате обяснения, а казаното може да бъде използвано като доказателство – затова първо поискайте адвокат. Свидетелите по принцип са длъжни да дават показания, с някои изключения, затова първо изяснете в какво качество сте призовани.',
            de: 'Als Beschuldigter dürfen Sie Angaben machen oder verweigern, und alles, was Sie sagen, kann als Beweis verwendet werden – verlangen Sie daher zuerst einen Anwalt. Zeugen sind grundsätzlich zur Aussage verpflichtet, mit einigen Ausnahmen; klären Sie deshalb zuerst Ihre Rolle.',
          },
        },
        {
          q: { en: 'Can I see the case file?', bg: 'Мога ли да се запозная с делото?', de: 'Kann ich die Akte einsehen?' },
          a: {
            en: 'During the investigation, access is limited. When the investigation ends, the accused and their lawyer can ask to see all the evidence collected, and then make requests and objections.',
            bg: 'По време на разследването достъпът е ограничен. Когато разследването приключи, обвиняемият и защитникът му могат да поискат да се запознаят с всички събрани доказателства и след това да направят искания и възражения.',
            de: 'Während der Ermittlungen ist der Zugang eingeschränkt. Nach ihrem Abschluss können der Beschuldigte und sein Verteidiger verlangen, alle gesammelten Beweise einzusehen, und danach Anträge und Einwände vorbringen.',
          },
        },
        {
          q: { en: 'What happens after a drink-driving test?', bg: 'Какво следва след проба за алкохол?', de: 'Was passiert nach einem Alkoholtest?' },
          a: {
            en: 'Below 0.5‰ there is no offence. Between 0.5‰ and 1.2‰ it is an administrative offence with a fine and a driving ban. Above 1.2‰ it is a crime. If you dispute the breathalyser result, you can ask for a blood test.',
            bg: 'Под 0,5 ‰ няма нарушение. Между 0,5 ‰ и 1,2 ‰ е административно нарушение с глоба и лишаване от право да управлявате МПС. Над 1,2 ‰ е престъпление. Ако оспорвате резултата от техническото средство, можете да поискате кръвна проба.',
            de: 'Unter 0,5 ‰ liegt kein Verstoß vor. Zwischen 0,5 ‰ und 1,2 ‰ ist es eine Ordnungswidrigkeit mit Geldbuße und Fahrverbot. Über 1,2 ‰ ist es eine Straftat. Wenn Sie das Ergebnis des Atemtests bestreiten, können Sie eine Blutprobe verlangen.',
          },
        },
        {
          q: { en: 'How long does a criminal case take?', bg: 'Колко продължава едно наказателно дело?', de: 'Wie lange dauert ein Strafverfahren?' },
          a: {
            en: 'It varies widely. A simple case can end within months, while complex investigations can take years. We tell you what to expect at each stage and push for the case to move forward.',
            bg: 'Много различно. Простите дела могат да приключат за месеци, а сложните разследвания да продължат години. Казваме ви какво да очаквате на всеки етап и настояваме делото да се движи.',
            de: 'Das ist sehr unterschiedlich. Einfache Fälle können in wenigen Monaten abgeschlossen sein, komplexe Ermittlungen dauern mitunter Jahre. Wir sagen Ihnen, was Sie in jeder Phase erwartet, und drängen auf Fortschritte.',
          },
        },
        {
          q: { en: 'Can a criminal case end without a trial?', bg: 'Може ли наказателно дело да приключи без процес?', de: 'Kann ein Strafverfahren ohne Hauptverhandlung enden?' },
          a: {
            en: 'Sometimes. Depending on the offence, a case can end with an agreement with the prosecutor approved by the court, or be closed if the evidence is insufficient. We assess these options with you.',
            bg: 'Понякога. В зависимост от престъплението делото може да приключи със споразумение с прокурора, одобрено от съда, или да бъде прекратено при недостатъчно доказателства. Преценяваме тези възможности заедно с вас.',
            de: 'Manchmal. Je nach Delikt kann das Verfahren mit einer vom Gericht bestätigten Vereinbarung mit der Staatsanwaltschaft enden oder bei unzureichenden Beweisen eingestellt werden. Wir prüfen diese Möglichkeiten gemeinsam mit Ihnen.',
          },
        },
      ],
    },

    /* ---------------------------------------------------------------- PROPERTY */
    {
      id: 'property',
      slug: 'real-estate',
      icon: 'house',
      title: { en: 'Real Estate & Property', bg: 'Имоти и вещно право', de: 'Immobilien- und Sachenrecht' },
      short: { en: 'Property', bg: 'Имоти', de: 'Immobilien' },
      summary: {
        en: 'Safe property purchases, and firm representation when ownership is disputed.',
        bg: 'Сигурни сделки с имоти и твърда защита, когато собствеността е спорна.',
        de: 'Sichere Immobiliengeschäfte und konsequente Vertretung, wenn das Eigentum strittig ist.',
      },
      intro: {
        en: 'A property is usually the biggest purchase of a lifetime, and a mistake in the paperwork can cost years. We check the property before you commit, draft and review the contracts and stand by you when ownership, a lease or co-ownership turns into a dispute.',
        bg: 'Имотът обикновено е най-голямата покупка в живота, а грешка в документите може да струва години. Проверяваме имота, преди да се обвържете, изготвяме и преглеждаме договорите и сме до вас, когато собствеността, наемът или съсобствеността прерасне в спор.',
        de: 'Eine Immobilie ist meist die größte Anschaffung des Lebens, und ein Fehler in den Unterlagen kann Jahre kosten. Wir prüfen die Immobilie, bevor Sie sich binden, entwerfen und prüfen die Verträge und stehen Ihnen bei, wenn Eigentum, Miete oder Miteigentum zum Streitfall werden.',
      },
      facts: [
        {
          value: { en: '0.1–3%', bg: '0,1–3%', de: '0,1–3 %' },
          label: { en: 'local transfer tax on a purchase', bg: 'местен данък при покупка на имот', de: 'kommunale Grunderwerbsteuer beim Kauf' },
          note: {
            en: 'Each municipality sets its own rate within this range. It is paid before the notary deed is signed.',
            bg: 'Всяка община определя размера в тези граници. Плаща се, преди сделката да бъде изповядана при нотариуса.',
            de: 'Jede Gemeinde legt den Satz in diesem Rahmen fest. Er wird vor der Beurkundung beim Notar gezahlt.',
          },
        },
        {
          value: { en: '10 years', bg: '10 години', de: '10 Jahre' },
          label: { en: 'of open, uninterrupted possession can make you the owner', bg: 'явно и непрекъснато владение може да ви направи собственик', de: 'offener, ununterbrochener Besitz können Sie zum Eigentümer machen' },
          note: {
            en: 'Five years are enough if you possessed it in good faith, under a title you believed was valid.',
            bg: 'Пет години са достатъчни, ако владеете добросъвестно, на основание, за което сте смятали, че ви прави собственик.',
            de: 'Fünf Jahre genügen, wenn Sie gutgläubig besessen haben, auf einer Grundlage, die Sie für gültig hielten.',
          },
        },
        {
          value: { en: 'EU', bg: 'ЕС', de: 'EU' },
          label: { en: 'citizens can buy land in Bulgaria', bg: 'гражданите могат да купуват земя в България', de: 'Bürgerinnen und Bürger können in Bulgarien Grundstücke kaufen' },
          note: {
            en: 'Non-EU citizens can own apartments and buildings, but in most cases not the land itself.',
            bg: 'Гражданите извън ЕС могат да притежават апартаменти и сгради, но в повечето случаи не и самата земя.',
            de: 'Nicht-EU-Bürger können Wohnungen und Gebäude besitzen, in den meisten Fällen aber nicht das Grundstück selbst.',
          },
        },
      ],
      situations: [
        {
          title: { en: 'Buying a home', bg: 'Купувате жилище', de: 'Sie kaufen eine Wohnung oder ein Haus' },
          text: {
            en: 'We check the title, encumbrances and permits, negotiate the preliminary contract and attend the notary appointment, so you know exactly what you are signing.',
            bg: 'Проверяваме собствеността, тежестите и разрешенията, договаряме предварителния договор и присъстваме при нотариуса, за да знаете точно какво подписвате.',
            de: 'Wir prüfen Eigentum, Belastungen und Genehmigungen, verhandeln den Vorvertrag und begleiten Sie zum Notar, damit Sie genau wissen, was Sie unterschreiben.',
          },
        },
        {
          title: { en: 'Buying off-plan', bg: 'Купувате „на зелено“', de: 'Kauf vom Bauträger' },
          text: {
            en: 'With a new build, the risk lies with the developer and the permits. We check the building permit, the developer’s rights to the land and the payment schedule before you pay.',
            bg: 'При новото строителство рискът е в инвеститора и разрешенията. Проверяваме разрешението за строеж, правата на инвеститора върху земята и графика на плащанията, преди да платите.',
            de: 'Beim Neubau liegt das Risiko beim Bauträger und bei den Genehmigungen. Wir prüfen Baugenehmigung, die Rechte des Bauträgers am Grundstück und den Zahlungsplan, bevor Sie zahlen.',
          },
        },
        {
          title: { en: 'Co-owners can’t agree', bg: 'Съсобствениците не могат да се разберат', de: 'Miteigentümer sind sich uneinig' },
          text: {
            en: 'Inherited or shared property often leads to deadlock. We negotiate a buy-out or division, and if needed ask the court to divide the property or order its sale.',
            bg: 'Наследените или общите имоти често водят до задънена улица. Договаряме изкупуване или разпределяне, а при нужда искаме от съда да извърши делба или да изнесе имота на публична продан.',
            de: 'Geerbte oder gemeinsame Immobilien führen oft in eine Sackgasse. Wir verhandeln eine Auszahlung oder Aufteilung und beantragen notfalls die gerichtliche Teilung oder Versteigerung.',
          },
        },
        {
          title: { en: 'Problems with a tenant or landlord', bg: 'Проблеми с наемател или наемодател', de: 'Ärger mit Mieter oder Vermieter' },
          text: {
            en: 'Unpaid rent, a deposit that isn’t returned or a tenant who won’t leave. We draft clear leases and act quickly when they are broken.',
            bg: 'Неплатен наем, невърнат депозит или наемател, който отказва да напусне. Изготвяме ясни договори за наем и действаме бързо, когато бъдат нарушени.',
            de: 'Unbezahlte Miete, eine nicht zurückgezahlte Kaution oder ein Mieter, der nicht auszieht: Wir entwerfen klare Mietverträge und handeln schnell, wenn sie verletzt werden.',
          },
        },
      ],
      steps: {
        en: ['Don’t pay a deposit before the property has been checked.', 'Ask the seller for the title deed, a sketch from the cadastre and the tax assessment.', 'For a new build, ask for the building permit, and for a finished building, the Act 16 and the permit of use.', 'Book the free consultation before you sign the preliminary contract.'],
        bg: ['Не плащайте капаро, преди имотът да бъде проверен.', 'Поискайте от продавача нотариалния акт, скица от кадастъра и удостоверение за данъчна оценка.', 'За ново строителство поискайте разрешението за строеж, а за завършена сграда – Акт 16 и разрешението за ползване.', 'Запазете безплатната консултация, преди да подпишете предварителен договор.'],
        de: ['Zahlen Sie keine Anzahlung, bevor die Immobilie geprüft wurde.', 'Verlangen Sie vom Verkäufer die notarielle Eigentumsurkunde, eine Kataster-Skizze und die Steuerbewertung.', 'Verlangen Sie beim Neubau die Baugenehmigung und bei einem fertigen Gebäude den „Akt 16“ und die Nutzungsgenehmigung.', 'Buchen Sie die kostenlose Erstberatung, bevor Sie den Vorvertrag unterschreiben.'],
      },
      documents: {
        en: ['Notary deed or another title document', 'Sketch or diagram from the cadastre', 'Tax assessment from the municipality', 'The preliminary contract, if there is one', 'Lease and payment records for rental disputes'],
        bg: ['Нотариален акт или друг документ за собственост', 'Скица или схема от кадастъра', 'Удостоверение за данъчна оценка от общината', 'Предварителният договор, ако има такъв', 'Договор за наем и документи за плащанията при спорове за наем'],
        de: ['Notarielle Urkunde oder anderer Eigentumsnachweis', 'Skizze oder Schema aus dem Kataster', 'Steuerbewertung der Gemeinde', 'Den Vorvertrag, falls vorhanden', 'Mietvertrag und Zahlungsbelege bei Mietstreitigkeiten'],
      },
      faq: [
        {
          q: { en: 'When do I become the owner?', bg: 'Кога ставам собственик?', de: 'Wann werde ich Eigentümer?' },
          a: {
            en: 'Ownership passes when the notary deed is signed, not when you sign the preliminary contract or pay the deposit. The deed is then entered in the Property Register.',
            bg: 'Собствеността преминава с подписването на нотариалния акт, а не с предварителния договор или плащането на капаро. След това актът се вписва в Имотния регистър.',
            de: 'Das Eigentum geht mit der Unterzeichnung der notariellen Urkunde über, nicht mit dem Vorvertrag oder der Anzahlung. Danach wird die Urkunde im Immobilienregister eingetragen.',
          },
        },
        {
          q: { en: 'What if the seller backs out after the preliminary contract?', bg: 'Какво става, ако продавачът се откаже след предварителния договор?', de: 'Was ist, wenn der Verkäufer nach dem Vorvertrag abspringt?' },
          a: {
            en: 'If the preliminary contract is in writing and contains the essential terms, you can ask the court to declare it final, which makes you the owner. Depending on the contract, you may also claim the deposit.',
            bg: 'Ако предварителният договор е писмен и съдържа съществените условия, можете да поискате от съда да го обяви за окончателен, което ви прави собственик. В зависимост от договора може да търсите и капарото.',
            de: 'Ist der Vorvertrag schriftlich und enthält die wesentlichen Bedingungen, können Sie beim Gericht beantragen, ihn für endgültig zu erklären, wodurch Sie Eigentümer werden. Je nach Vertrag können Sie auch die Anzahlung zurückverlangen.',
          },
        },
        {
          q: { en: 'Can a foreigner buy property in Bulgaria?', bg: 'Може ли чужденец да купи имот в България?', de: 'Können Ausländer in Bulgarien Immobilien kaufen?' },
          a: {
            en: 'EU citizens can buy apartments, houses and land on the same terms as Bulgarians. Non-EU citizens can buy apartments and buildings, and usually acquire land through a Bulgarian company.',
            bg: 'Гражданите на ЕС могат да купуват апартаменти, къщи и земя при същите условия като българите. Гражданите извън ЕС могат да купуват апартаменти и сгради, а земя обикновено придобиват чрез българско дружество.',
            de: 'EU-Bürger können Wohnungen, Häuser und Grundstücke zu denselben Bedingungen wie Bulgaren kaufen. Nicht-EU-Bürger können Wohnungen und Gebäude kaufen und erwerben Grundstücke in der Regel über eine bulgarische Gesellschaft.',
          },
        },
        {
          q: { en: 'What costs come on top of the price?', bg: 'Какви разходи има освен цената?', de: 'Welche Kosten kommen zum Kaufpreis hinzu?' },
          a: {
            en: 'Usually the notary fee, the local transfer tax, the registration fee and, if you use one, the agent’s commission. We give you an estimate before you sign.',
            bg: 'Обикновено нотариалната такса, местният данък при придобиване, таксата за вписване и, ако ползвате посредник, неговата комисиона. Даваме ви ориентировъчна сметка, преди да подпишете.',
            de: 'In der Regel die Notargebühr, die kommunale Grunderwerbsteuer, die Eintragungsgebühr und gegebenenfalls die Maklerprovision. Wir nennen Ihnen vorab eine Schätzung.',
          },
        },
        {
          q: { en: 'Can a tenant be evicted quickly?', bg: 'Може ли наемател да бъде изведен бързо?', de: 'Kann ein Mieter schnell geräumt werden?' },
          a: {
            en: 'Not without the proper steps. The lease usually has to be terminated first, and if the tenant still won’t leave, a court decision is needed before a bailiff can carry out the eviction.',
            bg: 'Не без надлежните стъпки. Обикновено първо трябва да се прекрати договорът, а ако наемателят пак не напусне, е нужно съдебно решение, преди съдебният изпълнител да го изведе.',
            de: 'Nicht ohne die richtigen Schritte. Meist muss zuerst der Mietvertrag beendet werden, und zieht der Mieter dann noch nicht aus, braucht es eine gerichtliche Entscheidung, bevor ein Gerichtsvollzieher räumen kann.',
          },
        },
      ],
    },

    /* -------------------------------------------------------------- EMPLOYMENT */
    {
      id: 'employment',
      slug: 'employment-law',
      icon: 'briefcase-business',
      title: { en: 'Employment Law', bg: 'Трудово право', de: 'Arbeitsrecht' },
      short: { en: 'Employment', bg: 'Трудово', de: 'Arbeitsrecht' },
      summary: {
        en: 'Advice for employees and employers on dismissals, pay and workplace disputes.',
        bg: 'Съвети за служители и работодатели при уволнения, възнаграждения и трудови спорове.',
        de: 'Beratung für Arbeitnehmer und Arbeitgeber zu Kündigung, Vergütung und Konflikten am Arbeitsplatz.',
      },
      intro: {
        en: 'Losing a job, unpaid wages or conflict at work can quickly affect everything else. We advise employees on their rights and employers on doing things correctly, and we move fast, because some employment deadlines are very short.',
        bg: 'Загубата на работа, неизплатените заплати или конфликтът на работното място бързо засягат всичко останало. Съветваме служителите за правата им и работодателите как да действат правилно – и действаме бързо, защото някои срокове в трудовото право са много кратки.',
        de: 'Ein Jobverlust, ausstehender Lohn oder Konflikte am Arbeitsplatz wirken sich schnell auf alles andere aus. Wir beraten Arbeitnehmer zu ihren Rechten und Arbeitgeber zum richtigen Vorgehen – und handeln schnell, denn manche Fristen im Arbeitsrecht sind sehr kurz.',
      },
      facts: [
        {
          value: { en: '2 months', bg: '2 месеца', de: '2 Monate' },
          label: { en: 'to challenge a dismissal in court', bg: 'за оспорване на уволнение в съда', de: 'für eine Klage gegen die Kündigung' },
          note: {
            en: 'Counted from the day you received the dismissal order. Once it has passed, the claim is lost.',
            bg: 'Срокът тече от деня, в който сте получили заповедта за уволнение. Изтече ли, искът се губи.',
            de: 'Gerechnet ab dem Tag, an dem Ihnen die Kündigung zugestellt wurde. Danach ist die Klage ausgeschlossen.',
          },
        },
        {
          value: { en: '6 months', bg: '6 месеца', de: '6 Monate' },
          label: { en: 'of gross pay is the maximum compensation for time out of work', bg: 'брутно възнаграждение е максималното обезщетение за времето без работа', de: 'Bruttolohn ist die höchste Entschädigung für die Zeit ohne Arbeit' },
          note: {
            en: 'Due if the court finds the dismissal unlawful and you were left without work because of it.',
            bg: 'Дължи се, ако съдът признае уволнението за незаконно и сте останали без работа заради него.',
            de: 'Sie steht Ihnen zu, wenn das Gericht die Kündigung für rechtswidrig erklärt und Sie dadurch ohne Arbeit waren.',
          },
        },
        {
          value: { en: '3 years', bg: '3 години', de: '3 Jahre' },
          label: { en: 'to claim unpaid wages and other employment claims', bg: 'за неизплатени заплати и други трудови вземания', de: 'für ausstehenden Lohn und andere Ansprüche aus dem Arbeitsverhältnis' },
          note: {
            en: 'Don’t wait: the sooner you act, the easier it is to prove what you are owed.',
            bg: 'Не чакайте – колкото по-рано действате, толкова по-лесно е да докажете какво ви се дължи.',
            de: 'Warten Sie nicht: Je früher Sie handeln, desto leichter lässt sich belegen, was Ihnen zusteht.',
          },
        },
      ],
      situations: [
        {
          title: { en: 'I’ve been dismissed', bg: 'Уволниха ме', de: 'Mir wurde gekündigt' },
          text: {
            en: 'A dismissal must follow the rules: a valid legal ground, correct notice and, for many grounds, a fair selection. We check the order and can ask the court to cancel it, reinstate you and award compensation.',
            bg: 'Уволнението трябва да спазва правилата: законно основание, правилно предизвестие и при много основания – обективен подбор. Проверяваме заповедта и можем да поискаме от съда да я отмени, да ви възстанови на работа и да ви присъди обезщетение.',
            de: 'Eine Kündigung muss die Regeln einhalten: einen gültigen gesetzlichen Grund, die richtige Frist und bei vielen Gründen eine faire Auswahl. Wir prüfen die Kündigung und können beim Gericht beantragen, sie aufzuheben, Sie wiedereinzustellen und eine Entschädigung zuzusprechen.',
          },
        },
        {
          title: { en: 'My pay is late or missing', bg: 'Заплатата ми закъснява или не е платена', de: 'Mein Lohn kommt zu spät oder gar nicht' },
          text: {
            en: 'Unpaid wages, overtime, unused leave and other compensation can be claimed in court. We start with a formal demand, which often settles the matter.',
            bg: 'Неизплатените заплати, извънредният труд, неизползваният отпуск и другите обезщетения могат да се търсят по съдебен ред. Започваме с официална покана, която често решава въпроса.',
            de: 'Ausstehender Lohn, Überstunden, nicht genommener Urlaub und andere Entschädigungen lassen sich gerichtlich einfordern. Wir beginnen mit einer förmlichen Zahlungsaufforderung, die die Sache oft schon klärt.',
          },
        },
        {
          title: { en: 'Pressure or harassment at work', bg: 'Натиск или тормоз на работното място', de: 'Druck oder Mobbing am Arbeitsplatz' },
          text: {
            en: 'Bullying, discrimination or being pushed to resign are serious. We help you document what happens and choose the right response, from a complaint to a claim.',
            bg: 'Тормозът, дискриминацията или натискът да напуснете са сериозни. Помагаме ви да документирате случващото се и да изберете правилната реакция – от жалба до съдебен иск.',
            de: 'Mobbing, Diskriminierung oder Druck zur Eigenkündigung sind ernst. Wir helfen Ihnen, die Vorfälle zu dokumentieren und richtig zu reagieren – von der Beschwerde bis zur Klage.',
          },
        },
        {
          title: { en: 'I’m an employer', bg: 'Аз съм работодател', de: 'Ich bin Arbeitgeber' },
          text: {
            en: 'We draft contracts, internal rules and pay policies, guide you through disciplinary steps and restructuring, and represent you when a former employee goes to court.',
            bg: 'Изготвяме трудови договори, вътрешни правила и правила за заплатите, водим ви през дисциплинарните процедури и преструктурирането и ви представляваме, когато бивш служител заведе дело.',
            de: 'Wir entwerfen Verträge, Arbeitsordnungen und Vergütungsregeln, begleiten Sie bei Disziplinarverfahren und Umstrukturierungen und vertreten Sie, wenn ein ehemaliger Mitarbeiter klagt.',
          },
        },
      ],
      steps: {
        en: ['Note the date you received the dismissal order: the two-month deadline starts then.', 'Don’t sign a resignation or a mutual-consent agreement under pressure.', 'Collect your contract, annexes, payslips and any written messages from the employer.', 'Book the free consultation as early as possible.'],
        bg: ['Запишете датата, на която сте получили заповедта за уволнение – тогава започва двумесечният срок.', 'Не подписвайте молба за напускане или споразумение по взаимно съгласие под натиск.', 'Съберете договора, анексите, фишовете за заплата и писмената комуникация с работодателя.', 'Запазете безплатната консултация възможно най-рано.'],
        de: ['Notieren Sie das Datum, an dem Ihnen die Kündigung zugestellt wurde – dann beginnt die Zwei-Monats-Frist.', 'Unterschreiben Sie unter Druck keine Eigenkündigung und keinen Aufhebungsvertrag.', 'Sammeln Sie Vertrag, Nachträge, Gehaltsabrechnungen und schriftliche Nachrichten des Arbeitgebers.', 'Buchen Sie die kostenlose Erstberatung so früh wie möglich.'],
      },
      documents: {
        en: ['Employment contract and all annexes', 'Job description', 'Dismissal order or notice of termination', 'Payslips and bank statements showing salary payments', 'Emails, messages or warnings from the employer'],
        bg: ['Трудов договор и всички анекси', 'Длъжностна характеристика', 'Заповед за уволнение или предизвестие', 'Фишове за заплата и банкови извлечения за плащанията', 'Имейли, съобщения или предупреждения от работодателя'],
        de: ['Arbeitsvertrag mit allen Nachträgen', 'Stellenbeschreibung', 'Kündigungsschreiben', 'Gehaltsabrechnungen und Kontoauszüge zu den Lohnzahlungen', 'E-Mails, Nachrichten oder Abmahnungen des Arbeitgebers'],
      },
      faq: [
        {
          q: { en: 'What makes a dismissal unlawful?', bg: 'Кога уволнението е незаконно?', de: 'Wann ist eine Kündigung rechtswidrig?' },
          a: {
            en: 'Common reasons are a missing or wrong legal ground, no prior permission where an employee is specially protected, no fair selection when jobs are cut, or skipped steps in a disciplinary dismissal, such as not asking for your explanations.',
            bg: 'Честите причини са липсващо или неправилно основание, липса на предварително разрешение, когато служителят е под специална закрила, липса на обективен подбор при съкращение или пропуснати стъпки при дисциплинарно уволнение – например не са ви поискани обяснения.',
            de: 'Häufige Gründe sind ein fehlender oder falscher Kündigungsgrund, die fehlende Zustimmung bei besonders geschützten Arbeitnehmern, keine faire Auswahl beim Stellenabbau oder übersprungene Schritte bei einer disziplinarischen Kündigung, etwa wenn Sie nicht angehört wurden.',
          },
        },
        {
          q: { en: 'Can I get my job back?', bg: 'Мога ли да си върна работата?', de: 'Bekomme ich meinen Arbeitsplatz zurück?' },
          a: {
            en: 'Yes. If the court finds the dismissal unlawful, it can cancel it and reinstate you. Once you are notified, you have two weeks to return to work.',
            bg: 'Да. Ако съдът признае уволнението за незаконно, може да го отмени и да ви възстанови на работа. След като бъдете уведомени, имате две седмици да се явите на работа.',
            de: 'Ja. Erklärt das Gericht die Kündigung für rechtswidrig, kann es sie aufheben und Sie wiedereinstellen. Nach der Mitteilung haben Sie zwei Wochen Zeit, um die Arbeit wieder aufzunehmen.',
          },
        },
        {
          q: { en: 'My employer wants me to leave by mutual consent. Should I agree?', bg: 'Работодателят иска да напусна по взаимно съгласие. Да се съглася ли?', de: 'Mein Arbeitgeber schlägt einen Aufhebungsvertrag vor. Soll ich zustimmen?' },
          a: {
            en: 'Only if the terms suit you, because a signed agreement is very hard to challenge. Ask what compensation is offered and get advice before you sign.',
            bg: 'Само ако условията ви устройват, защото подписаното споразумение много трудно се оспорва. Попитайте какво обезщетение ви се предлага и се консултирайте, преди да подпишете.',
            de: 'Nur wenn die Bedingungen für Sie passen, denn ein unterschriebener Aufhebungsvertrag lässt sich kaum anfechten. Fragen Sie nach der angebotenen Abfindung und lassen Sie sich beraten, bevor Sie unterschreiben.',
          },
        },
        {
          q: { en: 'How much notice must my employer give?', bg: 'Какво предизвестие трябва да ми даде работодателят?', de: 'Welche Kündigungsfrist muss mein Arbeitgeber einhalten?' },
          a: {
            en: 'For a permanent contract the notice period is at least 30 days, unless the contract sets a longer one, up to three months. Some dismissals need no notice, for example a disciplinary dismissal.',
            bg: 'При безсрочен договор предизвестието е най-малко 30 дни, освен ако в договора не е уговорен по-дълъг срок – до три месеца. При някои уволнения, например дисциплинарното, не се дава предизвестие.',
            de: 'Bei einem unbefristeten Vertrag beträgt sie mindestens 30 Tage, sofern der Vertrag keine längere Frist von bis zu drei Monaten vorsieht. Manche Kündigungen erfolgen ohne Frist, etwa die disziplinarische Kündigung.',
          },
        },
        {
          q: { en: 'Who pays the lawyer if I win?', bg: 'Кой плаща адвоката, ако спечеля?', de: 'Wer zahlt die Anwaltskosten, wenn ich gewinne?' },
          a: {
            en: 'In employment cases employees don’t pay court fees, and if you win, the court can order the employer to cover your reasonable legal costs.',
            bg: 'По трудовите спорове служителите не плащат държавни такси, а ако спечелите, съдът може да осъди работодателя да ви възстанови разумните разноски за адвокат.',
            de: 'In Arbeitssachen zahlen Arbeitnehmer keine Gerichtsgebühren, und wenn Sie gewinnen, kann das Gericht den Arbeitgeber verpflichten, Ihre angemessenen Anwaltskosten zu erstatten.',
          },
        },
      ],
    },

    /* --------------------------------------------------------------- CORPORATE */
    {
      id: 'corporate',
      slug: 'business-law',
      icon: 'handshake',
      title: { en: 'Corporate & Commercial', bg: 'Търговско и корпоративно право', de: 'Gesellschafts- und Handelsrecht' },
      short: { en: 'Business', bg: 'Търговско', de: 'Unternehmen' },
      summary: {
        en: 'Practical legal support for businesses, from setting up a company to contracts and disputes.',
        bg: 'Практична правна подкрепа за бизнеса – от регистрацията на фирма до договорите и споровете.',
        de: 'Praktische rechtliche Unterstützung für Unternehmen, von der Gründung über Verträge bis zu Streitigkeiten.',
      },
      intro: {
        en: 'Running a business means contracts, partners, clients who pay late and decisions that need to be recorded properly. We act as your company’s lawyers for everyday matters and step in quickly when a deal needs negotiating or a dispute needs resolving.',
        bg: 'Бизнесът означава договори, съдружници, клиенти, които плащат със закъснение, и решения, които трябва да бъдат правилно оформени. Работим като адвокати на фирмата ви за ежедневните въпроси и се намесваме бързо, когато сделка трябва да се договори или спор – да се реши.',
        de: 'Ein Unternehmen zu führen bedeutet Verträge, Gesellschafter, Kunden, die spät zahlen, und Entscheidungen, die korrekt dokumentiert werden müssen. Wir betreuen Ihr Unternehmen im Alltag und greifen schnell ein, wenn ein Geschäft verhandelt oder ein Streit gelöst werden muss.',
      },
      facts: [
        {
          value: { en: '5 years', bg: '5 години', de: '5 Jahre' },
          label: { en: 'general limitation period for claims', bg: 'е общата давност за вземанията', de: 'beträgt die allgemeine Verjährungsfrist' },
          note: {
            en: 'After it expires, the debtor can refuse to pay, so don’t let unpaid invoices sit.',
            bg: 'След изтичането ѝ длъжникът може да откаже плащане, затова не оставяйте неплатените фактури да чакат.',
            de: 'Danach kann der Schuldner die Zahlung verweigern – lassen Sie offene Rechnungen also nicht liegen.',
          },
        },
        {
          value: { en: '3 years', bg: '3 години', de: '3 Jahre' },
          label: { en: 'for rent, interest and other periodic payments', bg: 'за наеми, лихви и други периодични плащания', de: 'für Mieten, Zinsen und andere wiederkehrende Zahlungen' },
          note: {
            en: 'A shorter limitation period applies to recurring amounts.',
            bg: 'За повтарящите се плащания давността е по-кратка.',
            de: 'Für regelmäßig wiederkehrende Beträge gilt eine kürzere Verjährung.',
          },
        },
        {
          value: { en: '2%', bg: '2%', de: '2 %' },
          label: { en: 'court fee to apply for an order for payment', bg: 'държавна такса за заповед за изпълнение', de: 'Gerichtsgebühr für einen Mahnbescheid' },
          note: {
            en: 'A fast way to recover an undisputed debt without a full lawsuit, where the fee is 4%.',
            bg: 'Бърз начин да съберете безспорно вземане без пълно съдебно дело, при което таксата е 4%.',
            de: 'Ein schneller Weg, unbestrittene Forderungen ohne vollständige Klage einzutreiben, bei der die Gebühr 4 % beträgt.',
          },
        },
      ],
      situations: [
        {
          title: { en: 'Starting a company', bg: 'Регистрация на фирма', de: 'Gründung einer Gesellschaft' },
          text: {
            en: 'We help you choose the right form, usually a limited liability company, draft the articles and register it in the Commercial Register, with clear rules between partners from day one.',
            bg: 'Помагаме ви да изберете подходящата форма – обикновено ООД или ЕООД, изготвяме дружествения договор и регистрираме дружеството в Търговския регистър, с ясни правила между съдружниците от първия ден.',
            de: 'Wir helfen bei der Wahl der richtigen Rechtsform, meist einer GmbH (OOD oder EOOD), entwerfen den Gesellschaftsvertrag und lassen die Gesellschaft im Handelsregister eintragen – mit klaren Regeln zwischen den Gesellschaftern vom ersten Tag an.',
          },
        },
        {
          title: { en: 'Contracts that protect you', bg: 'Договори, които ви защитават', de: 'Verträge, die Sie schützen' },
          text: {
            en: 'Supply, services, distribution and confidentiality agreements. We draft and review contracts so that payment terms, liability and termination work in your favour.',
            bg: 'Доставки, услуги, дистрибуция и споразумения за поверителност. Изготвяме и преглеждаме договорите така, че условията за плащане, отговорността и прекратяването да работят във ваша полза.',
            de: 'Liefer-, Dienstleistungs- und Vertriebsverträge sowie Geheimhaltungsvereinbarungen: Wir entwerfen und prüfen Verträge so, dass Zahlungsbedingungen, Haftung und Kündigung zu Ihren Gunsten wirken.',
          },
        },
        {
          title: { en: 'A client won’t pay', bg: 'Клиент не плаща', de: 'Ein Kunde zahlt nicht' },
          text: {
            en: 'We send a formal demand, apply for an order for payment and, if needed, enforce through a private bailiff, choosing the fastest route for the amount at stake.',
            bg: 'Изпращаме официална покана, подаваме заявление за заповед за изпълнение и при нужда събираме вземането чрез частен съдебен изпълнител, като избираме най-бързия път според сумата.',
            de: 'Wir senden eine förmliche Mahnung, beantragen einen Mahnbescheid und vollstrecken bei Bedarf über einen privaten Gerichtsvollzieher – je nach Betrag auf dem schnellsten Weg.',
          },
        },
        {
          title: { en: 'Partners in conflict', bg: 'Конфликт между съдружници', de: 'Streit unter Gesellschaftern' },
          text: {
            en: 'Disagreements between shareholders can paralyse a company. We look for a negotiated exit or buy-out and represent you in court if it comes to that.',
            bg: 'Разногласията между съдружниците могат да парализират дружеството. Търсим договорено излизане или изкупуване на дяла и ви представляваме в съда, ако се стигне дотам.',
            de: 'Meinungsverschiedenheiten zwischen Gesellschaftern können ein Unternehmen lähmen. Wir suchen einen verhandelten Ausstieg oder Anteilskauf und vertreten Sie vor Gericht, wenn es so weit kommt.',
          },
        },
      ],
      steps: {
        en: ['Gather the contract, invoices and correspondence for the matter.', 'Check the company’s current details in the Commercial Register.', 'Don’t agree new terms or sign a settlement before getting advice.', 'Book the free consultation and tell us the amounts and deadlines involved.'],
        bg: ['Съберете договора, фактурите и кореспонденцията по въпроса.', 'Проверете актуалните данни на дружеството в Търговския регистър.', 'Не договаряйте нови условия и не подписвайте споразумения, преди да получите съвет.', 'Запазете безплатната консултация и ни кажете за какви суми и срокове става дума.'],
        de: ['Sammeln Sie Vertrag, Rechnungen und Korrespondenz zur Angelegenheit.', 'Prüfen Sie die aktuellen Daten der Gesellschaft im Handelsregister.', 'Vereinbaren Sie keine neuen Bedingungen und unterschreiben Sie keinen Vergleich, bevor Sie beraten wurden.', 'Buchen Sie die kostenlose Erstberatung und nennen Sie uns Beträge und Fristen.'],
      },
      documents: {
        en: ['Company number (UIC) and articles of association', 'The contract and any annexes', 'Unpaid invoices and delivery or acceptance records', 'Emails and letters exchanged with the other side', 'Bank statements showing payments'],
        bg: ['ЕИК и дружествен договор или устав', 'Договорът и анексите към него', 'Неплатени фактури и приемо-предавателни протоколи', 'Имейли и писма, разменени с другата страна', 'Банкови извлечения за плащанията'],
        de: ['Firmennummer (UIC) und Gesellschaftsvertrag', 'Den Vertrag mit allen Nachträgen', 'Offene Rechnungen sowie Liefer- oder Abnahmeprotokolle', 'E-Mails und Schreiben mit der Gegenseite', 'Kontoauszüge zu den Zahlungen'],
      },
      faq: [
        {
          q: { en: 'Which company form should I choose?', bg: 'Каква форма на дружество да избера?', de: 'Welche Rechtsform sollte ich wählen?' },
          a: {
            en: 'Most small and medium businesses choose a limited liability company: an OOD, or an EOOD with a single owner. It limits your personal liability and is simple to run. We compare the options for your plans.',
            bg: 'Повечето малки и средни фирми избират ООД, а при един собственик – ЕООД. Тази форма ограничава личната ви отговорност и е лесна за управление. Сравняваме възможностите според плановете ви.',
            de: 'Die meisten kleinen und mittleren Unternehmen wählen eine Gesellschaft mit beschränkter Haftung: eine OOD oder bei nur einem Gesellschafter eine EOOD. Sie begrenzt Ihre persönliche Haftung und ist einfach zu führen. Wir vergleichen die Optionen für Ihre Pläne.',
          },
        },
        {
          q: { en: 'How does an order for payment work?', bg: 'Как работи заповедното производство?', de: 'Wie funktioniert das Mahnverfahren?' },
          a: {
            en: 'You apply to the district court, which issues an order without a full trial. If the debtor doesn’t object in time, it becomes enforceable. If they object, the claim is decided in a normal lawsuit.',
            bg: 'Подавате заявление до районния съд, който издава заповед за изпълнение без пълен процес. Ако длъжникът не възрази в срок, заповедта влиза в сила. Ако възрази, вземането се установява по общия исков ред.',
            de: 'Sie stellen einen Antrag beim Bezirksgericht, das ohne vollständiges Verfahren einen Zahlungsbefehl erlässt. Widerspricht der Schuldner nicht rechtzeitig, wird er vollstreckbar. Widerspricht er, wird die Forderung im regulären Klageverfahren geklärt.',
          },
        },
        {
          q: { en: 'Can I be personally liable for my company’s debts?', bg: 'Мога ли да отговарям лично за дълговете на фирмата?', de: 'Hafte ich persönlich für die Schulden meiner Firma?' },
          a: {
            en: 'Usually not, as liability is limited to the company’s assets. Managers, however, can be liable for damage they cause, and for failing to file for insolvency on time.',
            bg: 'Обикновено не – отговорността е ограничена до имуществото на дружеството. Управителите обаче могат да отговарят за вредите, които причинят, и за това, че не са поискали навреме откриване на производство по несъстоятелност.',
            de: 'In der Regel nicht, da die Haftung auf das Gesellschaftsvermögen beschränkt ist. Geschäftsführer können jedoch für verursachte Schäden haften und dafür, dass sie die Insolvenz nicht rechtzeitig beantragt haben.',
          },
        },
        {
          q: { en: 'Do changes in my company need to be registered?', bg: 'Трябва ли промените във фирмата да се вписват?', de: 'Müssen Änderungen in meiner Gesellschaft eingetragen werden?' },
          a: {
            en: 'Yes. Changes of manager, address, shareholders or capital must be entered in the Commercial Register, and many of them take effect only once registered.',
            bg: 'Да. Промените в управителя, адреса, съдружниците или капитала трябва да се впишат в Търговския регистър, а много от тях имат действие едва след вписването.',
            de: 'Ja. Änderungen bei Geschäftsführung, Anschrift, Gesellschaftern oder Kapital müssen im Handelsregister eingetragen werden, und viele werden erst mit der Eintragung wirksam.',
          },
        },
        {
          q: { en: 'Can you check a contract before I sign?', bg: 'Можете ли да прегледате договор, преди да го подпиша?', de: 'Können Sie einen Vertrag prüfen, bevor ich unterschreibe?' },
          a: {
            en: 'Yes, and it’s the best moment to involve a lawyer. We highlight the risks, suggest changes and can negotiate them with the other side for you.',
            bg: 'Да, и това е най-добрият момент да включите адвокат. Посочваме рисковете, предлагаме промени и можем да ги договорим с другата страна вместо вас.',
            de: 'Ja, und das ist der beste Zeitpunkt, um anwaltliche Hilfe einzuholen. Wir zeigen die Risiken auf, schlagen Änderungen vor und können sie für Sie mit der Gegenseite verhandeln.',
          },
        },
      ],
    },

    /* ------------------------------------------------------------- IMMIGRATION */
    {
      id: 'immigration',
      slug: 'immigration',
      icon: 'id-card',
      title: { en: 'Immigration & Residency', bg: 'Имиграция и пребиваване', de: 'Aufenthalts- und Migrationsrecht' },
      short: { en: 'Immigration', bg: 'Имиграция', de: 'Migration' },
      summary: {
        en: 'Residence, work and citizenship procedures for individuals, families and employers.',
        bg: 'Процедури за пребиваване, работа и гражданство за граждани, семейства и работодатели.',
        de: 'Aufenthalt, Arbeit und Staatsangehörigkeit – für Privatpersonen, Familien und Arbeitgeber.',
      },
      intro: {
        en: 'Moving to Bulgaria for work, family or retirement comes with procedures in a language you may not speak yet. We guide you and your family through each step, prepare the documents and deal with the Migration Directorate, in English, German or Bulgarian.',
        bg: 'Преместването в България за работа, семейство или пенсия е свързано с процедури на език, който може би още не владеете. Водим вас и семейството ви през всяка стъпка, подготвяме документите и работим с дирекция „Миграция“ – на български, английски или немски.',
        de: 'Ein Umzug nach Bulgarien für Arbeit, Familie oder Ruhestand bringt Verfahren in einer Sprache mit sich, die Sie vielleicht noch nicht sprechen. Wir begleiten Sie und Ihre Familie Schritt für Schritt, bereiten die Unterlagen vor und kümmern uns um die Migrationsdirektion – auf Deutsch, Englisch oder Bulgarisch.',
      },
      facts: [
        {
          value: { en: '3 months', bg: '3 месеца', de: '3 Monate' },
          label: { en: 'EU citizens can stay without registering', bg: 'могат да пребивават гражданите на ЕС без регистрация', de: 'können EU-Bürger ohne Anmeldung bleiben' },
          note: {
            en: 'For a longer stay you need a long-term residence certificate from the Migration Directorate.',
            bg: 'За по-дълъг престой е нужно удостоверение за продължително пребиваване от дирекция „Миграция“.',
            de: 'Für einen längeren Aufenthalt brauchen Sie eine Aufenthaltsbescheinigung der Migrationsdirektion.',
          },
        },
        {
          value: { en: '5 years', bg: '5 години', de: '5 Jahre' },
          label: { en: 'of continuous legal residence before permanent residence', bg: 'непрекъснато законно пребиваване преди постоянно пребиваване', de: 'rechtmäßiger Aufenthalt vor dem Daueraufenthalt' },
          note: {
            en: 'Permanent residence is also a step towards Bulgarian citizenship.',
            bg: 'Постоянното пребиваване е и стъпка към българско гражданство.',
            de: 'Der Daueraufenthalt ist auch ein Schritt zur bulgarischen Staatsangehörigkeit.',
          },
        },
        {
          value: { en: 'Visa D', bg: 'Виза D', de: 'Visum D' },
          label: { en: 'is usually needed before a non-EU national applies for long-term residence', bg: 'обикновено е нужна, преди гражданин извън ЕС да кандидатства за продължително пребиваване', de: 'brauchen Nicht-EU-Bürger meist vor dem Antrag auf langfristigen Aufenthalt' },
          note: {
            en: 'You apply at a Bulgarian embassy or consulate, and the type depends on why you are coming.',
            bg: 'Подава се в българско посолство или консулство, а видът зависи от целта на престоя.',
            de: 'Sie wird bei einer bulgarischen Botschaft oder einem Konsulat beantragt; die Art hängt vom Zweck des Aufenthalts ab.',
          },
        },
      ],
      situations: [
        {
          title: { en: 'Moving here from the EU', bg: 'Идвате от страна от ЕС', de: 'Zuzug aus der EU' },
          text: {
            en: 'EU citizens and their families have the right to live and work in Bulgaria. We handle registration, residence certificates and documents for family members from outside the EU.',
            bg: 'Гражданите на ЕС и семействата им имат право да живеят и работят в България. Поемаме регистрацията, удостоверенията за пребиваване и документите за членовете на семейството извън ЕС.',
            de: 'EU-Bürger und ihre Familien dürfen in Bulgarien leben und arbeiten. Wir erledigen Anmeldung, Aufenthaltsbescheinigungen und Unterlagen für Familienangehörige aus Nicht-EU-Staaten.',
          },
        },
        {
          title: { en: 'Working here from outside the EU', bg: 'Работа в България от държава извън ЕС', de: 'Arbeiten in Bulgarien aus einem Nicht-EU-Staat' },
          text: {
            en: 'For non-EU workers we prepare the single permit or EU Blue Card application together with the employer and follow it through to the residence card.',
            bg: 'За работници от държави извън ЕС подготвяме заявлението за единно разрешение или Синя карта на ЕС заедно с работодателя и го следим до получаването на картата за пребиваване.',
            de: 'Für Arbeitskräfte aus Nicht-EU-Staaten bereiten wir zusammen mit dem Arbeitgeber den Antrag auf eine kombinierte Erlaubnis oder die Blaue Karte EU vor und begleiten ihn bis zur Aufenthaltskarte.',
          },
        },
        {
          title: { en: 'Bringing your family', bg: 'Събиране на семейството', de: 'Familiennachzug' },
          text: {
            en: 'Spouses, children and in some cases parents can join a family member who lives in Bulgaria. We check the conditions and prepare the application.',
            bg: 'Съпрузите, децата, а в някои случаи и родителите могат да се присъединят към член на семейството, който живее в България. Проверяваме условията и подготвяме заявлението.',
            de: 'Ehepartner, Kinder und in manchen Fällen Eltern können zu einem Familienmitglied nachziehen, das in Bulgarien lebt. Wir prüfen die Voraussetzungen und bereiten den Antrag vor.',
          },
        },
        {
          title: { en: 'Permanent residence and citizenship', bg: 'Постоянно пребиваване и гражданство', de: 'Daueraufenthalt und Einbürgerung' },
          text: {
            en: 'After years of legal residence you can apply for permanent residence and later for citizenship. We prepare the file and track every deadline.',
            bg: 'След години законно пребиваване можете да кандидатствате за постоянно пребиваване, а по-късно и за гражданство. Подготвяме преписката и следим всеки срок.',
            de: 'Nach Jahren rechtmäßigen Aufenthalts können Sie den Daueraufenthalt und später die Einbürgerung beantragen. Wir stellen die Unterlagen zusammen und behalten jede Frist im Blick.',
          },
        },
      ],
      steps: {
        en: ['Check that your passport is valid for at least the length of your planned stay.', 'Find out which visa or permit fits your reason for coming before you travel.', 'Have documents issued abroad apostilled or legalised and translated into Bulgarian.', 'Book the free consultation, and we will draw up a checklist for your case.'],
        bg: ['Проверете дали паспортът ви е валиден поне за срока на планирания престой.', 'Изяснете коя виза или разрешение отговаря на целта ви, преди да пътувате.', 'Документите, издадени в чужбина, трябва да бъдат с апостил или легализирани и преведени на български.', 'Запазете безплатната консултация и ще изготвим списък с документи за вашия случай.'],
        de: ['Prüfen Sie, ob Ihr Reisepass mindestens für die Dauer des geplanten Aufenthalts gültig ist.', 'Klären Sie vor der Reise, welches Visum oder welche Erlaubnis zu Ihrem Zweck passt.', 'Lassen Sie im Ausland ausgestellte Dokumente mit Apostille versehen oder legalisieren und ins Bulgarische übersetzen.', 'Buchen Sie die kostenlose Erstberatung, und wir erstellen eine Checkliste für Ihren Fall.'],
      },
      documents: {
        en: ['Passport and any current visa or residence card', 'Employment contract, business plan or proof of income', 'Proof of accommodation, such as a lease or notary deed', 'Health insurance valid in Bulgaria', 'Birth and marriage certificates, apostilled and translated'],
        bg: ['Паспорт и настояща виза или карта за пребиваване, ако имате', 'Трудов договор, бизнес план или доказателство за доходи', 'Документ за жилище – договор за наем или нотариален акт', 'Здравна застраховка, валидна в България', 'Удостоверения за раждане и брак с апостил и превод'],
        de: ['Reisepass und gegebenenfalls aktuelles Visum oder Aufenthaltskarte', 'Arbeitsvertrag, Businessplan oder Einkommensnachweis', 'Wohnnachweis, etwa Mietvertrag oder notarielle Urkunde', 'In Bulgarien gültige Krankenversicherung', 'Geburts- und Heiratsurkunden mit Apostille und Übersetzung'],
      },
      faq: [
        {
          q: { en: 'I’m an EU citizen. What do I need to do?', bg: 'Гражданин съм на ЕС. Какво трябва да направя?', de: 'Ich bin EU-Bürger. Was muss ich tun?' },
          a: {
            en: 'You can stay up to three months without formalities. For a longer stay, apply to the Migration Directorate for a long-term residence certificate, which also makes everyday matters such as banking and buying a car easier.',
            bg: 'Можете да пребивавате до три месеца без формалности. За по-дълъг престой подайте заявление в дирекция „Миграция“ за удостоверение за продължително пребиваване, което улеснява и ежедневни неща като банкови сметки и покупка на автомобил.',
            de: 'Bis zu drei Monate können Sie ohne Formalitäten bleiben. Für einen längeren Aufenthalt beantragen Sie bei der Migrationsdirektion eine Aufenthaltsbescheinigung, die auch Alltägliches wie Bankkonto oder Autokauf erleichtert.',
          },
        },
        {
          q: { en: 'Can my employer apply for me?', bg: 'Може ли работодателят ми да подаде документите вместо мен?', de: 'Kann mein Arbeitgeber den Antrag für mich stellen?' },
          a: {
            en: 'In most work-based procedures the employer starts the application, and we can act for the employer, the employee or both. You will still need to attend in person to give fingerprints and a photo for the residence card.',
            bg: 'При повечето процедури за работа работодателят стартира заявлението, а ние можем да представляваме работодателя, служителя или и двамата. Все пак ще трябва да се явите лично, за да дадете пръстови отпечатъци и снимка за картата за пребиваване.',
            de: 'Bei den meisten arbeitsbezogenen Verfahren stellt der Arbeitgeber den Antrag, und wir können Arbeitgeber, Arbeitnehmer oder beide vertreten. Für Fingerabdrücke und Foto zur Aufenthaltskarte müssen Sie dennoch persönlich erscheinen.',
          },
        },
        {
          q: { en: 'How long does a residence permit take?', bg: 'Колко време отнема разрешението за пребиваване?', de: 'Wie lange dauert eine Aufenthaltserlaubnis?' },
          a: {
            en: 'It depends on the type of permit and how busy the authorities are, from a few weeks to several months. A complete, correctly translated file is the best way to avoid delays.',
            bg: 'Зависи от вида на разрешението и натоварването на институциите – от няколко седмици до няколко месеца. Пълната и правилно преведена преписка е най-добрият начин да избегнете забавяне.',
            de: 'Das hängt von der Art der Erlaubnis und der Auslastung der Behörden ab – von einigen Wochen bis zu mehreren Monaten. Vollständige, korrekt übersetzte Unterlagen sind der beste Schutz vor Verzögerungen.',
          },
        },
        {
          q: { en: 'When can I apply for Bulgarian citizenship?', bg: 'Кога мога да кандидатствам за българско гражданство?', de: 'Wann kann ich die bulgarische Staatsangehörigkeit beantragen?' },
          a: {
            en: 'By naturalisation, at least five years after you receive a permanent or long-term residence permit, with other conditions such as knowledge of Bulgarian and a stable income. In practice this often means around ten years in Bulgaria. People of Bulgarian origin can apply through a faster route.',
            bg: 'По натурализация – най-малко пет години след като сте получили разрешение за постоянно или дългосрочно пребиваване, при условия като владеене на български език и стабилни доходи. На практика това често означава около десет години в България. Лицата от български произход могат да кандидатстват по по-бърз ред.',
            de: 'Durch Einbürgerung frühestens fünf Jahre nach Erhalt einer unbefristeten oder langfristigen Aufenthaltserlaubnis, unter weiteren Voraussetzungen wie Bulgarischkenntnissen und einem gesicherten Einkommen. In der Praxis sind das oft rund zehn Jahre in Bulgarien. Personen bulgarischer Herkunft können ein schnelleres Verfahren nutzen.',
          },
        },
        {
          q: { en: 'Do my documents need translating?', bg: 'Трябва ли документите ми да се превеждат?', de: 'Müssen meine Dokumente übersetzt werden?' },
          a: {
            en: 'Yes. Foreign documents usually need an apostille or legalisation and a certified translation into Bulgarian. We tell you exactly which documents need which steps.',
            bg: 'Да. Чуждестранните документи обикновено трябва да са с апостил или легализирани и с официален превод на български. Казваме ви точно кой документ какво изисква.',
            de: 'Ja. Ausländische Dokumente brauchen meist eine Apostille oder Legalisation und eine beglaubigte Übersetzung ins Bulgarische. Wir sagen Ihnen genau, welches Dokument welche Schritte braucht.',
          },
        },
      ],
    },
  ],

  /* --------------------------------------------------------------- LAWYERS
     Listed by area. The first lawyer of each area is its lead lawyer. */
  lawyers: [
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
      id: 'ruseva',
      name: { latin: ['Anelia', 'Ruseva'], cyrillic: ['Анелия', 'Русева'] },
      gender: 'f',
      role: { en: 'Associate', bg: 'Адвокат', de: 'Associate' },
      area: 'family',
      since: 2019,
      barSince: 2019,
      photo: '',
      languages: ['bg', 'en', 'de'],
      education: [
        { en: 'Master of Laws, University of Ruse “Angel Kanchev”, 2018', bg: 'Магистър по право, Русенски университет „Ангел Кънчев“, 2018 г.', de: 'Master of Laws, Universität Russe „Angel Kantschew“, 2018' },
      ],
      career: [],
      bio: {
        en: 'Works with families where one partner lives abroad or is a foreign national, from international divorces to child contact and maintenance across borders.',
        bg: 'Работи със семейства, в които единият партньор живее в чужбина или е чужденец – от международни разводи до лични отношения с децата и издръжка през граница.',
        de: 'Betreut Familien, in denen ein Partner im Ausland lebt oder ausländischer Staatsangehöriger ist – von internationalen Scheidungen bis zu Umgang und Unterhalt über Grenzen hinweg.',
      },
      focus: {
        en: ['International divorce', 'Cross-border custody and contact', 'Child maintenance across borders', 'Prenuptial and property agreements'],
        bg: ['Международни разводи', 'Родителски права и лични отношения през граница', 'Издръжка на деца, живеещи в чужбина', 'Брачни договори'],
        de: ['Internationale Scheidungen', 'Sorgerecht und Umgang über Grenzen hinweg', 'Kindesunterhalt im Ausland', 'Eheverträge'],
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
        en: ['Defence in pre-trial proceedings and at trial', 'Detention hearings and measures of restraint', 'Economic and white-collar crime', 'Representation of victims', 'Appeals'],
        bg: ['Защита в досъдебното производство и в съда', 'Задържане и мерки за неотклонение', 'Стопански и финансови престъпления', 'Представителство на пострадали', 'Обжалване'],
        de: ['Verteidigung im Ermittlungs- und Hauptverfahren', 'Untersuchungshaft und Haftprüfung', 'Wirtschaftsstrafrecht', 'Vertretung von Geschädigten', 'Rechtsmittel'],
      },
    },
    {
      id: 'marinov',
      name: { latin: ['Kaloyan', 'Marinov'], cyrillic: ['Калоян', 'Маринов'] },
      gender: 'm',
      role: { en: 'Senior Associate', bg: 'Старши адвокат', de: 'Senior Associate' },
      area: 'criminal',
      since: 2014,
      barSince: 2017,
      photo: '',
      languages: ['bg', 'en'],
      education: [
        { en: 'Master of Laws, Plovdiv University “Paisii Hilendarski”, 2013', bg: 'Магистър по право, Пловдивски университет „Паисий Хилендарски“, 2013 г.', de: 'Master of Laws, Universität Plowdiw „Paisii Hilendarski“, 2013' },
      ],
      career: [
        { en: 'Investigating police officer, Sofia Directorate of the Interior, 2014–2017', bg: 'Разследващ полицай, Столична дирекция на вътрешните работи, 2014–2017 г.', de: 'Ermittlungsbeamter, Hauptstädtische Direktion des Innern, Sofia, 2014–2017' },
      ],
      bio: {
        en: 'Investigated cases himself for three years before joining the defence. He focuses on traffic crimes, accidents with injuries and the rights of victims.',
        bg: 'Три години сам е разследвал дела, преди да премине към защитата. Работи предимно по пътнотранспортни престъпления, катастрофи с пострадали и правата на пострадалите.',
        de: 'Hat drei Jahre lang selbst ermittelt, bevor er in die Verteidigung wechselte. Seine Schwerpunkte sind Verkehrsstraftaten, Unfälle mit Verletzten und die Rechte von Geschädigten.',
      },
      focus: {
        en: ['Traffic crimes and road accidents', 'Drink- and drug-driving', 'Representation of victims', 'Compensation claims in criminal cases'],
        bg: ['Пътнотранспортни престъпления и катастрофи', 'Шофиране след употреба на алкохол или наркотици', 'Представителство на пострадали', 'Граждански искове в наказателния процес'],
        de: ['Verkehrsstraftaten und Verkehrsunfälle', 'Fahren unter Alkohol- oder Drogeneinfluss', 'Vertretung von Geschädigten', 'Schadensersatz im Strafverfahren'],
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
        en: ['Title and encumbrance checks', 'Preliminary contracts and notary deeds', 'Off-plan and new-build purchases', 'Co-ownership and partition', 'Property disputes in court'],
        bg: ['Проверка на собственост и тежести', 'Предварителни договори и нотариални актове', 'Покупка на имоти „на зелено“ и в ново строителство', 'Съсобственост и делба', 'Съдебни спорове за имоти'],
        de: ['Prüfung von Eigentum und Belastungen', 'Vorverträge und notarielle Urkunden', 'Kauf vom Bauträger und im Neubau', 'Miteigentum und Teilung', 'Immobilienstreitigkeiten vor Gericht'],
      },
    },
    {
      id: 'hadzhieva',
      name: { latin: ['Petya', 'Hadzhieva'], cyrillic: ['Петя', 'Хаджиева'] },
      gender: 'f',
      role: { en: 'Associate', bg: 'Адвокат', de: 'Associate' },
      area: 'property',
      since: 2021,
      barSince: 2021,
      photo: '',
      languages: ['bg', 'en'],
      education: [
        { en: 'Master of Laws, South-West University “Neofit Rilski”, Blagoevgrad, 2020', bg: 'Магистър по право, Югозападен университет „Неофит Рилски“, Благоевград, 2020 г.', de: 'Master of Laws, Südwest-Universität „Neofit Rilski“, Blagoewgrad, 2020' },
      ],
      career: [],
      bio: {
        en: 'Handles the detailed checks behind every property deal, from the Property Register and the cadastre to the building permits of new developments.',
        bg: 'Отговаря за подробните проверки зад всяка сделка с имот – от Имотния регистър и кадастъра до разрешенията за строеж на новите проекти.',
        de: 'Übernimmt die genauen Prüfungen hinter jedem Immobiliengeschäft – vom Immobilienregister und Kataster bis zu den Baugenehmigungen neuer Projekte.',
      },
      focus: {
        en: ['Property Register and cadastre checks', 'New-build and off-plan purchases', 'Leases and rental disputes', 'Neighbour and boundary disputes'],
        bg: ['Проверки в Имотния регистър и кадастъра', 'Покупки в ново строителство и „на зелено“', 'Договори за наем и наемни спорове', 'Спорове между съседи и за граници'],
        de: ['Prüfungen im Immobilienregister und Kataster', 'Kauf im Neubau und vom Bauträger', 'Mietverträge und Mietstreitigkeiten', 'Nachbar- und Grenzstreitigkeiten'],
      },
    },
    {
      id: 'kirilov',
      name: { latin: ['Stefan', 'Kirilov'], cyrillic: ['Стефан', 'Кирилов'] },
      gender: 'm',
      role: { en: 'Partner', bg: 'Съдружник', de: 'Partner' },
      area: 'employment',
      since: 2006,
      barSince: 2006,
      photo: '',
      languages: ['bg', 'en', 'de'],
      education: [
        { en: 'Master of Laws, Sofia University “St. Kliment Ohridski”, 2005', bg: 'Магистър по право, Софийски университет „Св. Климент Охридски“, 2005 г.', de: 'Master of Laws, Universität Sofia „Hl. Kliment Ohridski“, 2005' },
        { en: 'Postgraduate course in European labour law, University of Vienna, 2009', bg: 'Следдипломен курс по европейско трудово право, Виенски университет, 2009 г.', de: 'Postgraduale Weiterbildung im europäischen Arbeitsrecht, Universität Wien, 2009' },
      ],
      career: [],
      bio: {
        en: 'Advises employers and employees on everything from individual dismissals to restructuring whole teams, and looks for a settlement before a dispute reaches court.',
        bg: 'Консултира работодатели и служители – от отделни уволнения до преструктуриране на цели екипи, и търси споразумение, преди спорът да стигне до съда.',
        de: 'Berät Arbeitgeber und Arbeitnehmer von einzelnen Kündigungen bis zur Umstrukturierung ganzer Teams und sucht eine Einigung, bevor ein Streit vor Gericht landet.',
      },
      focus: {
        en: ['Dismissals and reinstatement claims', 'Restructuring and redundancies', 'Executive and management contracts', 'Internal rules and pay policies'],
        bg: ['Уволнения и искове за възстановяване на работа', 'Преструктуриране и съкращения', 'Договори с ръководни служители', 'Вътрешни правила и правила за заплатите'],
        de: ['Kündigungen und Wiedereinstellungsklagen', 'Umstrukturierung und Stellenabbau', 'Verträge mit Führungskräften', 'Arbeitsordnungen und Vergütungsregeln'],
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
      id: 'vasileva',
      name: { latin: ['Yana', 'Vasileva'], cyrillic: ['Яна', 'Василева'] },
      gender: 'f',
      role: { en: 'Senior Associate', bg: 'Старши адвокат', de: 'Senior Associate' },
      area: 'corporate',
      since: 2015,
      barSince: 2016,
      photo: '',
      languages: ['bg', 'en', 'fr'],
      education: [
        { en: 'Master of Laws, Sofia University “St. Kliment Ohridski”, 2014', bg: 'Магистър по право, Софийски университет „Св. Климент Охридски“, 2014 г.', de: 'Master of Laws, Universität Sofia „Hl. Kliment Ohridski“, 2014' },
        { en: 'LL.M., King’s College London, 2015', bg: 'LL.M., Кингс Колидж, Лондон, 2015 г.', de: 'LL.M., King’s College London, 2015' },
      ],
      career: [],
      bio: {
        en: 'Handles the contracts and disputes that keep companies running, from supply and distribution agreements to recovering unpaid invoices.',
        bg: 'Работи по договорите и споровете, от които зависи ежедневието на фирмите – от договори за доставка и дистрибуция до събиране на неплатени фактури.',
        de: 'Betreut die Verträge und Streitigkeiten, von denen der Alltag eines Unternehmens abhängt – von Liefer- und Vertriebsverträgen bis zum Einzug offener Rechnungen.',
      },
      focus: {
        en: ['Commercial contracts and general terms', 'Debt recovery and orders for payment', 'Commercial Register filings', 'Commercial disputes'],
        bg: ['Търговски договори и общи условия', 'Събиране на вземания и заповедно производство', 'Вписвания в Търговския регистър', 'Търговски спорове'],
        de: ['Handelsverträge und AGB', 'Forderungseinzug und Mahnverfahren', 'Eintragungen im Handelsregister', 'Handelsstreitigkeiten'],
      },
    },
    {
      id: 'asenov',
      name: { latin: ['Viktor', 'Asenov'], cyrillic: ['Виктор', 'Асенов'] },
      gender: 'm',
      role: { en: 'Partner', bg: 'Съдружник', de: 'Partner' },
      area: 'immigration',
      since: 2009,
      barSince: 2009,
      photo: '',
      languages: ['bg', 'en', 'ru'],
      education: [
        { en: 'Master of Laws, Varna Free University “Chernorizets Hrabar”, 2008', bg: 'Магистър по право, Варненски свободен университет „Черноризец Храбър“, 2008 г.', de: 'Master of Laws, Freie Universität Warna „Tschernorizez Hrabar“, 2008' },
      ],
      career: [],
      bio: {
        en: 'Has guided families, retirees and companies through Bulgarian residence and citizenship procedures for more than fifteen years.',
        bg: 'Повече от петнадесет години води семейства, пенсионери и компании през процедурите за пребиваване и гражданство в България.',
        de: 'Begleitet seit mehr als fünfzehn Jahren Familien, Ruheständler und Unternehmen durch bulgarische Aufenthalts- und Einbürgerungsverfahren.',
      },
      focus: {
        en: ['Long-term and permanent residence', 'Residence for retirees and investors', 'Bulgarian citizenship', 'Appeals against refusals'],
        bg: ['Продължително и постоянно пребиваване', 'Пребиваване за пенсионери и инвеститори', 'Българско гражданство', 'Обжалване на откази'],
        de: ['Langfristiger und unbefristeter Aufenthalt', 'Aufenthalt für Ruheständler und Investoren', 'Bulgarische Staatsangehörigkeit', 'Rechtsmittel gegen Ablehnungen'],
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
        en: ['EU Blue Card and work permits', 'Family reunification', 'EU citizen registration', 'Document legalisation and apostilles'],
        bg: ['Синя карта на ЕС и разрешения за работа', 'Събиране на семейството', 'Регистрация на граждани на ЕС', 'Легализация на документи и апостил'],
        de: ['Blaue Karte EU und Arbeitserlaubnisse', 'Familiennachzug', 'Anmeldung von EU-Bürgern', 'Legalisation von Dokumenten und Apostille'],
      },
    },
  ],

  /* --------------------------------------------------------- GENERAL FAQ */
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
        en: 'Bulgarian, English and German, and some of our lawyers also consult in Russian or French. Choose your preferred language when you book.',
        bg: 'На български, английски и немски, а някои от адвокатите ни консултират и на руски или френски. Изберете предпочитания език, когато запазвате час.',
        de: 'Auf Bulgarisch, Englisch und Deutsch; einige unserer Anwältinnen und Anwälte beraten außerdem auf Russisch oder Französisch. Wählen Sie Ihre bevorzugte Sprache bei der Buchung.',
      },
    },
    {
      q: { en: 'What should I prepare for the consultation?', bg: 'Какво да подготвя за консултацията?', de: 'Was sollte ich für die Beratung vorbereiten?' },
      a: {
        en: 'A short summary of what happened, the key dates, and any documents you have, such as contracts, letters or court papers. Each practice area page has a checklist for its typical cases.',
        bg: 'Кратко описание на случилото се, важните дати и документите, с които разполагате – договори, писма или съдебни книжа. На страницата на всяка област има списък за типичните случаи.',
        de: 'Eine kurze Zusammenfassung des Geschehens, die wichtigsten Daten und vorhandene Unterlagen wie Verträge, Schreiben oder Gerichtsdokumente. Auf der Seite jedes Rechtsgebiets finden Sie eine Checkliste für typische Fälle.',
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
